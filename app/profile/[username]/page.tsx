import Navbar from "@/components/Navbar";
import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Star, MessageSquare, Handshake, Globe, MapPin, Calendar, Share2, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  // Since we use Clerk IDs in our schema but standard slugs for usernames, 
  // let's fetch by email prefix or name for this demo logic
  // In a real app, you'd have a 'username' field in the User model.
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { name: { contains: username.replace('-', ' '), mode: 'insensitive' } },
        { email: { contains: username, mode: 'insensitive' } }
      ]
    },
    include: {
      requests: true,
      offers: {
        include: {
          request: true
        }
      }
    }
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-black text-zinc-900">Expert not found</h1>
          <p className="text-zinc-500 mt-4">The profile you're looking for doesn't exist or is private.</p>
          <Link href="/explore">
            <Button className="mt-8 bg-zinc-900 text-white rounded-2xl px-8">Back to Explore</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Profile Header */}
        <div className="relative mb-12">
          <div className="h-48 w-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[40px] shadow-xl overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <Zap className="h-64 w-64 -rotate-12 absolute -right-10 -bottom-10 text-white" />
            </div>
          </div>
          
          <div className="px-12 -mt-16 flex flex-col md:flex-row items-end gap-8 relative z-10">
            <div className="h-32 w-32 rounded-3xl bg-white p-1.5 shadow-2xl border border-zinc-100">
              {user.imageUrl ? (
                <img src={user.imageUrl} alt={user.name} className="h-full w-full object-cover rounded-2xl" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-zinc-50 text-zinc-300 rounded-2xl">
                  <User className="h-12 w-12" />
                </div>
              )}
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-black text-zinc-900">{user.name}</h1>
                <Badge className="bg-indigo-600 text-white border-none font-bold uppercase text-[10px] tracking-widest px-3">Verified Expert</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-zinc-500 font-bold text-sm uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Global</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Joined {format(new Date(user.createdAt), 'MMM yyyy')}</span>
                <span className="flex items-center gap-1.5 text-indigo-600"><Star className="h-4 w-4 fill-indigo-600" /> Trust Score: {user.trustScore}</span>
              </div>
            </div>
            <div className="flex gap-3 pb-2">
              <Button variant="outline" className="rounded-2xl border-2 font-bold h-12 px-6 bg-white gap-2">
                <Share2 className="h-4 w-4" /> Share
              </Button>
              <Link href="/messages">
                <Button className="rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 font-bold h-12 px-8 shadow-lg shadow-zinc-200">
                  Message Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar Info */}
          <div className="space-y-8">
            <Card className="border-none shadow-sm bg-white rounded-[32px] p-8">
              <h3 className="text-xl font-black text-zinc-900 mb-6">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.length > 0 ? user.skills.map((skill) => (
                  <Badge key={skill} className="bg-zinc-50 text-zinc-500 border-none font-black text-[10px] uppercase tracking-widest px-3 py-1.5">
                    {skill}
                  </Badge>
                )) : (
                  <p className="text-sm text-zinc-400 font-medium italic">No skills listed yet.</p>
                )}
              </div>
            </Card>

            <Card className="border-none shadow-sm bg-zinc-900 text-white rounded-[32px] p-8">
              <h3 className="text-xl font-black mb-6">Impact Stats</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Solutions</p>
                  <p className="text-3xl font-black">{user.offers.filter(o => o.status === 'accepted').length}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Offers</p>
                  <p className="text-3xl font-black">{user.offers.length}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Helped</p>
                  <p className="text-3xl font-black">{new Set(user.offers.map(o => o.request.userId)).size}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Rank</p>
                  <p className="text-3xl font-black text-indigo-400">#42</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-black text-zinc-900 mb-8 flex items-center gap-3">
                <Handshake className="h-6 w-6 text-indigo-600" />
                Recent Contributions
              </h2>
              <div className="space-y-6">
                {user.offers.slice(0, 5).map((offer) => (
                  <Card key={offer.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-[28px] overflow-hidden bg-white">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <Badge className={`rounded-full px-3 border-none font-bold text-[10px] uppercase tracking-widest ${offer.status === 'accepted' ? 'bg-green-50 text-green-700' : 'bg-zinc-50 text-zinc-500'}`}>
                          {offer.status}
                        </Badge>
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{format(new Date(offer.createdAt), 'MMM dd, yyyy')}</span>
                      </div>
                      <h4 className="text-xl font-black text-zinc-900 mb-3">{offer.request.title}</h4>
                      <p className="text-zinc-500 font-medium line-clamp-2 bg-zinc-50 p-4 rounded-2xl italic">&quot;{offer.message}&quot;</p>
                    </CardContent>
                  </Card>
                ))}
                {user.offers.length === 0 && (
                  <div className="p-12 text-center bg-white rounded-[32px] border-2 border-dashed border-zinc-100">
                    <p className="text-zinc-400 font-medium">No contributions to show yet.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
