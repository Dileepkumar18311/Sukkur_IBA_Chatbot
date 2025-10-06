import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, LogOut, Settings, MessageCircle } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: Date;
  totalChats: number;
}

interface UserProfileProps {
  user: UserData;
  onLogout: () => void;
  onSettings?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onLogout,
  onSettings,
}) => {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{user.name}</h3>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 rounded-lg bg-accent">
            <div className="flex items-center justify-center gap-1 mb-1">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-lg font-semibold">{user.totalChats}</div>
            <div className="text-xs text-muted-foreground">Total Chats</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-accent">
            <div className="text-lg font-semibold">
              {Math.floor((Date.now() - user.joinDate.getTime()) / (1000 * 60 * 60 * 24))}
            </div>
            <div className="text-xs text-muted-foreground">Days Member</div>
          </div>
        </div>

        <Badge variant="secondary" className="w-full justify-center py-2">
          <User className="h-3 w-3 mr-1" />
          Sukkur IBA Student
        </Badge>

        <div className="flex gap-2">
          {onSettings && (
            <Button variant="outline" size="sm" className="flex-1" onClick={onSettings}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          )}
          <Button variant="outline" size="sm" className="flex-1" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};