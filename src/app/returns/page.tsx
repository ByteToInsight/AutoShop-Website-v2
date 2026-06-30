import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";

export const metadata: Metadata = {
  title: "Returns & Exchanges | AutoPrestige",
  description: "Learn about our return and exchange policies.",
};

export default function ReturnsPage() {
  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom max-w-3xl">
        <Breadcrumb items={[{ label: "Returns & Exchanges" }]} />

        <h1 className="text-3xl md:text-4xl font-semibold text-[#111111] mb-8">
          Returns & Exchanges
        </h1>

        <div className="prose prose-lg max-w-none text-[#666666] space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">7-Day Return Policy</h2>
            <p className="leading-relaxed">
              We offer a 7-day return policy on all unused items in their original packaging.
              To initiate a return, go to your order history and select the item you wish to return.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Eligibility</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Item must be unused and in original packaging</li>
              <li>All tags and labels must be intact</li>
              <li>Item must be in the same condition as received</li>
              <li>Return request must be made within 7 days of delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Exchange Policy</h2>
            <p className="leading-relaxed">
              If you received a wrong or damaged item, we offer free exchanges within 14 days
              of delivery. Contact our support team with your order ID and we will arrange
              a pickup and replacement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Refund Process</h2>
            <p className="leading-relaxed">
              Once we receive and inspect the returned item, your refund will be processed
              within 5-7 business days. The refund will be credited to your original payment
              method.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Non-Returnable Items</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Customized or personalized products</li>
              <li>Items that have been installed or used</li>
              <li>Products without original packaging</li>
              <li>Gift cards</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
