import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Chatty Docs", template: "%s — Chatty Docs" },
  description: "Build powerful AI chat experiences with the Chatty API.",
  icons: { icon: "/logo/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var d=document.documentElement,c=localStorage.getItem('theme');if(c==='dark'||(c===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){d.classList.add('dark')}}catch(e){}})()`,
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
