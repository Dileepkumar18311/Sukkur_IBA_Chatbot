import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChatMessage } from './ChatMessage';
import { QuickActions } from './QuickActions';
import { FollowUpQuestions } from './FollowUpQuestions';
// import { getResponseForMessage, getFollowUpQuestions } from '@/utils/chatResponses';

interface Message {
  id: string;
  text: string;
  isUser?: boolean;
  sender?: 'user' | 'bot';
  timestamp: Date;
  followUpQuestions?: string[];
}

interface ChatInterfaceProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  isThinking?: boolean; // when using external messages, show typing indicator
}

export const ChatInterface = ({ messages: externalMessages, onSendMessage, isThinking }: ChatInterfaceProps = {}) => {
  const [internalMessages, setInternalMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m the Sukkur IBA Assistant. I can help you with information about admissions, policies, programs, fees, and campus life. How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use external messages if provided, otherwise use internal state
  const messages = externalMessages || internalMessages;
  const setMessages = externalMessages ? () => {} : setInternalMessages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);


  // Call backend API for bot response (used only when onSendMessage not provided)
  const getBotResponseFromAPI = async (userMessage: string): Promise<{ response: string }> => {
    try {
      const res = await fetch('http://localhost:8000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage })
      });
      if (!res.ok) throw new Error('API error');
      const data: { answer: string } = await res.json();
      return { response: data.answer };
    } catch (err) {
      return { response: 'Sorry, there was a problem connecting to the chatbot server.' };
    }
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    // If external onSendMessage is provided, use it
    if (onSendMessage) {
      onSendMessage(messageText);
      setInputValue('');
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Call backend API for response
    const { response } = await getBotResponseFromAPI(messageText);
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      isUser: false,
      timestamp: new Date(),
      followUpQuestions: [] // Optionally parse follow-ups if backend provides
    };
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col shadow-large border-border/50">
      {/* Chat Header */}
      <div className="bg-gradient-primary text-white p-4 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">Sukkur IBA Assistant</h3>
            <p className="text-sm opacity-90">Ask me anything about our university</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-muted/30">
        {messages.map((message) => {
          const isUser = message.isUser ?? (message.sender === 'user');
          return (
            <div key={message.id}>
              <ChatMessage
                message={message.text}
                isUser={isUser}
                timestamp={message.timestamp}
              />
              {!isUser && message.followUpQuestions && (
                <FollowUpQuestions
                  questions={message.followUpQuestions}
                  onQuestionClick={handleQuickQuestion}
                />
              )}
            </div>
          );
        })}
        
        {(externalMessages ? isThinking : isTyping) && (
          <ChatMessage
            message=""
            isUser={false}
            timestamp={new Date()}
            isTyping={true}
          />
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-3">Quick questions:</p>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border/50 bg-background">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about admissions, policies, programs..."
            className="flex-1"
            disabled={externalMessages ? !!isThinking : isTyping}
          />
          <Button 
            type="submit" 
            disabled={!inputValue.trim() || (externalMessages ? !!isThinking : isTyping)}
            className="bg-gradient-primary hover:bg-primary-hover"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};