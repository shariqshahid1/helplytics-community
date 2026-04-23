import Navbar from "@/components/Navbar";
import { getRequestById } from "@/lib/actions/request.actions";
import { auth } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Tag, User, ChevronLeft, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import OfferForm from "./OfferForm";
import AcceptOfferButton from "./AcceptOfferButton";

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { userId } = await auth();
  const request = await getRequestById(id);

  if (!request) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold">Request not found</h1>
          <Link href="/explore" className="text-indigo-600 mt-4 inline-block">Back to Explore</Link>
        </div>
      </div>
    );
  }

  const isOwner = request.userId === userId;
  const hasAlreadyOffered = request.offers.some(offer => offer.userId === userId);

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <Link href="/explore" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-6 md:mb-8 transition-colors group text-sm font-bold">
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Explore
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <Card className="border-zinc-200 shadow-sm overflow-hidden rounded-2xl md:rounded-[32px]">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-violet-500" />
              <CardHeader className="p-6 md:p-8 pb-4">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100 font-bold">
                    {request.category}
                  </Badge>
                  <Badge variant="outline" className="border-zinc-200 text-zinc-600 font-bold">
                    {request.urgency} Urgency
                  </Badge>
                  <span className="text-[10px] md:text-xs text-zinc-500 ml-auto flex items-center gap-1 font-bold uppercase tracking-widest">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(request.createdAt))} ago
                  </span>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 leading-tight">
                  {request.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8 pt-0">
                <div className="prose prose-zinc max-w-none">
                  <p className="text-zinc-700 leading-relaxed whitespace-pre-wrap text-sm md:text-base font-medium">
                    {request.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-8">
                  {request.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-zinc-100 text-zinc-600 px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
                      <Tag className="h-3 w-3 mr-1.5 opacity-50" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Offers Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 flex items-center gap-2 px-1">
                Help Offers
                <Badge variant="secondary" className="bg-zinc-200 text-zinc-700 font-bold">
                  {request.offers.length}
                </Badge>
              </h3>

              {request.offers.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-zinc-200 p-12 text-center">
                  <p className="text-zinc-500 italic font-medium">No offers yet. Be the first to help!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {request.offers.map((offer) => (
                    <Card key={offer.id} className={`border-zinc-200 shadow-sm rounded-2xl md:rounded-[28px] ${offer.status === 'accepted' ? 'ring-2 ring-indigo-500 ring-offset-0' : ''}`}>
                      <CardContent className="p-5 md:p-6">
                        <div className="flex justify-between items-start gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-zinc-200 overflow-hidden border border-zinc-100 shrink-0">
                              {offer.user.imageUrl ? (
                                <img src={offer.user.imageUrl} alt={offer.user.name} className="h-full w-full object-cover" />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center bg-zinc-100 text-zinc-400 font-bold">
                                  {offer.user.name[0]}
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-zinc-900 truncate">{offer.user.name}</p>
                              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                                {formatDistanceToNow(new Date(offer.createdAt))} ago
                              </p>
                            </div>
                          </div>
                          {offer.status === 'accepted' && (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 gap-1.5 shrink-0 font-bold">
                              <CheckCircle2 className="h-3 w-3" />
                              Accepted
                            </Badge>
                          )}
                        </div>
                        <p className="text-zinc-700 text-sm leading-relaxed mb-4 font-medium">
                          {offer.message}
                        </p>
                        {isOwner && offer.status === 'pending' && (
                          <div className="flex justify-end pt-4 border-t border-zinc-50">
                            <AcceptOfferButton offerId={offer.id} requestId={request.id} />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-zinc-200 shadow-sm sticky top-24 rounded-2xl md:rounded-[32px]">
              <CardHeader className="p-6 md:p-8 pb-4">
                <CardTitle className="text-lg font-black">About the Author</CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-zinc-100 overflow-hidden border border-zinc-200 shrink-0">
                    {request.user.imageUrl ? (
                      <img src={request.user.imageUrl} alt={request.user.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-zinc-50 text-zinc-300">
                        <User className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-zinc-900 truncate">{request.user.name}</h4>
                    <p className="text-xs md:text-sm text-zinc-500 font-medium">Trust Score: {request.user.trustScore}</p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-zinc-100">
                  {!isOwner && !hasAlreadyOffered && request.status === 'open' && (
                    <OfferForm requestId={request.id} />
                  )}
                  {isOwner && (
                    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                      <p className="text-xs text-zinc-600 font-bold text-center leading-relaxed">
                        This is your request. You can manage offers from the list on the left.
                      </p>
                    </div>
                  )}
                  {hasAlreadyOffered && !isOwner && (
                    <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                      <p className="text-xs text-indigo-700 font-bold text-center leading-relaxed">
                        You have already offered help for this request.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
