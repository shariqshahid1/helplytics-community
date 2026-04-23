import Navbar from "@/components/Navbar";
import { getUserDashboard } from "@/lib/actions/user.actions";
import { syncUser } from "@/lib/actions/sync.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Handshake, Star, ArrowUpRight, Sparkles, TrendingUp, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  await syncUser(); // Fallback sync
  const user = await getUserDashboard();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold">User not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Live Profile</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 break-words">Welcome back, {user.name.split(' ')[0]}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link href={`/profile/${user.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex-1 md:flex-none">
              <Button variant="outline" className="w-full rounded-2xl border-2 font-bold h-12 px-6 bg-white gap-2">
                <User className="h-4 w-4" /> Profile
              </Button>
            </Link>
            <Link href="/request/create" className="flex-1 md:flex-none">
              <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 rounded-2xl px-8 h-12 font-bold shadow-lg shadow-indigo-100 transition-all hover:-translate-y-1">
                New Request
              </Button>
            </Link>
          </div>
        </div>

        {/* Premium Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden group">
            <div className="h-2 bg-indigo-500" />
            <CardContent className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-indigo-50 rounded-2xl">
                  <Star className="h-6 w-6 text-indigo-600 fill-indigo-600" />
                </div>
                <Badge className="bg-indigo-50 text-indigo-700 border-none font-bold">+12%</Badge>
              </div>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">Trust Score</p>
              <div className="text-3xl md:text-4xl font-black text-zinc-900">{user.trustScore}</div>
              <p className="text-xs text-zinc-400 mt-4 font-medium flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Top 5% of contributors
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden group">
            <div className="h-2 bg-zinc-900" />
            <CardContent className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-zinc-100 rounded-2xl">
                  <MessageSquare className="h-6 w-6 text-zinc-900" />
                </div>
                <Badge className="bg-zinc-100 text-zinc-600 border-none font-bold">Active</Badge>
              </div>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">My Requests</p>
              <div className="text-3xl md:text-4xl font-black text-zinc-900">{user.requests.length}</div>
              <p className="text-xs text-zinc-400 mt-4 font-medium">Managing current help needs</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-zinc-900 text-white rounded-[32px] overflow-hidden relative sm:col-span-2 md:col-span-1">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck className="h-20 w-20 md:h-24 md:w-24" />
            </div>
            <CardContent className="p-6 md:p-8 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/10 rounded-2xl">
                  <Handshake className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">Contributions</p>
              <div className="text-3xl md:text-4xl font-black text-white">{user.offers.length}</div>
              <p className="text-xs text-zinc-400 mt-4 font-medium">Verified help offers sent</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="space-y-8 md:space-y-12">
          <TabsList className="bg-zinc-100 p-1.5 rounded-[20px] w-full sm:w-fit border border-zinc-200 shadow-inner overflow-x-auto">
            <TabsTrigger value="requests" className="flex-1 sm:flex-none rounded-[14px] px-6 md:px-8 py-2.5 font-bold data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-md transition-all">My Requests</TabsTrigger>
            <TabsTrigger value="offers" className="flex-1 sm:flex-none rounded-[14px] px-6 md:px-8 py-2.5 font-bold data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-md transition-all">My Offers</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            {user.requests.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-zinc-100">
                <p className="text-zinc-400 text-lg font-medium">You haven&apos;t started any requests yet.</p>
                <Link href="/request/create">
                  <Button className="mt-6 bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl h-12 px-8 font-bold">Ask for Help</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {user.requests.map((request: any) => (
                  <Card key={request.id} className="border-none shadow-sm hover:shadow-xl hover:shadow-indigo-50 transition-all duration-500 rounded-[28px] bg-white group overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-8">
                        <div className="space-y-3 max-w-2xl">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-none font-black text-[10px] uppercase tracking-widest px-3">
                              {request.category}
                            </Badge>
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                              {formatDistanceToNow(new Date(request.createdAt))} ago
                            </span>
                          </div>
                          <Link href={`/request/${request.id}`} className="text-2xl font-black text-zinc-900 hover:text-indigo-600 transition-colors block">
                            {request.title}
                          </Link>
                        </div>
                        <div className="flex items-center gap-10">
                          <div className="text-center">
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">Offers</p>
                            <p className="text-2xl font-black text-zinc-900">{request._count.offers}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">Status</p>
                            <Badge className={`rounded-full px-4 border-none font-bold ${request.status === 'open' ? 'bg-green-50 text-green-700' : 'bg-indigo-50 text-indigo-700'}`}>
                              {request.status}
                            </Badge>
                          </div>
                          <Link href={`/request/${request.id}`}>
                            <Button size="sm" variant="ghost" className="rounded-full h-14 w-14 p-0 hover:bg-indigo-600 hover:text-white transition-all shadow-indigo-100">
                              <ArrowUpRight className="h-6 w-6" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="offers" className="space-y-6">
            {user.offers.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-zinc-100">
                <p className="text-zinc-400 text-lg font-medium">You haven&apos;t offered help to anyone yet.</p>
                <Link href="/explore">
                  <Button className="mt-6 bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl h-12 px-8 font-bold">Browse Requests</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {user.offers.map((offer: any) => (
                  <Card key={offer.id} className="border-none shadow-sm hover:shadow-xl hover:shadow-indigo-50 transition-all duration-500 rounded-[28px] bg-white overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-8">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                              Offered {formatDistanceToNow(new Date(offer.createdAt))} ago
                            </span>
                            <Badge className="bg-zinc-50 text-zinc-500 border-none font-bold text-[10px] uppercase px-3">
                              Response Sent
                            </Badge>
                          </div>
                          <Link href={`/request/${offer.request.id}`} className="text-2xl font-black text-zinc-900 hover:text-indigo-600 transition-colors block line-clamp-1">
                            {offer.request.title}
                          </Link>
                          <p className="text-zinc-500 font-medium line-clamp-1 bg-zinc-50 p-3 rounded-xl border border-zinc-100 italic">&quot;{offer.message}&quot;</p>
                        </div>
                        <div className="flex items-center gap-10">
                          <div className="text-center min-w-[100px]">
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">Offer Status</p>
                            <Badge className={`rounded-full px-4 border-none font-bold ${offer.status === 'accepted' ? 'bg-green-50 text-green-700' : 'bg-zinc-100 text-zinc-500'}`}>
                              {offer.status}
                            </Badge>
                          </div>
                          <Link href={`/request/${offer.request.id}`}>
                            <Button size="sm" variant="ghost" className="rounded-full h-14 w-14 p-0 hover:bg-indigo-600 hover:text-white transition-all shadow-indigo-100">
                              <ArrowUpRight className="h-6 w-6" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
