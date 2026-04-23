import Navbar from "@/components/Navbar";
import { getLeaderboard } from "@/lib/actions/user.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Medal, Crown, TrendingUp, Zap } from "lucide-react";

export default async function LeaderboardPage() {
  const leaders = await getLeaderboard();

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="h-10 w-10 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />;
      case 1: return <Medal className="h-8 w-8 text-zinc-400" />;
      case 2: return <Medal className="h-8 w-8 text-amber-600" />;
      default: return <span className="text-xl font-black text-zinc-200">#0{index + 1}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm text-zinc-900 text-[10px] md:text-xs font-bold mb-6">
            <Trophy className="h-3.5 w-3.5 text-yellow-500" />
            <span>Community Hall of Fame</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 mb-6">Top Contributors</h1>
          <p className="text-zinc-500 text-base md:text-lg font-medium max-w-xl mx-auto px-4">
            Honoring the experts who build the future of our community through relentless contribution.
          </p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {leaders.map((leader, index) => (
            <Card 
              key={leader.id} 
              className={`border-none shadow-sm transition-all duration-500 rounded-[32px] md:rounded-[40px] overflow-hidden group ${
                index === 0 ? 'bg-zinc-900 text-white shadow-2xl shadow-indigo-100 ring-4 ring-indigo-500/10' : 'bg-white hover:shadow-xl hover:shadow-indigo-50'
              }`}
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full md:w-auto">
                    <div className="md:w-16 flex justify-center shrink-0 order-2 md:order-1">
                      {getRankIcon(index)}
                    </div>
                    
                    <div className="relative order-1 md:order-2">
                      <div className={`h-20 w-20 md:h-24 md:w-24 rounded-[28px] md:rounded-[32px] overflow-hidden border-4 transition-transform group-hover:scale-105 duration-500 shrink-0 ${index === 0 ? 'border-indigo-500/30' : 'border-zinc-50 shadow-sm'}`}>
                        {leader.imageUrl ? (
                          <img src={leader.imageUrl} alt={leader.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-zinc-100 text-zinc-400 font-bold text-xl md:text-2xl">
                            {leader.name[0]}
                          </div>
                        )}
                      </div>
                      {index === 0 && (
                        <div className="absolute -top-2 -right-2 bg-indigo-600 p-2 rounded-xl shadow-lg">
                          <Zap className="h-4 w-4 text-white fill-white" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 order-3">
                      <h3 className={`text-xl md:text-2xl font-black ${index === 0 ? 'text-white' : 'text-zinc-900'}`}>{leader.name}</h3>
                      <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <Badge className={`rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-widest border-none ${index === 0 ? 'bg-white/10 text-white' : 'bg-zinc-50 text-zinc-500'}`}>
                          Level 12 Expert
                        </Badge>
                        <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${index === 0 ? 'text-zinc-400' : 'text-zinc-400'}`}>
                          <TrendingUp className="h-3 w-3" /> 100% resolution rate
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-8 md:gap-12 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 border-zinc-100/10">
                    <div className="text-center flex-1 md:flex-none">
                      <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${index === 0 ? 'text-indigo-400' : 'text-zinc-400'}`}>Reputation</p>
                      <div className="flex items-center gap-2 justify-center">
                        <Star className={`h-4 w-4 md:h-5 md:w-5 ${index === 0 ? 'text-indigo-400 fill-indigo-400' : 'text-indigo-600 fill-indigo-600'}`} />
                        <span className="text-2xl md:text-3xl font-black">{leader.trustScore}</span>
                      </div>
                    </div>
                    
                    <div className="hidden md:block w-px h-12 bg-zinc-200/20" />
                    
                    <div className="text-center flex-1 md:flex-none">
                      <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${index === 0 ? 'text-zinc-400' : 'text-zinc-400'}`}>Solutions</p>
                      <p className="text-xl md:text-2xl font-black">128</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {leaders.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[48px] border-2 border-dashed border-zinc-100">
              <div className="bg-zinc-50 h-24 w-24 rounded-[32px] flex items-center justify-center mx-auto mb-8 text-zinc-200">
                <Trophy className="h-12 w-12" />
              </div>
              <h3 className="text-3xl font-black text-zinc-900 mb-2">The arena is empty.</h3>
              <p className="text-zinc-500 font-medium max-w-xs mx-auto mb-10">Start helping others to climb the ranks and become a legendary contributor.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
