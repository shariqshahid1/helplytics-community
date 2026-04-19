"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { OpenAI } from "openai";

export async function createRequest(formData: {
  title: string;
  description: string;
  category: string;
  tags: string[];
  urgency: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  console.log("Mock creating request:", formData);
  
  // Return mock created request
  const request = {
    id: "mock_req_" + Date.now(),
    ...formData,
    userId,
    status: "OPEN",
    createdAt: new Date(),
  };

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

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

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
  // Return mock requests
  return [
    {
      id: "mock_req_1",
      title: "Need help with Next.js",
      description: "Trying to understand Server Actions.",
      category: "Programming",
      urgency: "High",
      tags: ["nextjs", "react", "programming"],
      status: "OPEN",
      createdAt: new Date(),
      user: {
        name: "Alice",
        imageUrl: "https://github.com/shadcn.png",
        trustScore: 95
      },
      _count: {
        offers: 2,
      },
    },
    {
      id: "mock_req_2",
      title: "Grocery Shopping",
      description: "Need someone to pick up groceries.",
      category: "Errands",
      urgency: "Medium",
      tags: ["nextjs", "react", "programming"],
      status: "OPEN",
      createdAt: new Date(),
      user: {
        name: "Bob",
        imageUrl: "https://github.com/shadcn.png",
        trustScore: 88
      },
      _count: {
        offers: 0,
      },
    }
  ];
}

export async function getRequestById(id: string) {
  // Return mock request details
  return {
    id: id,
    title: "Mock Request Title",
    description: "This is a mock description for request " + id,
    category: "General",
    urgency: "Medium",
    tags: ["general", "help"],
    status: "OPEN",
    createdAt: new Date(),
    userId: "mock_owner_id",
    user: {
      name: "Mock User",
      imageUrl: "https://github.com/shadcn.png",
      trustScore: 90
    },
    offers: [
      {
        id: "mock_off_1",
        message: "I can help with this!",
        status: "PENDING",
        createdAt: new Date(),
        userId: "mock_helper_id",
        user: {
          name: "Helper person",
          imageUrl: "https://github.com/shadcn.png",
          trustScore: 92
        }
      }
    ]
  };
}
