import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";

export const metadata: Metadata = {
  title: "Shipping Policy | AutoPrestige",
  description: "Learn about our shipping options, delivery times, and policies.",
};

export default function ShippingPage() {
  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom max-w-3xl">
        <Breadcrumb items={[{ label: "Shipping Policy" }]} />

        <h1 className="text-3xl md:text-4xl font-semibold text-[#111111] mb-8">
          Shipping Policy
        </h1>

        <div className="prose prose-lg max-w-none text-[#666666] space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Free Shipping</h2>
            <p className="leading-relaxed">
              We offer free standard shipping on all orders above ₹999. For orders below ₹999,
              a flat shipping fee of ₹199 applies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Delivery Options</h2>
            <div className="space-y-3 not-prose">
              <div className="p-4 rounded-xl border border-[#ECECEC]">
                <p className="font-semibold text-[#111111]">Standard Delivery</p>
                <p className="text-sm text-[#666666]">5-7 business days | Free on orders above ₹999</p>
              </div>
              <div className="p-4 rounded-xl border border-[#ECECEC]">
                <p className="font-semibold text-[#111111]">Express Delivery</p>
                <p className="text-sm text-[#666666]">2-3 business days | ₹299</p>
              </div>
              <div className="p-4 rounded-xl border border-[#ECECEC]">
                <p className="font-semibold text-[#111111]">Priority Delivery</p>
                <p className="text-sm text-[#666666]">Next business day | ₹499</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Coverage</h2>
            <p className="leading-relaxed">
              We deliver across India including all major cities and towns. Remote areas may
              require additional delivery time. We currently do not ship internationally.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Order Tracking</h2>
            <p className="leading-relaxed">
              Once your order is shipped, you will receive a tracking link via email and SMS.
              You can also track your order from the Track Order page on our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
