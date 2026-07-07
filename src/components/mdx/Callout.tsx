import { Info as InfoIcon, AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";
import clsx from "clsx";

interface CalloutProps { children: React.ReactNode; title?: string; }

function Callout({ children, title, icon, cls }: CalloutProps & { icon: React.ReactNode; cls: string }) {
  return (
    <div className={clsx("flex gap-3 rounded-lg border px-4 py-3.5 my-5 text-sm", cls)}>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <div className="[&>p]:m-0 [&>p]:leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export const Note = ({ children, title }: CalloutProps) => (
  <Callout title={title} icon={<InfoIcon size={16} className="text-blue-500" />}
    cls="bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-200">
    {children}
  </Callout>
);

export const Warning = ({ children, title }: CalloutProps) => (
  <Callout title={title} icon={<AlertTriangle size={16} className="text-amber-500" />}
    cls="bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200">
    {children}
  </Callout>
);

export const Tip = ({ children, title }: CalloutProps) => (
  <Callout title={title} icon={<Lightbulb size={16} className="text-brand-500" />}
    cls="bg-brand-50 border-brand-200 text-brand-900 dark:bg-brand-950/40 dark:border-brand-800 dark:text-brand-200">
    {children}
  </Callout>
);

export const Info = ({ children, title }: CalloutProps) => (
  <Callout title={title} icon={<CheckCircle size={16} className="text-emerald-500" />}
    cls="bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200">
    {children}
  </Callout>
);
