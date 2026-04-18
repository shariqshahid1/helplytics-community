"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { acceptOffer } from "@/lib/actions/offer.actions";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AcceptOfferButton({ 
  offerId, 
  requestId 
}: { 
  offerId: string; 
  requestId: string 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await acceptOffer(offerId, requestId);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      size="sm" 
      onClick={handleAccept}
      disabled={isLoading}
      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 font-bold"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <span className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Accept Help
        </span>
      )}
    </Button>
  );
}
