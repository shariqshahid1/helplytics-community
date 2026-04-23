"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { createRequest, getAIAnalysis } from "@/lib/actions/request.actions";
import { Sparkles, Loader2, X, ChevronLeft, BrainCircuit, ShieldCheck, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Category is required"),
  urgency: z.string().min(1, "Urgency is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export default function CreateRequestPage() {
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTag, setCurrentTag] = useState("");
  const [showAiSuccess, setShowAiSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "General",
      urgency: "Medium",
      tags: [],
    },
  });

  const { watch, setValue } = form;
  const tags = watch("tags");

  const analyzeWithAI = async () => {
    const title = watch("title");
    const description = watch("description");

    if (title.length < 10 || description.length < 20) {
      alert("Please provide more details (title min 10, desc min 20 chars) before AI analysis.");
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await getAIAnalysis(title, description);
      setValue("category", result.category);
      setValue("urgency", result.urgency);
      setValue("tags", result.tags);
      setShowAiSuccess(true);
      setTimeout(() => setShowAiSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await createRequest(values);
      router.push("/explore");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setValue("tags", [...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue("tags", tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-16">
        <Link href="/explore" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-bold text-xs md:text-sm uppercase tracking-widest mb-8 md:mb-12 transition-all group">
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Live Feed
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2">
            <div className="mb-8 md:mb-12">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 mb-4">Request Expert Help</h1>
              <p className="text-zinc-500 text-base md:text-lg font-medium leading-relaxed">
                Describe your challenge in detail. Our AI will analyze your request and pair you with the best available expert.
              </p>
            </div>

            <Card className="border-none shadow-sm bg-white rounded-[40px] overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-indigo-600 to-violet-600" />
              <CardContent className="p-10">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                  <div className="space-y-4">
                    <Label htmlFor="title" className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Request Title</Label>
                    <Input
                      id="title"
                      placeholder="What do you need help with?"
                      className="h-14 bg-zinc-50 border-none rounded-2xl px-6 text-lg font-bold placeholder:text-zinc-300 focus:ring-2 focus:ring-indigo-600/20 transition-all"
                      {...form.register("title")}
                    />
                    {form.formState.errors.title && (
                      <p className="text-xs font-bold text-rose-500 uppercase tracking-widest">{form.formState.errors.title.message}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="description" className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Deep Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide full context, technical details, and what you've already attempted..."
                      className="min-h-[200px] bg-zinc-50 border-none rounded-[32px] p-8 text-lg font-medium leading-relaxed placeholder:text-zinc-300 focus:ring-2 focus:ring-indigo-600/20 transition-all"
                      {...form.register("description")}
                    />
                    {form.formState.errors.description && (
                      <p className="text-xs font-bold text-rose-500 uppercase tracking-widest">{form.formState.errors.description.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-6 py-6 border-y border-zinc-50">
                    <Button
                      type="button"
                      onClick={analyzeWithAI}
                      disabled={isAnalyzing}
                      className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-black gap-3 transition-all relative overflow-hidden"
                    >
                      {isAnalyzing ? <Loader2 className="h-5 w-5 animate-spin" /> : <BrainCircuit className="h-5 w-5" />}
                      {isAnalyzing ? "AI Engine Running..." : "Run AI Analysis"}
                      {showAiSuccess && (
                        <div className="absolute inset-0 bg-green-500 text-white flex items-center justify-center gap-2 animate-in slide-in-from-bottom">
                          <ShieldCheck className="h-5 w-5" /> Optimizing Fields
                        </div>
                      )}
                    </Button>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Powered by Helplytics Intelligence v2.0</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label htmlFor="category" className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Category</Label>
                      <Select
                        onValueChange={(val) => setValue("category", val || "General")}
                        value={watch("category")}
                      >
                        <SelectTrigger className="h-14 bg-zinc-50 border-none rounded-2xl px-6 font-bold">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-none shadow-2xl">
                          {["Development", "Design", "Marketing", "Business", "Health", "Lifestyle", "General"].map((cat) => (
                            <SelectItem key={cat} value={cat} className="font-bold rounded-xl">{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="urgency" className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Urgency Level</Label>
                      <Select
                        onValueChange={(val) => setValue("urgency", val || "Medium")}
                        value={watch("urgency")}
                      >
                        <SelectTrigger className="h-14 bg-zinc-50 border-none rounded-2xl px-6 font-bold text-rose-600">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-none shadow-2xl">
                          {["Low", "Medium", "High", "Critical"].map((urg) => (
                            <SelectItem key={urg} value={urg} className="font-bold rounded-xl">{urg}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Intelligent Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-4 p-6 bg-zinc-50 rounded-[24px]">
                      {tags.map((tag) => (
                        <Badge key={tag} className="bg-white text-zinc-900 shadow-sm border-zinc-100 px-4 py-2 rounded-xl gap-2 text-xs font-black uppercase tracking-widest">
                          {tag}
                          <button type="button" onClick={() => removeTag(tag)} className="text-rose-500 hover:scale-125 transition-transform">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {tags.length === 0 && <p className="text-sm font-bold text-zinc-300 uppercase tracking-widest">No tags selected</p>}
                    </div>
                    <Input
                      placeholder="Add custom tags (Press Enter)"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={addTag}
                      className="h-14 bg-white border-zinc-100 rounded-2xl px-6 font-bold"
                    />
                  </div>

                  <div className="flex justify-end gap-4 pt-10 border-t border-zinc-50">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => router.back()}
                      disabled={isSubmitting}
                      className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900"
                    >
                      Discard
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-14 px-12 rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 font-black uppercase tracking-widest shadow-xl shadow-zinc-200 transition-all active:scale-95"
                    >
                      {isSubmitting && <Loader2 className="mr-3 h-5 w-5 animate-spin" />}
                      Launch Request
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="p-8 bg-zinc-900 rounded-[32px] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Zap className="h-20 w-20" />
              </div>
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400" /> AI Checklist
              </h3>
              <ul className="space-y-4 font-bold text-sm uppercase tracking-widest">
                <li className="flex items-center gap-3 text-zinc-400">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,1)]" /> Specific Title
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,1)]" /> Code Snippets
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,1)]" /> Previous Attempts
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,1)]" /> Expected Outcome
                </li>
              </ul>
            </div>

            <Card className="border-none shadow-sm bg-white rounded-[32px] p-8">
              <h3 className="text-xl font-black text-zinc-900 mb-4">Trust Protocol</h3>
              <p className="text-zinc-500 font-medium leading-relaxed mb-6">
                All requests are logged on the trust chain. Providing clear information increases your matching priority.
              </p>
              <div className="p-4 bg-indigo-50 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-indigo-600" />
                <span className="text-xs font-black text-indigo-700 uppercase tracking-widest">Verified Community</span>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
