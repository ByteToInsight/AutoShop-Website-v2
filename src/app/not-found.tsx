import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-custom">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-6xl font-bold text-[#E53935] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-[#111111] mb-2">Page Not Found</h2>
          <p className="text-[#666666] mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/">
            <Button className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full px-8">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
