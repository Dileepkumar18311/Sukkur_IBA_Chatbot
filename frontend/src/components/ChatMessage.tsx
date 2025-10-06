import { useState, useEffect } from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

export const ChatMessage = ({ message, isUser, timestamp, isTyping = false }: ChatMessageProps) => {
  const [displayedMessage, setDisplayedMessage] = useState('');

  useEffect(() => {
    if (!isUser && !isTyping) {
      // Typing animation for bot messages
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= message.length) {
          setDisplayedMessage(message.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    } else {
      setDisplayedMessage(message);
    }
  }, [message, isUser, isTyping]);

  return (
    <div className={`flex gap-3 mb-4 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-soft ${
        isUser 
          ? 'bg-chat-user text-chat-user-foreground ml-auto' 
          : 'bg-chat-bot text-chat-bot-foreground'
      }`}>
        <div className="text-sm leading-relaxed">
          {isTyping ? (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          ) : (
            <div className="whitespace-pre-line">{displayedMessage}</div>
          )}
        </div>
        <div className="text-xs opacity-70 mt-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-secondary flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-foreground" />
        </div>
      )}
    </div>
  );
};