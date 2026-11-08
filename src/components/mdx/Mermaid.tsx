"use client";

import { useEffect, useId, useState } from "react";

type MermaidProps = {
  chart: string;
};

export function Mermaid({ chart }: MermaidProps) {
  const rawId = useId();
  const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: {
            primaryColor: "#eff6ff",
            primaryBorderColor: "#2563eb",
            primaryTextColor: "#172554",
            lineColor: "#64748b",
            secondaryColor: "#ecfdf5",
            tertiaryColor: "#fff7ed",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          },
        });

        const result = await mermaid.render(id, chart);
        if (!cancelled) setSvg(result.svg);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    void renderChart();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <pre className="my-6 overflow-x-auto rounded-xl border border-[--border] bg-[--surface-muted] p-4 text-sm">
        <code>{chart}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div
        className="my-6 sm:my-8 w-full max-w-full overflow-x-auto rounded-2xl border border-[--border] bg-[--surface] p-3 sm:p-4 shadow-sm"
        aria-label="Architecture diagram"
      >
        <div className="h-24 animate-pulse rounded-xl bg-[--surface-muted]" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className="my-6 sm:my-8 w-full max-w-full overflow-x-auto rounded-2xl border border-[--border] bg-[--surface] p-3 sm:p-4 shadow-sm"
      aria-label="Architecture diagram"
      tabIndex={0}
    >
      <div
        className="min-w-[600px] sm:min-w-[900px] md:min-w-[1100px] [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-none"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
