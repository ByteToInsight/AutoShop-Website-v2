import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";

export const metadata: Metadata = {
  title: "Warranty Policy | AutoPrestige",
  description: "Learn about product warranty coverage and claims.",
};

export default function WarrantyPage() {
  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom max-w-3xl">
        <Breadcrumb items={[{ label: "Warranty Policy" }]} />

        <h1 className="text-3xl md:text-4xl font-semibold text-[#111111] mb-8">
          Warranty Policy
        </h1>

        <div className="prose prose-lg max-w-none text-[#666666] space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">Manufacturer Warranty</h2>
            <p className="leading-relaxed">
              All products sold on AutoPrestige come with the original manufacturer&apos;s warranty.
              Warranty periods vary by product and brand, ranging from 6 months to 5 years.
              Check the product page for specific warranty information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">What is Covered</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Manufacturing defects in materials and workmanship</li>
              <li>Functional defects under normal use conditions</li>
              <li>Electrical component failures (where applicable)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">What is Not Covered</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Damage caused by improper installation or misuse</li>
              <li>Normal wear and tear</li>
              <li>Damage from accidents, modifications, or unauthorised repairs</li>
              <li>Cosmetic damage that does not affect functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#111111] mb-3">How to Claim Warranty</h2>
            <p className="leading-relaxed">
              To file a warranty claim, contact our support team with your order ID, product
              details, and a description of the issue. We will guide you through the claim
              process and arrange for repair or replacement as applicable.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
