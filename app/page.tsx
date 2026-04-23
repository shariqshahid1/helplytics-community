import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowRight, CheckCircle2, Globe, MessageSquare, ShieldCheck, Zap, Sparkles, Star, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 md:pt-24 pb-20 md:pb-32 overflow-hidden">
          {/* Animated Background Mesh */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-violet-200 rounded-full blur-[100px] animate-pulse delay-700" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm text-zinc-900 text-[10px] sm:text-xs font-bold mb-8 transition-transform hover:scale-105 cursor-default">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                <span>Now powered by Helplytics AI v2.0</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-zinc-900 mb-8 leading-[1.1] md:leading-[0.9]">
                Expert help at the speed of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">thought.</span>
              </h1>
              
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 mb-12 leading-relaxed font-medium px-4">
                The world&apos;s first AI-orchestrated help platform. Connect with top contributors, 
                build your trust score, and solve challenges in minutes, not days.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4">
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-10 bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl text-lg font-bold shadow-xl shadow-zinc-200 transition-all hover:-translate-y-1">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/explore" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 rounded-2xl text-lg font-bold border-2 bg-white transition-all hover:bg-zinc-50">
                    Live Feed <ArrowRight className="ml-2 h-5 w-5 text-indigo-600" />
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="flex items-center gap-2 font-bold text-xl"><Zap className="h-6 w-6 fill-zinc-900" /> STARK</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Globe className="h-6 w-6" /> ATLAS</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Star className="h-6 w-6 fill-zinc-900" /> NEXUS</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Users className="h-6 w-6" /> CORE</div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 md:mb-20 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4 px-4">Engineered for excellence.</h2>
              <p className="text-zinc-500 text-base md:text-lg max-w-xl mx-auto font-medium px-4">A suite of powerful tools designed to help you contribute and collaborate effectively.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {[
                {
                  icon: Sparkles,
                  title: "AI Analysis",
                  desc: "Automatic categorization and smart-tagging using state-of-the-art language models.",
                  color: "bg-indigo-600"
                },
                {
                  icon: ShieldCheck,
                  title: "Trust Protocol",
                  desc: "A decentralized reputation system that rewards high-quality contributions and verified help.",
                  color: "bg-violet-600"
                },
                {
                  icon: MessageSquare,
                  title: "Instant Match",
                  desc: "Our matching engine pairs you with the perfect expert based on skills and urgency.",
                  color: "bg-zinc-900"
                }
              ].map((feat, i) => (
                <div key={i} className="group p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-zinc-100 bg-[#fafafa] transition-all hover:shadow-2xl hover:shadow-indigo-100 md:hover:-translate-y-2">
                  <div className={`${feat.color} p-4 rounded-2xl w-fit shadow-lg mb-8 group-hover:scale-110 transition-transform`}>
                    <feat.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">{feat.title}</h3>
                  <p className="text-zinc-500 leading-relaxed text-base md:text-lg">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic CTA Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto rounded-[32px] md:rounded-[50px] bg-zinc-900 overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-full md:w-[60%] h-full bg-gradient-to-l from-indigo-500/20 to-transparent pointer-events-none" />
            <div className="p-10 md:p-24 relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-6xl font-black text-white mb-8 leading-tight">
                Ready to join the<br className="hidden md:block" />future of help?
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl max-w-xl mb-12 font-medium mx-auto md:ml-0">
                Join over 10,000+ experts and seekers building the next generation of collaborative intelligence.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <Link href="/sign-up" className="w-full md:w-auto">
                  <Button size="lg" className="w-full md:w-auto h-16 px-12 bg-white text-zinc-900 hover:bg-zinc-100 rounded-2xl text-xl font-black transition-all hover:scale-105">
                    Join the Community
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-6 max-w-sm">
              <div className="flex items-center gap-2">
                <div className="bg-zinc-900 p-1.5 rounded-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tight text-zinc-900">
                  Helplytics <span className="text-indigo-600">AI</span>
                </span>
              </div>
              <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                The modern standard for community collaboration and expert intelligence.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
              <div className="space-y-4">
                <h4 className="font-bold text-zinc-900 uppercase tracking-widest text-sm">Platform</h4>
                <ul className="space-y-2 text-zinc-500 font-medium">
                  <li><Link href="/explore" className="hover:text-indigo-600 transition-colors">Explore</Link></li>
                  <li><Link href="/leaderboard" className="hover:text-indigo-600 transition-colors">Leaderboard</Link></li>
                  <li><Link href="/ai-center" className="hover:text-indigo-600 transition-colors">AI Center</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-zinc-900 uppercase tracking-widest text-sm">Community</h4>
                <ul className="space-y-2 text-zinc-500 font-medium">
                  <li><Link href="#" className="hover:text-indigo-600 transition-colors">Guidelines</Link></li>
                  <li><Link href="#" className="hover:text-indigo-600 transition-colors">Trust Score</Link></li>
                  <li><Link href="#" className="hover:text-indigo-600 transition-colors">Rewards</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-400 font-medium text-sm uppercase tracking-wider">
            <p>© 2026 Helplytics AI. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-zinc-900 transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-zinc-900 transition-colors">GitHub</Link>
              <Link href="#" className="hover:text-zinc-900 transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
