import os
import threading
from typing import List, Optional
from pypdf import PdfReader

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA

# ----------------------------
# Configuration
# ----------------------------
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MODEL_NAME = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

# Use the user-specified policy directory path
POLICY_DIR = r"C:\Users\dilee\Desktop\IBA_chatbot\Policy"
FAISS_DIR = os.getenv("FAISS_INDEX_DIR", os.path.join(os.path.dirname(__file__), "faiss_index"))

if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY not found. Please add it to your .env file.")

# ----------------------------
# App and CORS
# ----------------------------
app = FastAPI(title="University Policy Chatbot API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tighten to your frontend origin if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Data/Model singletons
# ----------------------------
_db_lock = threading.Lock()
_db: Optional[FAISS] = None
_qa: Optional[RetrievalQA] = None


def extract_text_from_pdfs(root_folder: str) -> List[str]:
    texts: List[str] = []
    for root, _, files in os.walk(root_folder):
        for file in files:
            if file.lower().endswith(".pdf"):
                pdf_path = os.path.join(root, file)
                text = ""
                try:
                    reader = PdfReader(pdf_path)
                    for page in reader.pages:
                        text += page.extract_text() or ""
                except Exception:
                    # Skip files that cannot be parsed
                    continue
                if text:
                    texts.append(text)
    return texts


def create_chunks(texts: List[str]) -> List[str]:
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks: List[str] = []
    for txt in texts:
        chunks.extend(splitter.split_text(txt))
    return chunks


def build_or_load_db(chunks: List[str]):
    embeddings = OpenAIEmbeddings(api_key=OPENAI_API_KEY)
    if os.path.exists(FAISS_DIR):
        return FAISS.load_local(FAISS_DIR, embeddings, allow_dangerous_deserialization=True)
    db = FAISS.from_texts(chunks, embeddings)
    db.save_local(FAISS_DIR)
    return db


def ensure_qa_ready():
    global _db, _qa
    if _qa is not None:
        return
    with _db_lock:
        if _qa is not None:
            return
        texts = extract_text_from_pdfs(POLICY_DIR)
        chunks = create_chunks(texts)
        _db = build_or_load_db(chunks)
        retriever = _db.as_retriever()
        llm = ChatOpenAI(model=MODEL_NAME, temperature=0, api_key=OPENAI_API_KEY)
        _qa = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)


class AskRequest(BaseModel):
    question: str


class AskResponse(BaseModel):
    answer: str


@app.on_event("startup")
def startup_event():
    # Initialize on startup so the first query is fast
    ensure_qa_ready()


@app.post("/api/ask", response_model=AskResponse)
def ask(req: AskRequest):
    ensure_qa_ready()
    assert _qa is not None
    answer = _qa.run(req.question)
    return AskResponse(answer=answer)


@app.post("/api/reindex")
def reindex():
    """Force rebuild of the FAISS index from POLICY_DIR."""
    global _db, _qa
    with _db_lock:
        texts = extract_text_from_pdfs(POLICY_DIR)
        chunks = create_chunks(texts)
        if os.path.exists(FAISS_DIR):
            # Clear previous index directory contents
            for root, dirs, files in os.walk(FAISS_DIR, topdown=False):
                for name in files:
                    os.remove(os.path.join(root, name))
                for name in dirs:
                    os.rmdir(os.path.join(root, name))
        _db = build_or_load_db(chunks)
        retriever = _db.as_retriever()
        llm = ChatOpenAI(model=MODEL_NAME, temperature=0, api_key=OPENAI_API_KEY)
        _qa = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
    return {"status": "ok", "indexed_docs": len(chunks)}


@app.get("/healthz")
def healthz():
    return {"status": "ok"}
