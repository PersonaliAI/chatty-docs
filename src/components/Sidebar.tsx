"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";
import clsx from "clsx";

export function Sidebar({ mobile, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={clsx(
      "flex flex-col h-full overflow-y-auto py-7",
      mobile ? "px-4" : "px-6"
    )}>
      {navigation.map((group) => (
        <div key={group.title} className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[--text-subtle] mb-3 px-3">
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
                      "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] transition-colors",
                      active
                        ? "bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium"
                        : "text-[--text-muted] hover:bg-[--bg-muted] hover:text-[--text]"
                    )}
                  >
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
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
      <div className="mt-auto pt-5 border-t border-[--border] space-y-0.5">
        <a href="https://chatty.personaliai.com" target="_blank" rel="noreferrer"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] text-[--text-muted] hover:bg-[--bg-muted] hover:text-[--text] transition-colors">
          <span className="text-xs">&#8599;</span> chatty.personaliai.com
        </a>
        <a href="https://api.personaliai.com/docs" target="_blank" rel="noreferrer"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] text-[--text-muted] hover:bg-[--bg-muted] hover:text-[--text] transition-colors">
          <span className="text-xs">&#8599;</span> Swagger UI
        </a>
      </div>
    </aside>
  );
}
