export function Frame({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <figure className="my-6 not-prose">
      <div className="rounded-xl border border-[--border] overflow-hidden bg-[--bg-subtle]">
        {children}
      </div>
      {caption && <figcaption className="text-center text-xs text-[--text-subtle] mt-2">{caption}</figcaption>}
    </figure>
  );
}
