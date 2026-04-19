"use server";

import { auth } from "@clerk/nextjs/server";

export async function getUserDashboard() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Mock data for user dashboard
  return {
    id: "mock_user_id",
    clerkId: userId,
    name: "Mock User",
    email: "mock@example.com",
    trustScore: 85,
    requests: [
      {
        id: "mock_req_1",
        title: "Fix my plumbing",
        description: "Kitchen sink is leaking.",
        category: "Home Repair",
        status: "OPEN",
        createdAt: new Date(),
        _count: { offers: 2 }
      }
    ],
    offers: [
      {
        id: "mock_off_1",
        status: "PENDING",
        request: {
          title: "Help with React"
        }
      }
    ]
  };
}

export async function getLeaderboard() {
  // Mock data for leaderboard
  return [
    { id: "1", name: "Alice", trustScore: 98, imageUrl: "https://github.com/shadcn.png" },
    { id: "2", name: "Bob", trustScore: 95, imageUrl: "https://github.com/shadcn.png" },
    { id: "3", name: "Charlie", trustScore: 92, imageUrl: "https://github.com/shadcn.png" },
  ];
}
