import type { Metadata } from "next";
import { TransportHelperForm } from "@/components/transport-helper-form";

export const metadata: Metadata = {
  title: "Transport Helper",
  description:
    "Compare ways to get between popular Japan destinations — Shinkansen, flights, buses, and airport transfers — with rough durations and where to check current fares. Free, no signup.",
  alternates: { canonical: "/tools/transport" },
};

export default function TransportHelperPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <p className="jp text-sm font-semibold text-accent">移動手段サポート</p>
      <h1 className="disp mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Transport Helper
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Pick where you&apos;re starting and where you&apos;re headed. You&apos;ll get the common
        ways to make that trip, rough travel times, and where to check current fares.
      </p>
      <div className="mt-10">
        <TransportHelperForm />
      </div>
    </div>
  );
}
