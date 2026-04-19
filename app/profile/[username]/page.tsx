import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, CheckCircle2 } from "lucide-react";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  // Mock user data replacement for Prisma query
  const user = {
    name: username,
    email: `${username}@example.com`,
    imageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    trustScore: 88,
    bio: "Passionate community helper and problem solver.",
    location: "New York, NY",
    joinedAt: new Date("2023-01-15"),
    completedRequests: 12,
    skills: ["Plumbing", "Electrical", "Gardening"],
    requests: [
      { id: "1", title: "Leaky Faucet", status: "COMPLETED", createdAt: new Date() },
      { id: "2", title: "Paint Living Room", status: "OPEN", createdAt: new Date() },
    ],
  };

  if (!user) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={user.imageUrl || "/placeholder.png"}
                  alt={user.name || "User"}
                  fill
                  className="rounded-full object-cover border-4 border-primary/10"
                />
              </div>
              <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
              <p className="text-muted-foreground mb-4">@{username}</p>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 font-bold">{user.trustScore}</span>
                </div>
                <span className="text-muted-foreground text-sm">Trust Score</span>
              </div>

              <div className="w-full space-y-3 text-left border-t pt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Joined {user.joinedAt.toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4" />
                  {user.completedRequests} Requests Completed
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {user.bio}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.requests.map((request) => (
                  <div key={request.id} className="flex justify-between items-center border-b pb-4 last:border-0">
                    <div>
                      <p className="font-medium">{request.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {request.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={request.status === "COMPLETED" ? "default" : "outline"}>
                      {request.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
