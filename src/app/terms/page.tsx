import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";

export const metadata: Metadata = {
  title: "Terms of Service | AutoPrestige",
  description: "AutoPrestige terms of service and conditions.",
};

export default function TermsPage() {
  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom max-w-3xl">
        <Breadcrumb items={[{ label: "Terms of Service" }]} />

        <h1 className="text-3xl md:text-4xl font-semibold text-[#111111] mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-lg max-w-none text-[#666666] space-y-6">
          <p className="text-sm text-[#999999]">Last updated: June 1, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing or using AutoPrestige, you agree to be bound by these Terms of
              Service. If you do not agree, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Products and Pricing</h2>
            <p className="leading-relaxed">
              All product descriptions, images, and prices are as accurate as possible. However,
              we reserve the right to modify prices and product availability without prior notice.
              In case of a pricing error, we may cancel the order and issue a full refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Orders</h2>
            <p className="leading-relaxed">
              Placing an order constitutes an offer to purchase. We reserve the right to accept
              or decline any order. An order confirmation email does not constitute acceptance
              — acceptance occurs only upon dispatch of the product.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on this website, including text, images, logos, and designs, is the
              property of AutoPrestige and is protected by intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Limitation of Liability</h2>
            <p className="leading-relaxed">
              AutoPrestige shall not be liable for any indirect, incidental, or consequential
              damages arising from the use of our products or website. Our total liability
              shall not exceed the amount paid for the product in question.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
