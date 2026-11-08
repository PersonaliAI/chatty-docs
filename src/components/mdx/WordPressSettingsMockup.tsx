"use client";

import React, { useState } from "react";
import { Check, Copy, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

export function WordPressSettingsMockup() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText("1fa85f64-5717-4562-b3fc-2c963f66afa6");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="not-prose my-8 overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xl shadow-neutral-950/5 dark:shadow-black/40 transition-all">
      {/* Window Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap border-b border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/90 dark:bg-neutral-900/90 px-3.5 sm:px-4 py-3 select-none backdrop-blur-md">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="flex gap-1.5 shrink-0">
            <span className="h-3 w-3 rounded-full bg-red-400/80 border border-red-500/20" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80 border border-amber-500/20" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80 border border-emerald-500/20" />
          </div>
          <span className="ml-1 sm:ml-2 text-xs font-medium text-neutral-400 dark:text-neutral-500 font-mono truncate">
            wp-admin / options-general.php?page=personaliai-chatbot
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Connected &bull; v1.0.4
          </span>
        </div>
      </div>

      {/* Main Settings Body */}
      <div className="p-4 sm:p-6 md:p-8 space-y-6">
        {/* Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/20 shadow-xs">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                PersonaliAI Customer Support Chatbot Settings
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Configure your WordPress widget embed credentials, routing behavior, and user data pass-through.
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto inline-flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Verified WordPress Plugin
          </span>
        </div>

        {/* Fields Grid */}
        <div className="space-y-5 text-sm">
          {/* Bot ID Field */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-start">
            <div className="space-y-1">
              <label className="font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                Bot ID
                <span className="rounded bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 text-[10px] font-semibold px-1.5 py-0.5 border border-orange-200 dark:border-orange-800/50">
                  Required
                </span>
              </label>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Your chatbot unique UUID from the Chatty console.
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  readOnly
                  value="1fa85f64-5717-4562-b3fc-2c963f66afa6"
                  className="w-full font-mono text-xs md:text-sm bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3.5 py-2.5 pr-20 shadow-inner focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute right-2 flex items-center gap-1 rounded-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition"
                  title="Copy Bot ID"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-neutral-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1.5">
                Found in <span className="font-semibold text-neutral-700 dark:text-neutral-300">Chatty Dashboard &rarr; Settings &rarr; General</span>.
              </p>
            </div>
          </div>

          {/* API Host Field */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-start pt-3 border-t border-neutral-100 dark:border-neutral-900">
            <div className="space-y-1">
              <label className="font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                API Host
                <span className="rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 text-[10px] font-medium px-1.5 py-0.5 border border-neutral-200 dark:border-neutral-800">
                  Default
                </span>
              </label>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                The secure API backend endpoint.
              </p>
            </div>
            <div className="md:col-span-2">
              <input
                type="text"
                readOnly
                value="https://api.chatty.personaliai.com"
                className="w-full font-mono text-xs md:text-sm bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3.5 py-2.5 shadow-inner focus:outline-hidden"
              />
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1.5">
                Leave unchanged unless you are using a self-hosted or on-premise Chatty instance.
              </p>
            </div>
          </div>

          {/* Enable Floating Chat Toggle */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center pt-3 border-t border-neutral-100 dark:border-neutral-900">
            <div className="space-y-1">
              <label className="font-medium text-neutral-800 dark:text-neutral-200">
                Floating Chat Widget
              </label>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Show the interactive launcher bubble.
              </p>
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-emerald-500 transition-colors duration-200 ease-in-out">
                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Enabled (Floating launcher displayed on storefront)
              </span>
            </div>
          </div>

          {/* Auto Open Delay */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-start pt-3 border-t border-neutral-100 dark:border-neutral-900">
            <div className="space-y-1">
              <label className="font-medium text-neutral-800 dark:text-neutral-200">
                Auto-Open Delay
              </label>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Seconds before the chat window opens.
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 max-w-[140px]">
                <input
                  type="number"
                  readOnly
                  value="5"
                  className="w-20 font-mono text-center text-sm bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-lg border border-neutral-200 dark:border-neutral-800 py-2 shadow-inner focus:outline-hidden"
                />
                <span className="text-xs text-neutral-500 font-medium">seconds</span>
              </div>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1.5">
                Set to <code className="text-neutral-600 dark:text-neutral-300">0</code> to keep the widget minimized until clicked by the visitor.
              </p>
            </div>
          </div>

          {/* Exclude Paths */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-start pt-3 border-t border-neutral-100 dark:border-neutral-900">
            <div className="space-y-1">
              <label className="font-medium text-neutral-800 dark:text-neutral-200">
                Excluded Paths
              </label>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Wildcard paths where chat is suppressed.
              </p>
            </div>
            <div className="md:col-span-2 space-y-2">
              <div className="flex flex-wrap gap-2 p-2.5 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-200/80 dark:bg-neutral-800 px-2.5 py-1 text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300">
                  /checkout/*
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-200/80 dark:bg-neutral-800 px-2.5 py-1 text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300">
                  /cart/*
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-200/80 dark:bg-neutral-800 px-2.5 py-1 text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300">
                  /wp-admin/*
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                Prevents distraction during checkout transactions and keeps admin portals clean.
              </p>
            </div>
          </div>

          {/* Sync Logged-In User */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center pt-3 border-t border-neutral-100 dark:border-neutral-900">
            <div className="space-y-1">
              <label className="font-medium text-neutral-800 dark:text-neutral-200">
                User Synchronization
              </label>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Authenticate logged-in WP users.
              </p>
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-orange-500 bg-orange-500 text-white shadow-xs">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </div>
              <div>
                <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                  Pass logged-in WordPress user display name & email automatically
                </span>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                  Pre-fills lead capture attributes and connects chat logs to known customer accounts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-neutral-200 dark:border-neutral-800">
          <button
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#2271b1] hover:bg-[#135e96] text-white font-medium text-xs md:text-sm px-5 py-2.5 shadow-sm transition-colors cursor-pointer"
          >
            Save Changes
          </button>
          <span className="text-xs text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Changes take effect immediately on your WordPress site
          </span>
        </div>
      </div>
    </div>
  );
}
