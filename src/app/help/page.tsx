import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help Center | AutoPrestige",
  description: "Get help with orders, returns, and product questions.",
};

export default function HelpPage() {
  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom max-w-3xl">
        <Breadcrumb items={[{ label: "Help Center" }]} />

        <h1 className="text-3xl md:text-4xl font-semibold text-[#111111] mb-4">
          Help Center
        </h1>
        <p className="text-[#666666] mb-10">
          How can we help you today?
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: "Track Your Order", desc: "Check the status of your delivery", href: "/track-order" },
            { title: "Shipping Info", desc: "Delivery times and options", href: "/shipping" },
            { title: "Returns & Exchanges", desc: "Return or exchange a product", href: "/returns" },
            { title: "FAQs", desc: "Frequently asked questions", href: "/faq" },
            { title: "Warranty", desc: "Product warranty information", href: "/warranty" },
            { title: "Contact Us", desc: "Talk to our support team", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="p-5 rounded-2xl border border-[#ECECEC] hover:shadow-md hover:border-[#E53935]/30 transition-all group"
            >
              <h3 className="font-semibold text-[#111111] group-hover:text-[#E53935] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#666666] mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
