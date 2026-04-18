"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 20
  });
}

export async function markAsRead(notificationId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.notification.update({
    where: { id: notificationId, userId },
    data: { isRead: true }
  });

  revalidatePath("/notifications");
}

export async function createNotification(data: {
  userId: string;
  content: string;
  type: string;
  link?: string;
}) {
  return await prisma.notification.create({
    data
  });
}
