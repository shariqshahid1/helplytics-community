"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { createNotification } from "./notification.actions";

export async function createOffer(requestId: string, message: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const offer = await prisma.helpOffer.create({
    data: {
      message,
      requestId,
      userId,
    },
    include: {
      request: true,
      user: true,
    }
  });

  // Notify request owner
  await createNotification({
    userId: offer.request.userId,
    content: `${offer.user.name} offered help on your request: "${offer.request.title}"`,
    type: "offer",
    link: `/request/${requestId}`,
  });

  revalidatePath(`/request/${requestId}`);
  return offer;
}

export async function acceptOffer(offerId: string, requestId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Verify ownership of the request
  const request = await prisma.request.findUnique({
    where: { id: requestId },
  });

  if (request?.userId !== userId) throw new Error("Unauthorized");

  const offer = await prisma.helpOffer.update({
    where: { id: offerId },
    data: { status: "accepted" },
    include: { user: true, request: true }
  });

  await prisma.request.update({
    where: { id: requestId },
    data: { status: "in-progress" },
  });

  // Notify helper
  await createNotification({
    userId: offer.userId,
    content: `Your help offer for "${offer.request.title}" has been accepted!`,
    type: "acceptance",
    link: `/request/${requestId}`,
  });

  revalidatePath(`/request/${requestId}`);
}
