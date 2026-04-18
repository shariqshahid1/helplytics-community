import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BarChart3, TrendingUp, Users, Lightbulb, Zap } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function AICenterPage() {
  const stats = [
    { title: "Smart Matching", value: "98%", icon: Zap, color: "text-amber-500" },
    { title: "Response Time", value: "< 5m", icon: TrendingUp, color: "text-green-500" },
    { title: "Resolution Rate", value: "92%", icon: BarChart3, color: "text-indigo-500" },
    { title: "Community Size", value: "1.2k+", icon: Users, color: "text-rose-500" },
  ];

  const insights = [
    { 
      title: "Rising Trends", 
      description: "AI development and Next.js 14 hydration issues are the most common help requests this week.",
      category: "Trends" 
    },
    { 
      title: "Contributor Spotlight", 
      description: "Our top contributors have solved over 45 high-priority requests in the last 48 hours.",
      category: "Community" 
    },
    { 
      title: "AI Optimization", 
      description: "We've improved our smart-tagging system, resulting in 25% faster matching between requests and experts.",
      category: "Platform" 
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-600 rounded-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900">AI Center</h1>
          </div>
          <p className="text-zinc-600 text-lg">Intelligent insights and platform metrics powered by our advanced help-matching engine.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-none shadow-sm bg-white overflow-hidden group">
              <div className="h-1 bg-zinc-100 group-hover:bg-indigo-600 transition-colors" />
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{stat.title}</p>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-zinc-900">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-indigo-600" />
              Platform Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {insights.map((insight) => (
                <Card key={insight.title} className="border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">{insight.category}</Badge>
                    </div>
                    <CardTitle className="text-xl font-bold">{insight.title}</CardTitle>
                    <CardDescription className="text-zinc-600 text-base leading-relaxed pt-2">
                      {insight.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900">Weekly Forecast</h2>
            <Card className="border-none shadow-sm bg-zinc-900 text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="h-32 w-32" />
              </div>
              <div className="relative z-10">
                <p className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-4">AI Prediction</p>
                <h3 className="text-2xl font-bold mb-6">Expert availability is expected to increase by 15% this weekend.</h3>
                <div className="h-2 w-full bg-white/10 rounded-full mb-4">
                  <div className="h-full w-[75%] bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)]" />
                </div>
                <p className="text-zinc-400 text-sm">Our model suggests now is an ideal time to post complex technical requests.</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
