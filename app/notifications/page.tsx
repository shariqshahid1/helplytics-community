import Navbar from "@/components/Navbar";
import { getNotifications, markAsRead } from "@/lib/actions/notification.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, Handshake, CheckCircle2, Info, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case "offer": return <Handshake className="h-5 w-5 text-indigo-600" />;
      case "message": return <MessageSquare className="h-5 w-5 text-sky-600" />;
      case "acceptance": return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      default: return <Info className="h-5 w-5 text-zinc-600" />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "offer": return "bg-indigo-50 border-indigo-100";
      case "message": return "bg-sky-50 border-sky-100";
      case "acceptance": return "bg-green-50 border-green-100";
      default: return "bg-zinc-50 border-zinc-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-zinc-900">Notifications</h1>
            <p className="text-zinc-500 font-medium mt-2">Stay updated with your community activity.</p>
          </div>
          <Bell className="h-8 w-8 text-zinc-200" />
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`border-none shadow-sm transition-all hover:shadow-md rounded-3xl overflow-hidden ${
                notification.isRead ? "opacity-70" : "ring-1 ring-indigo-100"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex gap-6 items-start">
                  <div className={`p-4 rounded-2xl ${getTypeStyles(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <p className={`font-bold text-lg ${notification.isRead ? "text-zinc-500" : "text-zinc-900"}`}>
                        {notification.content}
                      </p>
                      {!notification.isRead && (
                        <Badge className="bg-indigo-600 text-white border-none">New</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDistanceToNow(new Date(notification.createdAt))} ago
                      </span>
                    </div>
                    {notification.link && (
                      <div className="pt-4 flex gap-3">
                        <Link href={notification.link}>
                          <Button size="sm" className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl font-bold px-6">
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-zinc-100">
              <div className="bg-zinc-50 h-24 w-24 rounded-[32px] flex items-center justify-center mx-auto mb-8">
                <Bell className="h-12 w-12 text-zinc-200" />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 mb-2">All caught up!</h3>
              <p className="text-zinc-500 font-medium max-w-xs mx-auto">No new notifications at the moment. Check back later.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
