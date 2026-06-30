"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="pt-32 pb-24">
      <div className="container-custom">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-semibold text-[#111111] mb-2">Something went wrong</h2>
          <p className="text-[#666666] mb-8">An unexpected error occurred. Please try again.</p>
          <Button
            onClick={reset}
            className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full px-8"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
