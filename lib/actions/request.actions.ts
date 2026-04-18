"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function createRequest(formData: {
  title: string;
  description: string;
  category: string;
  tags: string[];
  urgency: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const request = await prisma.request.create({
    data: {
      ...formData,
      userId,
    },
  });

  revalidatePath("/explore");
  revalidatePath("/dashboard");
  return request;
}

export async function getAIAnalysis(title: string, description: string) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      category: "General",
      tags: ["help"],
      urgency: "Medium",
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant for a help platform. Analyze the request title and description and return a JSON object with 'category', 'tags' (array of 3-5 strings), and 'urgency' (Low, Medium, High, Critical).",
        },
        {
          role: "user",
          content: `Title: ${title}\nDescription: ${description}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("AI analysis failed");
    return JSON.parse(content);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return {
      category: "General",
      tags: ["help"],
      urgency: "Medium",
    };
  }
}

export async function getRequests(filters?: {
  category?: string;
  urgency?: string;
  status?: string;
}) {
  return await prisma.request.findMany({
    where: {
      ...filters,
    },
    include: {
      user: true,
      _count: {
        select: { offers: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getRequestById(id: string) {
  return await prisma.request.findUnique({
    where: { id },
    include: {
      user: true,
      offers: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}
