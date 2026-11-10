import Link from "next/link";
import clsx from "clsx";
import { DocIcon, resolveIcon } from "./IconResolver";

interface CardProps {
  title: string;
  icon?: string;
  color?: string;
  href?: string;
  children?: React.ReactNode;
}

export function Card({ title, icon, color = "#f97316", href, children }: CardProps) {
  const hasIconComponent = icon ? Boolean(resolveIcon(icon)) : false;

  const inner = (
    <div className={clsx(
      "group p-4 sm:p-5 rounded-xl border border-[--border] bg-[--bg-subtle] transition-all duration-150 h-full flex flex-col",
      href && "hover:border-brand-500/50 hover:shadow-sm cursor-pointer"
    )}>
      {icon && (
        <div className="mb-3.5 flex items-center">
          {hasIconComponent ? (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-500/10 text-brand-600 dark:text-brand-400 group-hover:scale-105 transition-transform">
              <DocIcon name={icon} className="w-4 h-4" />
            </div>
          ) : (
            <span className="text-xl block">{icon}</span>
          )}
        </div>
      )}
      <h3 className="font-semibold text-sm text-[--text] mb-1 group-hover:text-brand-500 transition-colors">{title}</h3>
      {children && <div className="text-xs text-[--text-muted] leading-relaxed [&_p]:m-0 mt-0.5">{children}</div>}
    </div>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) return <a href={href} target="_blank" rel="noreferrer" className="no-underline block h-full">{inner}</a>;
    return <Link href={href} className="no-underline block h-full">{inner}</Link>;
  }
  return inner;
}

export function CardGroup({ cols = 2, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <div className={clsx(
      "grid gap-4 my-6 not-prose",
      cols === 1 && "grid-cols-1",
      cols === 2 && "grid-cols-1 sm:grid-cols-2",
      cols === 3 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
      cols === 4 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
    )}>
      {children}
    </div>
  );
}
