import Navbar from "@/components/Navbar";
import AIAnalysis from "@/components/AIAnalysis";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, TrendingUp, BarChart3, Users, Zap } from "lucide-react";

export default function AICenterPage() {
  const stats = [
    { title: "Smart Matching", value: "98%", icon: Zap, color: "text-amber-500" },
    { title: "Response Time", value: "< 5m", icon: TrendingUp, color: "text-green-500" },
    { title: "Resolution Rate", value: "92%", icon: BarChart3, color: "text-indigo-500" },
    { title: "Community Size", value: "1.2k+", icon: Users, color: "text-rose-500" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-zinc-900 rounded-2xl shadow-lg shadow-zinc-200">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-black tracking-tight text-zinc-900">AI Analysis</h1>
          </div>
          <p className="text-zinc-500 text-lg font-medium">Unlock deep platform insights and predictive analytics with our advanced AI engine.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <AIAnalysis />
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-black text-zinc-900">Live Metrics</h2>
            <div className="grid grid-cols-1 gap-4">
              {stats.map((stat) => (
                <Card key={stat.title} className="border-none shadow-sm bg-white rounded-2xl overflow-hidden group hover:shadow-md transition-all">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-zinc-50 rounded-xl">
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <p className="font-bold text-zinc-500">{stat.title}</p>
                    </div>
                    <div className="text-xl font-black text-zinc-900">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-none shadow-sm bg-indigo-600 text-white rounded-[32px] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <TrendingUp className="h-32 w-32" />
              </div>
              <div className="relative z-10">
                <p className="text-indigo-200 font-bold text-xs uppercase tracking-widest mb-4">Weekly Forecast</p>
                <h3 className="text-xl font-black mb-6">Expert availability is expected to increase by 15% this weekend.</h3>
                <div className="h-2 w-full bg-white/20 rounded-full mb-4">
                  <div className="h-full w-[75%] bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
                </div>
                <p className="text-indigo-100 text-xs font-medium">Model confidence: 94%</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
