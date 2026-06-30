export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "AutoPrestige",
        url: "https://autoprestige.in",
        logo: "https://autoprestige.in/logo.png",
        description: "India's premier destination for premium car accessories.",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-1800-123-4567",
          contactType: "customer service",
          availableLanguage: ["English", "Hindi"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "B-123, Sector 18",
          addressLocality: "Noida",
          addressRegion: "Uttar Pradesh",
          postalCode: "201301",
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        name: "AutoPrestige",
        url: "https://autoprestige.in",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://autoprestige.in/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "BreadcrumbList",
        name: "Breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://autoprestige.in" },
          { "@type": "ListItem", position: 2, name: "Categories", item: "https://autoprestige.in/categories" },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
