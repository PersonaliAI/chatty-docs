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
      { title: "Architecture",   href: "/architecture" },
      { title: "Authentication", href: "/authentication" },
      { title: "Rate Limits",    href: "/rate-limits" },
      { title: "Errors",         href: "/errors" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Send Message",         href: "/api-reference/chat/send-message" },
      { title: "Streaming SSE",        href: "/api-reference/chat/stream-message" },
      { title: "Multimodal Upload",    href: "/api-reference/chat/media-upload" },
      { title: "Voice Transcription",  href: "/api-reference/chat/voice-transcribe" },
      { title: "Get Bot Details",      href: "/api-reference/bot/get-details" },
      { title: "Manage Bots",          href: "/api-reference/bots/manage" },
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
    title: "Channels & Integrations",
    items: [
      { title: "Embed Widget",         href: "/guides/embed-widget" },
      { title: "React & Next.js",      href: "/guides/react-sdk" },
      { title: "WordPress Plugin",     href: "/guides/wordpress" },
      { title: "WhatsApp Channel",     href: "/guides/whatsapp" },
      { title: "Slack Slash Command",  href: "/guides/slack" },
      { title: "MCP Server",           href: "/guides/mcp" },
    ],
  },
  {
    title: "Features & Automation",
    items: [
      { title: "Create a Chat Widget", href: "/guides/create-widget" },
      { title: "Calendar & Scheduling",href: "/guides/calendar-scheduling" },
      { title: "Live Inbox & Takeover",href: "/guides/human-takeover" },
      { title: "Cloud Drive & RAG",    href: "/guides/knowledge-base-rag" },
      { title: "Webhooks",             href: "/guides/webhooks" },
      { title: "BYOK",                 href: "/guides/byok" },
      { title: "Languages",            href: "/guides/languages" },
      { title: "Google Auth Setup",    href: "/guides/google-auth-setup" },
      { title: "Mobile SDKs",          href: "/guides/mobile-sdks" },
      { title: "Self-Hosting & Deploy",href: "/guides/self-hosting" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Security & Privacy",   href: "/security" },
      { title: "Changelog",            href: "/changelog" },
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
