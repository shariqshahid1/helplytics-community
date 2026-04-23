"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Send, History, Trash2, Bot, User } from "lucide-react";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export default function AIAnalysis() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("helplytics_ai_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveHistory = (newHistory: ChatMessage[]) => {
    setHistory(newHistory);
    localStorage.setItem("helplytics_ai_history", JSON.stringify(newHistory));
  };

  const handleSend = async () => {
    if (!query.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: query,
      timestamp: Date.now(),
    };

    const newHistory = [...history, userMessage];
    saveHistory(newHistory);
    setQuery("");
    setIsLoading(true);

    // Mock AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: `As Helplytics AI, I've analyzed your query: "${query}". Based on our platform data, you should focus on optimizing your community engagement and trust score. Our current trends suggest that expert availability is peak during weekdays between 2 PM and 6 PM UTC.`,
        timestamp: Date.now(),
      };
      saveHistory([...newHistory, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("helplytics_ai_history");
  };

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-xl bg-white rounded-[32px] overflow-hidden">
        <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-50 rounded-2xl">
              <Bot className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xl font-black text-zinc-900">How can I help you today?</h3>
              <p className="text-zinc-500 font-medium text-sm">Ask about platform trends, expert matching, or your own performance.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="e.g. What are the top skills in demand right now?" 
              className="h-14 rounded-2xl bg-zinc-50 border-zinc-100 focus:ring-indigo-500 px-6 font-medium"
            />
            <Button 
              onClick={handleSend}
              disabled={isLoading}
              className="h-14 w-14 rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 transition-all active:scale-95"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <History className="h-6 w-6 text-indigo-600" />
            Analysis History
          </h3>
          {history.length > 0 && (
            <Button 
              variant="ghost" 
              onClick={clearHistory}
              className="text-zinc-400 hover:text-rose-600 font-bold gap-2"
            >
              <Trash2 className="h-4 w-4" /> Clear All
            </Button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 rounded-[40px] border-2 border-dashed border-zinc-200">
            <p className="text-zinc-400 font-bold">No analysis history yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.slice().reverse().map((msg, i) => (
              <div 
                key={i} 
                className={`flex gap-3 md:gap-4 p-5 md:p-6 rounded-[24px] md:rounded-[28px] ${
                  msg.role === 'user' ? 'bg-white border border-zinc-100 ml-6 md:ml-12' : 'bg-indigo-50/50 border border-indigo-100 mr-6 md:mr-12'
                }`}
              >
                <div className={`p-2 h-fit rounded-xl shrink-0 ${
                  msg.role === 'user' ? 'bg-zinc-100 text-zinc-600' : 'bg-indigo-600 text-white'
                }`}>
                  {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium leading-relaxed text-sm md:text-base break-words ${msg.role === 'user' ? 'text-zinc-900' : 'text-indigo-900'}`}>
                    {msg.content}
                  </p>
                  <p className="mt-2 text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 p-6 rounded-[28px] bg-indigo-50/50 border border-indigo-100 mr-6 md:mr-12 animate-pulse">
                <div className="p-2 h-fit rounded-xl bg-indigo-600 text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-indigo-200 rounded w-3/4" />
                  <div className="h-4 bg-indigo-200 rounded w-1/2" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
