import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy | AutoPrestige",
  description: "AutoPrestige privacy policy - how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom max-w-3xl">
        <Breadcrumb items={[{ label: "Privacy Policy" }]} />

        <h1 className="text-3xl md:text-4xl font-semibold text-[#111111] mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none text-[#666666] space-y-6">
          <p className="text-sm text-[#999999]">Last updated: June 1, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Information We Collect</h2>
            <p className="leading-relaxed">
              We collect information you provide directly, including your name, email address,
              phone number, shipping address, and payment information when you place an order
              or create an account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Process and fulfill your orders</li>
              <li>Send order updates and shipping notifications</li>
              <li>Improve our products and services</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Provide customer support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Data Protection</h2>
            <p className="leading-relaxed">
              We implement appropriate security measures to protect your personal information.
              We use SSL encryption for data transmission and do not store credit card details
              on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Third-Party Sharing</h2>
            <p className="leading-relaxed">
              We do not sell or rent your personal information to third parties. We share
              your data only with service providers necessary to fulfill your orders, such as
              payment processors and shipping carriers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Your Rights</h2>
            <p className="leading-relaxed">
              You have the right to access, correct, or delete your personal data. To exercise
              these rights, contact us at hello@autoprestige.in.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
