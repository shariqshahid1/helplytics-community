import Navbar from "@/components/Navbar";
import { getConversations } from "@/lib/actions/message.actions";
import ChatInterface from "./ChatInterface";
import { auth } from "@clerk/nextjs/server";

export default async function MessagesPage() {
  const { userId } = await auth();
  const conversations = await getConversations();

  return (
    <div className="h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1 overflow-hidden flex max-w-7xl w-full mx-auto px-4 py-8 gap-6">
        <ChatInterface 
          initialConversations={conversations} 
          currentUserId={userId!} 
        />
      </main>
    </div>
  );
}
