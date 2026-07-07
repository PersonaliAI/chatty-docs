import clsx from "clsx";

const METHOD_COLORS: Record<string, string> = {
  GET:    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  POST:   "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  PUT:    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  PATCH:  "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border-orange-200 dark:border-orange-800",
  DELETE: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200 dark:border-rose-800",
};

export function ApiEndpointBadge({ method, path }: { method: string; path: string }) {
  return (
    <div className="flex items-center gap-2 my-5 not-prose font-mono text-sm">
      <span className={clsx("px-2.5 py-1 rounded-md border font-bold text-xs", METHOD_COLORS[method.toUpperCase()] || "bg-[--bg-muted] text-[--text-muted] border-[--border]")}>
        {method.toUpperCase()}
      </span>
      <code className="text-[--text] bg-[--bg-muted] border border-[--border] rounded-md px-3 py-1 text-sm">
        {path}
      </code>
    </div>
  );
}
