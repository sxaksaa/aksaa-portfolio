import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://aksa.work",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
