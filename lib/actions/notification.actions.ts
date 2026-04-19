"use server";

import { auth } from "@clerk/nextjs/server";

export async function getNotifications() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return [
    {
      id: "mock_notif_1",
      type: "OFFER",
      content: "Someone offered to help with your request!",
      isRead: false,
      link: "/dashboard",
      createdAt: new Date(),
    }
  ];
}

export async function markAsRead(notificationId: string) {
  console.log("Mock marking notification as read:", notificationId);
  return { success: true };
}

export async function createNotification(userId: string, type: string, content: string, link?: string) {
  console.log("Mock creating notification for user:", userId);
  return { success: true };
}
