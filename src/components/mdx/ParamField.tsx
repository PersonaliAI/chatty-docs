"use client";
import { useState } from "react";
import clsx from "clsx";

interface ParamFieldProps {
  body?: string;
  query?: string;
  path?: string;
  header?: string;
  type?: string;
  required?: boolean;
  default?: string;
  children?: React.ReactNode;
}

export function ParamField({ body, query, path, header, type, required, default: def, children }: ParamFieldProps) {
  const name = body || query || path || header || "";
  const location = body ? "body" : query ? "query" : path ? "path" : "header";

  return (
    <div className="border border-[--border] rounded-lg p-4 my-3 not-prose">
      <div className="flex items-start gap-3 flex-wrap">
        <code className="text-sm font-mono font-semibold text-[--text]">{name}</code>
        {type && <span className="text-xs text-brand-500 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-md px-2 py-0.5 font-mono">{type}</span>}
        <span className="text-xs text-[--text-subtle] bg-[--bg-muted] rounded px-1.5 py-0.5">{location}</span>
        {required && <span className="text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded px-1.5 py-0.5">required</span>}
        {def !== undefined && <span className="text-xs text-[--text-subtle]">default: <code className="text-[--text-muted]">{def}</code></span>}
      </div>
      {children && <div className="mt-2 text-sm text-[--text-muted] leading-relaxed [&>p]:m-0">{children}</div>}
    </div>
  );
}

interface ResponseFieldProps {
  name: string;
  type?: string;
  children?: React.ReactNode;
}

export function ResponseField({ name, type, children }: ResponseFieldProps) {
  return (
    <div className="border-l-2 border-[--border] pl-4 my-2.5 not-prose">
      <div className="flex items-center gap-2">
        <code className="text-sm font-mono text-[--text]">{name}</code>
        {type && <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded px-1.5 py-0.5 font-mono">{type}</span>}
      </div>
      {children && <div className="mt-1 text-sm text-[--text-muted] leading-relaxed [&>p]:m-0">{children}</div>}
    </div>
  );
}
