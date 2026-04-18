"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getUserDashboard() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      requests: {
        include: {
          _count: {
            select: { offers: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      },
      offers: {
        include: {
          request: true
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  return user;
}

export async function getLeaderboard() {
  return await prisma.user.findMany({
    orderBy: {
      trustScore: 'desc'
    },
    take: 10
  });
}
