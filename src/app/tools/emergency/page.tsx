import type { Metadata } from "next";
import { EmergencyAssistantForm } from "@/components/emergency-assistant-form";

export const metadata: Metadata = {
  title: "Emergency Assistant",
  description:
    "What to do — and what to say — for common travel problems in Japan: a lost passport, a missed train, needing a pharmacy or hospital, and more. Free, no signup.",
  alternates: { canonical: "/tools/emergency" },
};

export default function EmergencyAssistantPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <p className="jp text-sm font-semibold text-accent">緊急・困りごとサポート</p>
      <h1 className="disp mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Emergency Assistant
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Pick what&apos;s going wrong. You&apos;ll get plain steps and a Japanese phrase card you
        can show or say to staff, police, or station employees.
      </p>
      <div className="mt-10">
        <EmergencyAssistantForm />
      </div>
    </div>
  );
}
