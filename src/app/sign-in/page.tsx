import type { Metadata } from "next";
import { Suspense } from "react";
import { SignInClient } from "./client";

export const metadata: Metadata = {
  title: "Sign In | AutoPrestige",
  description: "Sign in to your AutoPrestige account.",
};

export default function SignInPage() {
  return (
    <Suspense>
      <SignInClient />
    </Suspense>
  );
}
