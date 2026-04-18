"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createOffer } from "@/lib/actions/offer.actions";
import { Loader2, Send } from "lucide-react";

export default function OfferForm({ requestId }: { requestId: string }) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      await createOffer(requestId, message);
      setMessage("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-bold text-zinc-900">Offer your help</label>
        <Textarea
          placeholder="I can help you with this. I have experience in..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[100px] border-zinc-200 focus:ring-indigo-500"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting || !message.trim()}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full gap-2"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Send Offer
      </Button>
    </form>
  );
}
