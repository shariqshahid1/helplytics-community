"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X, Sparkles, Loader2, BrainCircuit, User, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function OnboardingPage() {
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [currentInterest, setCurrentInterest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(currentSkill.trim())) {
        setSkills([...skills, currentSkill.trim()]);
      }
      setCurrentSkill("");
    }
  };

  const addInterest = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentInterest.trim()) {
      e.preventDefault();
      if (!interests.includes(currentInterest.trim())) {
        setInterests([...interests, currentInterest.trim()]);
      }
      setCurrentInterest("");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-24">
        <div className="text-center mb-16 space-y-4">
          <div className="bg-zinc-900 h-20 w-20 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-100 rotate-12 transition-transform hover:rotate-0 cursor-default">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-black text-zinc-900 tracking-tight">The future starts here.</h1>
          <p className="text-zinc-500 text-xl font-medium">Let&apos;s build your intelligent profile in seconds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
          <Card className="border-none shadow-2xl shadow-indigo-50 bg-white rounded-[48px] overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-indigo-600 to-violet-600" />
            <CardContent className="p-12 space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                  <Label className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Master Skills</Label>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 p-6 bg-zinc-50 rounded-[28px] min-h-[80px]">
                  {skills.map((skill) => (
                    <Badge key={skill} className="bg-white text-zinc-900 shadow-sm border-none px-4 py-2 rounded-xl gap-2 text-xs font-black uppercase tracking-widest">
                      {skill}
                      <button onClick={() => setSkills(skills.filter(s => s !== skill))} className="text-rose-500">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {skills.length === 0 && <p className="text-sm font-bold text-zinc-300 uppercase tracking-widest self-center">Enter your primary skills...</p>}
                </div>
                <Input
                  placeholder="e.g. TypeScript, UI Design, Marketing (Press Enter)"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyDown={addSkill}
                  className="h-14 bg-white border-zinc-100 rounded-2xl px-6 font-bold focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
                    <Heart className="h-5 w-5" />
                  </div>
                  <Label className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Interests</Label>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 p-6 bg-zinc-50 rounded-[28px] min-h-[80px]">
                  {interests.map((interest) => (
                    <Badge key={interest} className="bg-white text-zinc-900 shadow-sm border-none px-4 py-2 rounded-xl gap-2 text-xs font-black uppercase tracking-widest">
                      {interest}
                      <button onClick={() => setInterests(interests.filter(i => i !== interest))} className="text-rose-500">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {interests.length === 0 && <p className="text-sm font-bold text-zinc-300 uppercase tracking-widest self-center">What do you love?</p>}
                </div>
                <Input
                  placeholder="e.g. AI, Open Source, Fitness (Press Enter)"
                  value={currentInterest}
                  onChange={(e) => setCurrentInterest(e.target.value)}
                  onKeyDown={addInterest}
                  className="h-14 bg-white border-zinc-100 rounded-2xl px-6 font-bold focus:ring-indigo-600"
                />
              </div>

              <Button
                onClick={handleComplete}
                disabled={isSubmitting}
                className="w-full bg-zinc-900 text-white hover:bg-zinc-800 h-16 rounded-[24px] text-lg font-black uppercase tracking-widest shadow-xl shadow-zinc-200 transition-all active:scale-95"
              >
                {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : "Establish Profile"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
