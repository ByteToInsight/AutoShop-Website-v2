import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm text-[#666666]">
        <li>
          <Link href="/" className="hover:text-[#111111] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-[#111111] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#111111] font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
