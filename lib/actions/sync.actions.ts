"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
  try {
    const user = await currentUser();
    
    if (!user) return null;

    const email = user.emailAddresses[0].emailAddress;
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || email.split('@')[0];

    const syncedUser = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {
        name,
        email,
        imageUrl: user.imageUrl,
      },
      create: {
        clerkId: user.id,
        name,
        email,
        imageUrl: user.imageUrl,
      },
    });

    return syncedUser;
  } catch (error) {
    console.error("Manual sync failed:", error);
    return null;
  }
}
