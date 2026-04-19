"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createOffer(requestId: string, content: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  console.log("Mock creating offer for request:", requestId);
  
  const offer = {
    id: "mock_off_" + Date.now(),
    requestId,
    userId,
    content,
    status: "PENDING",
    createdAt: new Date(),
  };

  revalidatePath(`/request/${requestId}`);
  return offer;
}

export async function acceptOffer(offerId: string, requestId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  console.log(`Mock accepting offer ${offerId}`);

  revalidatePath(`/request/${requestId}`);
  return { success: true };
}
