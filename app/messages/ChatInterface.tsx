"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Send, Search, MessageSquare, Sparkles } from "lucide-react";
import { getMessagesWithUser, sendMessage } from "@/lib/actions/message.actions";
import { formatDistanceToNow } from "date-fns";

interface Conversation {
  clerkId: string;
  name: string;
  imageUrl: string | null;
}

interface Message {
  id: string;
  content: string;
  createdAt: Date;
  senderId: string;
  sender: {
    name: string;
    imageUrl: string | null;
  };
}

export default function ChatInterface({ 
  initialConversations,
  currentUserId 
}: { 
  initialConversations: Conversation[],
  currentUserId: string 
}) {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedUser, setSelectedUser] = useState<Conversation | null>(initialConversations[0] || null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedUser) {
      loadMessages();
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    if (!selectedUser) return;
    setIsLoading(true);
    try {
      const msgs = await getMessagesWithUser(selectedUser.clerkId);
      setMessages(msgs as any);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !newMessage.trim()) return;

    setIsSending(true);
    try {
      const sent = await sendMessage(selectedUser.clerkId, newMessage);
      setMessages([...messages, {
        ...sent,
        sender: { name: "Me", imageUrl: null } // Temporary optimistic update
      } as any]);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex-1 flex gap-6 overflow-hidden">
      {/* Sidebar - Conversations */}
      <Card className="w-80 flex flex-col border-none shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-white">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-indigo-600" />
            <CardTitle className="text-lg">Conversations</CardTitle>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input placeholder="Search people..." className="pl-9 bg-zinc-50 border-none" />
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-2 space-y-1 bg-white">
          {conversations.map((user) => (
            <button
              key={user.clerkId}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                selectedUser?.clerkId === user.clerkId 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'hover:bg-zinc-50 text-zinc-600'
              }`}
            >
              <div className="h-10 w-10 rounded-full bg-zinc-200 overflow-hidden flex-shrink-0">
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-zinc-100 text-zinc-400">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold truncate">{user.name}</p>
                <p className="text-xs opacity-60 truncate">Active conversation</p>
              </div>
            </button>
          ))}
          {conversations.length === 0 && (
            <div className="text-center py-12 opacity-40">
              <MessageSquare className="h-10 w-10 mx-auto mb-2" />
              <p className="text-xs">No chats yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col border-none shadow-sm overflow-hidden bg-white">
        {selectedUser ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-200 overflow-hidden">
                  {selectedUser.imageUrl ? (
                    <img src={selectedUser.imageUrl} alt={selectedUser.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-zinc-100 text-zinc-400">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 leading-none">{selectedUser.name}</h4>
                  <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-50/30">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] p-4 rounded-2xl text-sm shadow-sm ${
                    msg.senderId === currentUserId 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-zinc-800 rounded-bl-none'
                  }`}>
                    {msg.content}
                    <div className={`text-[10px] mt-2 opacity-50 ${
                      msg.senderId === currentUserId ? 'text-white' : 'text-zinc-500'
                    }`}>
                      {formatDistanceToNow(new Date(msg.createdAt))} ago
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-2">
              <Input 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 bg-zinc-50 border-none rounded-xl h-12"
                disabled={isSending}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="h-12 w-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                disabled={isSending || !newMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-300">
            <MessageSquare className="h-16 w-16 mb-4 opacity-10" />
            <p className="text-lg font-medium">Select a conversation to start chatting</p>
          </div>
        )}
      </Card>
    </div>
  );
}
