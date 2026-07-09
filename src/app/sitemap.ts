import { MetadataRoute } from "next";

const BASE = "https://docs.personaliai.com";

const pages = [
  { url: "/introduction",                        priority: 1.0 },
  { url: "/quickstart",                          priority: 0.9 },
  { url: "/authentication",                      priority: 0.8 },
  { url: "/rate-limits",                         priority: 0.7 },
  { url: "/errors",                              priority: 0.7 },
  { url: "/api-reference/chat/send-message",     priority: 0.9 },
  { url: "/api-reference/bot/get-details",       priority: 0.8 },
  { url: "/api-reference/leads/list",            priority: 0.8 },
  { url: "/api-reference/conversations/list",    priority: 0.8 },
  { url: "/api-reference/conversations/get",     priority: 0.8 },
  { url: "/api-reference/conversations/delete",  priority: 0.7 },
  { url: "/api-reference/knowledge/list",        priority: 0.8 },
  { url: "/api-reference/knowledge/add",         priority: 0.8 },
  { url: "/api-reference/knowledge/delete",      priority: 0.7 },
  { url: "/api-reference/analytics/summary",     priority: 0.8 },
  { url: "/api-reference/usage/stats",           priority: 0.7 },
  { url: "/guides/embed-widget",                 priority: 0.9 },
  { url: "/guides/mobile-sdks",                  priority: 0.8 },
  { url: "/guides/webhooks",                     priority: 0.8 },
  { url: "/guides/byok",                         priority: 0.7 },
  { url: "/guides/languages",                    priority: 0.7 },
  { url: "/security",                            priority: 0.7 },
  { url: "/changelog",                           priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ url, priority }) => ({
    url: BASE + url,
    lastModified: new Date(),
    changeFrequency: url === "/changelog" ? "weekly" : "monthly",
    priority,
  }));
}
