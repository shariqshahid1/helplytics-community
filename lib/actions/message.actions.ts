"use server";

import { auth } from "@clerk/nextjs/server";

export async function getConversations() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return [
    {
      clerkId: "mock_clerk_user_2",
      name: "Alice",
      imageUrl: "https://github.com/shadcn.png",
      lastMessage: "See you then!",
    }
  ];
}

export async function getMessagesWithUser(otherUserId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return [
    {
      id: "msg_1",
      content: "Hello! How can I help?",
      senderId: otherUserId,
      createdAt: new Date(),
      sender: {
        name: "Alice",
        imageUrl: "https://github.com/shadcn.png"
      }
    },
    {
      id: "msg_2",
      content: "I need help with my project.",
      senderId: userId,
      createdAt: new Date(),
      sender: {
        name: "Mock User",
        imageUrl: "https://github.com/shadcn.png"
      }
    }
  ];
}

export async function sendMessage(receiverId: string, content: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  console.log(`Mock sending message to ${receiverId}: ${content}`);
  return {
    id: "mock_msg_" + Date.now(),
    content,
    senderId: userId,
    receiverId,
    createdAt: new Date(),
  };
}
