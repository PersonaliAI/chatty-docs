import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { NavItem } from "@/lib/navigation";

export function PageNav({ prev, next }: { prev: NavItem | null; next: NavItem | null }) {
  if (!prev && !next) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[--border] not-prose">
      {prev ? (
        <Link href={prev.href} className="group flex items-center gap-3 min-w-0 text-sm text-[--text-muted] hover:text-[--text] transition-colors no-underline">
          <span className="p-2 shrink-0 rounded-lg border border-[--border] group-hover:border-brand-500/50 group-hover:bg-brand-50 dark:group-hover:bg-brand-950/30 transition-colors">
            <ArrowLeft size={14} />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-[--text-subtle] mb-0.5">Previous</p>
            <p className="font-medium break-words">{prev.title}</p>
          </div>
        </Link>
      ) : <div className="hidden sm:block" />}
      {next ? (
        <Link href={next.href} className="group flex items-center justify-end gap-3 self-end sm:self-auto ml-auto min-w-0 text-sm text-[--text-muted] hover:text-[--text] transition-colors no-underline text-right">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-[--text-subtle] mb-0.5">Next</p>
            <p className="font-medium break-words">{next.title}</p>
          </div>
          <span className="p-2 shrink-0 rounded-lg border border-[--border] group-hover:border-brand-500/50 group-hover:bg-brand-50 dark:group-hover:bg-brand-950/30 transition-colors">
            <ArrowRight size={14} />
          </span>
        </Link>
      ) : <div className="hidden sm:block" />}
    </div>
  );
}
