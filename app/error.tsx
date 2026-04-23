"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-rose-50 text-rose-600 shadow-xl shadow-rose-100">
          <AlertCircle className="h-12 w-12" />
        </div>
        
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 mb-4">Something went wrong</h1>
        <p className="text-zinc-500 font-medium mb-12 leading-relaxed">
          We encountered an unexpected error. Don&apos;t worry, our AI is already analyzing the logs to prevent this from happening again.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => reset()}
            className="h-14 px-8 bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl font-bold shadow-xl shadow-zinc-200 gap-2"
          >
            <RotateCcw className="h-5 w-5" /> Try Again
          </Button>
          <Link href="/">
            <Button 
              variant="outline" 
              className="h-14 px-8 rounded-2xl font-bold border-2 bg-white gap-2"
            >
              <Home className="h-5 w-5" /> Return Home
            </Button>
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-12 p-6 bg-zinc-900 rounded-2xl text-left overflow-auto max-h-48 shadow-2xl">
            <p className="text-rose-400 font-mono text-xs mb-2 uppercase tracking-widest font-bold">Error Details:</p>
            <pre className="text-zinc-400 font-mono text-xs whitespace-pre-wrap">
              {error.message || "Unknown error"}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
