import Navbar from "@/components/Navbar";
import { getRequests } from "@/lib/actions/request.actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MessageSquare, Tag, User, Sparkles, Filter, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";

export const dynamic = 'force-dynamic';

export default async function ExplorePage() {
  const requests = await getRequests();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "critical": return "bg-rose-50 text-rose-700 border-rose-100";
      case "high": return "bg-orange-50 text-orange-700 border-orange-100";
      case "medium": return "bg-sky-50 text-sky-700 border-sky-100";
      default: return "bg-zinc-50 text-zinc-600 border-zinc-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-8 bg-indigo-600 rounded-full" />
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Live Feed</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight text-zinc-900 mb-6">Explore Requests</h1>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed">
              Join the front lines of problem-solving. Find requests that match your expertise and start building your trust score.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/request/create">
              <Button className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl px-8 h-12 font-bold shadow-lg shadow-zinc-200">
                Create Request
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <Input 
              placeholder="Search by keywords, skills, or tags..." 
              className="pl-12 h-14 bg-white border-zinc-100 rounded-2xl shadow-sm focus:ring-indigo-600"
            />
          </div>
          <Button variant="outline" className="h-14 rounded-2xl bg-white border-zinc-100 font-bold gap-2">
            <Filter className="h-5 w-5" /> Categories
          </Button>
          <Button variant="outline" className="h-14 rounded-2xl bg-white border-zinc-100 font-bold gap-2">
            <Sparkles className="h-5 w-5 text-indigo-600" /> AI Sort
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((request) => (
            <Card key={request.id} className="group flex flex-col border-none shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 rounded-[32px] overflow-hidden bg-white">
              <CardHeader className="p-8 pb-4">
                <div className="flex justify-between items-center mb-6">
                  <Badge variant="outline" className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider border-none ${getUrgencyColor(request.urgency)}`}>
                    {request.urgency}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-zinc-400 font-bold text-[10px] uppercase tracking-widest">
                    <Clock className="h-3.5 w-3.5" />
                    {formatDistanceToNow(new Date(request.createdAt))}
                  </div>
                </div>
                <CardTitle className="text-2xl font-black text-zinc-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {request.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-1">
                <p className="text-zinc-500 line-clamp-3 text-base leading-relaxed mb-8 font-medium">
                  {request.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {request.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-zinc-50 text-zinc-500 text-[10px] uppercase tracking-widest font-black px-3 py-1 border-none">
                      {tag}
                    </Badge>
                  ))}
                  {request.tags.length > 3 && (
                    <span className="text-[10px] text-zinc-300 font-bold ml-1">+{request.tags.length - 3}</span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-8 pt-6 border-t border-zinc-50 flex items-center justify-between bg-zinc-50/30">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-zinc-200 overflow-hidden ring-2 ring-white shadow-sm">
                    {request.user.imageUrl ? (
                      <img src={request.user.imageUrl} alt={request.user.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-zinc-100 text-zinc-400">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-zinc-900 leading-none">{request.user.name}</span>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Lvl 4 Expert</span>
                  </div>
                </div>
                <Link href={`/request/${request.id}`}>
                  <Button size="sm" variant="ghost" className="h-10 w-10 rounded-full p-0 hover:bg-indigo-600 hover:text-white transition-all shadow-indigo-100">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {requests.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[48px] border-2 border-dashed border-zinc-100">
            <div className="bg-zinc-50 h-24 w-24 rounded-[32px] flex items-center justify-center mx-auto mb-8">
              <MessageSquare className="h-12 w-12 text-zinc-200" />
            </div>
            <h3 className="text-3xl font-black text-zinc-900 mb-4">The feed is quiet.</h3>
            <p className="text-zinc-500 max-w-sm mx-auto mb-10 text-lg font-medium leading-relaxed">Everything seems to be solved! Why not create the first request or check the AI Center?</p>
            <Link href="/request/create">
              <Button className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl px-10 h-14 text-lg font-bold">
                Launch Request
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
