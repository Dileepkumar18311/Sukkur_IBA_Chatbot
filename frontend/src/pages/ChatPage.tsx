import React, { useState, useEffect } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { ChatHistory } from '@/components/ChatHistory';
// import { UserProfile } from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { MessageCircle, Menu, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  followUpQuestions?: string[];
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
  messages: Message[];
}

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: Date;
  totalChats: number;
}

export default function ChatPage() {
  const [user, setUser] = useState<UserData | null>(null);
  
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isThinking, setIsThinking] = useState(false);

  const navigate = useNavigate();

  // Keys for localStorage
  const STORAGE_KEY = 'chat_sessions_v1';
  const CURRENT_SESSION_KEY = 'current_session_id_v1';

  // SEO title and load sessions from localStorage on first mount
  useEffect(() => {
    document.title = 'Sukkur IBA Chatbot | Chat & History';
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const rawCurrent = localStorage.getItem(CURRENT_SESSION_KEY);
      if (raw) {
        const parsed: any[] = JSON.parse(raw);
        const sessions: ChatSession[] = parsed.map((s) => ({
          ...s,
          timestamp: new Date(s.timestamp),
          messages: (s.messages || []).map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          })),
        }));
        setChatSessions(sessions);
        const currentId = rawCurrent || (sessions[0]?.id ?? null);
        setCurrentSessionId(currentId);
        if (currentId) {
          const sess = sessions.find(x => x.id === currentId);
          setCurrentMessages(sess?.messages || []);
        }
      }
    } catch (e) {
      // ignore corrupt storage
    }
    // Do not initialize any mock data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist sessions and current session id whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatSessions));
      if (currentSessionId) {
        localStorage.setItem(CURRENT_SESSION_KEY, currentSessionId);
      } else {
        localStorage.removeItem(CURRENT_SESSION_KEY);
      }
    } catch (e) {
      // ignore quota errors
    }
  }, [chatSessions, currentSessionId]);


  // Remove logout functionality
  const handleLogout = () => {
    setUser(null);
    setChatSessions([]);
    setCurrentMessages([]);
    setCurrentSessionId(null);
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
  };

  const handleSelectSession = (sessionId: string) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setCurrentMessages(session.messages);
    }
  };

  const handleDeleteSession = (sessionId: string) => {
    setChatSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      const remainingSessions = chatSessions.filter(s => s.id !== sessionId);
      if (remainingSessions.length > 0) {
        setCurrentSessionId(remainingSessions[0].id);
        setCurrentMessages(remainingSessions[0].messages);
      } else {
        setCurrentSessionId(null);
        setCurrentMessages([]);
      }
    }
    toast({
      title: "Chat Deleted",
      description: "Chat session has been removed from your history.",
    });
  };

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Conversation',
      lastMessage: '',
      timestamp: new Date(),
      messageCount: 0,
      messages: [],
    };
    setChatSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setCurrentMessages([]);
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    let sessionId = currentSessionId;
    if (!sessionId) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: 'New Conversation',
        lastMessage: '',
        timestamp: new Date(),
        messageCount: 0,
        messages: [],
      };
      setChatSessions(prev => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
      sessionId = newSession.id;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setCurrentMessages(prev => [...prev, userMsg]);
    setChatSessions(prev => prev.map(s => s.id === sessionId ? {
      ...s,
      messages: [...s.messages, userMsg],
      lastMessage: message,
      timestamp: new Date(),
      messageCount: s.messageCount + 1,
      title: s.title === 'New Conversation' ? message.substring(0, 50) + '...' : s.title,
    } : s));

    try {
      setIsThinking(true);
      const res = await fetch('http://localhost:8000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: message })
      });
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const data: { answer: string } = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer,
        sender: 'bot',
        timestamp: new Date(),
      };

      setCurrentMessages(prev => [...prev, botMsg]);
      setChatSessions(prev => prev.map(s => s.id === sessionId ? {
        ...s,
        messages: [...s.messages, botMsg],
        lastMessage: data.answer,
        timestamp: new Date(),
        messageCount: s.messageCount + 1,
      } : s));
    } catch (err: any) {
      console.error(err);
      toast({ title: 'Error', description: 'Failed to get response from server.' });
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Home
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Sukkur IBA Assistant</h1>
                <p className="text-sm text-muted-foreground">Your Academic Companion</p>
              </div>
            </div>
          </div>
          {/* No logout button */}
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r bg-card`}>
          <div className="p-4 h-full overflow-y-auto">
            <ChatHistory
              sessions={chatSessions}
              currentSessionId={currentSessionId || undefined}
              onSelectSession={handleSelectSession}
              onDeleteSession={handleDeleteSession}
              onNewChat={handleNewChat}
            />
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <ChatInterface
            messages={currentMessages}
            onSendMessage={handleSendMessage}
            isThinking={isThinking}
          />
        </div>
      </div>

    </div>
  );
}