export interface NavItem {
  title: string;
  href: string;
}
export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    title: "Get Started",
    items: [
      { title: "Introduction",   href: "/introduction" },
      { title: "Quickstart",     href: "/quickstart" },
      { title: "Authentication", href: "/authentication" },
      { title: "Rate Limits",    href: "/rate-limits" },
      { title: "Errors",         href: "/errors" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Send a Message",       href: "/api-reference/chat/send-message" },
      { title: "Get Bot Details",      href: "/api-reference/bot/get-details" },
      { title: "List Leads",           href: "/api-reference/leads/list" },
      { title: "List Conversations",   href: "/api-reference/conversations/list" },
      { title: "Get Conversation",     href: "/api-reference/conversations/get" },
      { title: "Clear Session",        href: "/api-reference/conversations/delete" },
      { title: "List Knowledge",       href: "/api-reference/knowledge/list" },
      { title: "Add Knowledge",        href: "/api-reference/knowledge/add" },
      { title: "Delete Knowledge",     href: "/api-reference/knowledge/delete" },
      { title: "Analytics Summary",    href: "/api-reference/analytics/summary" },
      { title: "API Key Usage",        href: "/api-reference/usage/stats" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Embed Widget",   href: "/guides/embed-widget" },
      { title: "Mobile SDKs",   href: "/guides/mobile-sdks" },
      { title: "Webhooks",      href: "/guides/webhooks" },
      { title: "BYOK",          href: "/guides/byok" },
      { title: "Languages",     href: "/guides/languages" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Security & Privacy", href: "/security" },
      { title: "Changelog", href: "/changelog" },
    ],
  },
];

export function flatNav(): NavItem[] {
  return navigation.flatMap((g) => g.items);
}

export function prevNext(href: string): { prev: NavItem | null; next: NavItem | null } {
  const flat = flatNav();
  const idx = flat.findIndex((i) => i.href === href);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}
