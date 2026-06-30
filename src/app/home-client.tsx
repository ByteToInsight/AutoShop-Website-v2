"use client";

import { HeroV2 } from "@/components/sections/hero-v2";
import { BrandWheel } from "@/components/sections/brand-wheel";
import { CategoriesV2 } from "@/components/sections/categories-v2";
import { ProductCardV2 } from "@/components/product/product-card-v2";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { PopularBrands } from "@/components/sections/popular-brands";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { BlogSection } from "@/components/sections/blog-section";
import { FAQSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";
import { NewsletterSection } from "@/components/sections/newsletter";
import { useEffect } from "react";
import { useDataStore } from "@/store/data-store";

export function HomePageClient() {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  useEffect(() => { if (!initialized) initialize(); }, [initialized, initialize]);
  const products = useDataStore((s) => s.products);
  const trendingProducts = products.filter((p) => p.rating >= 4.6).slice(0, 8);
  const bestSellers = products.filter((p) => p.reviewCount >= 150).slice(0, 8);

  return (
    <>
      <HeroV2 />

      <BrandWheel />

      <CategoriesV2 />

      <SectionWrapper className="bg-[#F8F8F8]">
        <div className="container-custom">
          <SectionHeader
            title="Trending Now"
            subtitle="Most popular accessories our customers love"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {trendingProducts.map((product, i) => (
              <ProductCardV2 key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      <PopularBrands />

      <SectionWrapper>
        <div className="container-custom">
          <SectionHeader
            title="Best Sellers"
            subtitle="Top-rated accessories trusted by thousands of car owners"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product, i) => (
              <ProductCardV2 key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      <WhyChooseUs />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <ContactSection />
      <NewsletterSection />
    </>
  );
}
