import Link from "next/link";
import clsx from "clsx";

interface CardProps {
  title: string;
  icon?: string;
  color?: string;
  href?: string;
  children?: React.ReactNode;
}

export function Card({ title, icon, color = "#f97316", href, children }: CardProps) {
  const inner = (
    <div className={clsx(
      "group p-5 rounded-xl border border-[--border] bg-[--bg-subtle] transition-all duration-150",
      href && "hover:border-brand-500/50 hover:shadow-sm cursor-pointer"
    )}>
      {icon && (
        <span className="text-xl mb-3 block">{icon}</span>
      )}
      <h3 className="font-semibold text-sm text-[--text] mb-1 group-hover:text-brand-500 transition-colors">{title}</h3>
      {children && <div className="text-xs text-[--text-muted] leading-relaxed [&_p]:m-0">{children}</div>}
    </div>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) return <a href={href} target="_blank" rel="noreferrer" className="no-underline block">{inner}</a>;
    return <Link href={href} className="no-underline block">{inner}</Link>;
  }
  return inner;
}

export function CardGroup({ cols = 2, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <div className={clsx(
      "grid gap-4 my-6 not-prose",
      cols === 1 && "grid-cols-1",
      cols === 2 && "grid-cols-1 sm:grid-cols-2",
      cols === 3 && "grid-cols-1 sm:grid-cols-3",
      cols === 4 && "grid-cols-2 sm:grid-cols-4",
    )}>
      {children}
    </div>
  );
}
