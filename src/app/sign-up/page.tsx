import type { Metadata } from "next";
import { Suspense } from "react";
import { SignUpClient } from "./client";

export const metadata: Metadata = {
  title: "Sign Up | AutoPrestige",
  description: "Create your AutoPrestige account.",
};

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpClient />
    </Suspense>
  );
}
