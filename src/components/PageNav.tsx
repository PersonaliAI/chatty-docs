import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { NavItem } from "@/lib/navigation";

export function PageNav({ prev, next }: { prev: NavItem | null; next: NavItem | null }) {
  if (!prev && !next) return null;
  return (
    <div className="flex items-center justify-between mt-16 pt-8 border-t border-[--border] not-prose">
      {prev ? (
        <Link href={prev.href} className="group flex items-center gap-3 text-sm text-[--text-muted] hover:text-[--text] transition-colors no-underline">
          <span className="p-2 rounded-lg border border-[--border] group-hover:border-brand-500/50 group-hover:bg-brand-50 dark:group-hover:bg-brand-950/30 transition-colors">
            <ArrowLeft size={14} />
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[--text-subtle] mb-0.5">Previous</p>
            <p className="font-medium">{prev.title}</p>
          </div>
        </Link>
      ) : <div />}
      {next ? (
        <Link href={next.href} className="group flex items-center gap-3 text-sm text-[--text-muted] hover:text-[--text] transition-colors no-underline text-right">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[--text-subtle] mb-0.5">Next</p>
            <p className="font-medium">{next.title}</p>
          </div>
          <span className="p-2 rounded-lg border border-[--border] group-hover:border-brand-500/50 group-hover:bg-brand-50 dark:group-hover:bg-brand-950/30 transition-colors">
            <ArrowRight size={14} />
          </span>
        </Link>
      ) : <div />}
    </div>
  );
}
