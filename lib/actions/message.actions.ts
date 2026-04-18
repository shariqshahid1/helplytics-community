"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getConversations() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Get all unique users this user has messaged or received messages from
  const sentMessages = await prisma.message.findMany({
    where: { senderId: userId },
    select: { receiverId: true },
    distinct: ['receiverId']
  });

  const receivedMessages = await prisma.message.findMany({
    where: { receiverId: userId },
    select: { senderId: true },
    distinct: ['senderId']
  });

  const userIds = new Set([
    ...sentMessages.map(m => m.receiverId),
    ...receivedMessages.map(m => m.senderId)
  ]);

  const conversations = await prisma.user.findMany({
    where: { clerkId: { in: Array.from(userIds) } },
    select: {
      clerkId: true,
      name: true,
      imageUrl: true,
    }
  });

  return conversations;
}

export async function getMessagesWithUser(otherUserId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId }
      ]
    },
    orderBy: { createdAt: 'asc' },
    include: { sender: true }
  });
}

import { createNotification } from "./notification.actions";

export async function sendMessage(receiverId: string, content: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const message = await prisma.message.create({
    data: {
      content,
      senderId: userId,
      receiverId,
    },
    include: { sender: true }
  });

  // Notify receiver
  await createNotification({
    userId: receiverId,
    content: `New message from ${message.sender.name}`,
    type: "message",
    link: "/messages",
  });

  revalidatePath("/messages");
  return message;
}
