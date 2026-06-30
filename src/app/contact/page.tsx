import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Contact Us | AutoPrestige",
  description: "Get in touch with AutoPrestige. Call, email, or visit us for any inquiries about car accessories.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 md:pt-32">
      <ContactSection />
    </div>
  );
}
