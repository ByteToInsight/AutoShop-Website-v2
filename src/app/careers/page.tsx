import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";

export const metadata: Metadata = {
  title: "Careers | AutoPrestige",
  description: "Join the AutoPrestige team. Explore career opportunities.",
};

export default function CareersPage() {
  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom max-w-3xl">
        <Breadcrumb items={[{ label: "Careers" }]} />

        <h1 className="text-3xl md:text-4xl font-semibold text-[#111111] mb-4">
          Careers at AutoPrestige
        </h1>
        <p className="text-[#666666] mb-10">
          Join our growing team and help us revolutionize the car accessories market in India.
        </p>

        <div className="space-y-4">
          {[
            { role: "Frontend Developer", dept: "Engineering", location: "Noida, UP" },
            { role: "Product Manager", dept: "Product", location: "Noida, UP" },
            { role: "Customer Support Lead", dept: "Operations", location: "Remote" },
            { role: "Digital Marketing Specialist", dept: "Marketing", location: "Noida, UP" },
          ].map((job) => (
            <div
              key={job.role}
              className="p-5 rounded-2xl border border-[#ECECEC] hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-[#111111]">{job.role}</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-[#666666]">
                <span>{job.dept}</span>
                <span>{job.location}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-[#666666] mt-8">
          Don&apos;t see a role that fits? Send your resume to{" "}
          <a href="mailto:careers@autoprestige.in" className="text-[#E53935] hover:underline">
            careers@autoprestige.in
          </a>
        </p>
      </div>
    </div>
  );
}
