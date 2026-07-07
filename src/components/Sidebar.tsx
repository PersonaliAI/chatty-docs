"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";
import clsx from "clsx";

export function Sidebar({ mobile, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={clsx(
      "flex flex-col h-full overflow-y-auto py-6",
      mobile ? "px-4" : "px-5"
    )}>
      {navigation.map((group) => (
        <div key={group.title} className="mb-7">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[--text-subtle] mb-2 px-2">
            {group.title}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={clsx(
                      "flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-colors",
                      active
                        ? "bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium"
                        : "text-[--text-muted] hover:bg-[--bg-muted] hover:text-[--text]"
                    )}
                  >
                    {active && (
                      <span className="w-1 h-1 rounded-full bg-brand-500 shrink-0" />
                    )}
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Bottom links */}
      <div className="mt-auto pt-6 border-t border-[--border] space-y-1">
        <a href="https://chatty.ai" target="_blank" rel="noreferrer"
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm text-[--text-muted] hover:bg-[--bg-muted] hover:text-[--text] transition-colors">
          ↗ chatty.ai
        </a>
        <a href="https://personaliai-api-376030619262.us-central1.run.app/docs" target="_blank" rel="noreferrer"
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm text-[--text-muted] hover:bg-[--bg-muted] hover:text-[--text] transition-colors">
          ↗ Swagger UI
        </a>
      </div>
    </aside>
  );
}
