import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";

export const metadata: Metadata = {
  title: "Store Locator | AutoPrestige",
  description: "Find AutoPrestige stores near you.",
};

export default function StoresPage() {
  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom max-w-3xl">
        <Breadcrumb items={[{ label: "Store Locator" }]} />

        <h1 className="text-3xl md:text-4xl font-semibold text-[#111111] mb-4">
          Store Locator
        </h1>
        <p className="text-[#666666] mb-10">
          Visit our stores to experience our products in person
        </p>

        <div className="space-y-4">
          {[
            { name: "AutoPrestige Flagship Store", address: "B-123, Sector 18, Noida, UP 201301", phone: "+91 120-456-7890" },
            { name: "AutoPrestige Delhi Store", address: "45, Lajpat Nagar Market, New Delhi 110024", phone: "+91 11-2345-6789" },
            { name: "AutoPrestige Mumbai Store", address: "12, Andheri Link Road, Mumbai 400053", phone: "+91 22-3456-7890" },
          ].map((store) => (
            <div
              key={store.name}
              className="p-5 rounded-2xl border border-[#ECECEC]"
            >
              <h3 className="font-semibold text-[#111111]">{store.name}</h3>
              <p className="text-sm text-[#666666] mt-1">{store.address}</p>
              <p className="text-sm text-[#666666] mt-1">{store.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
