import type { Metadata } from "next";
import { BudgetCalculatorForm } from "@/components/budget-calculator-form";

export const metadata: Metadata = {
  title: "Japan Travel Budget Calculator",
  description:
    "Estimate your Japan trip cost across Budget, Standard, and Luxury tiers based on trip length and group size. Free, no signup.",
  alternates: { canonical: "/tools/budget-calculator" },
};

export default function BudgetCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <p className="jp text-sm font-semibold text-accent">予算計算</p>
      <h1 className="disp mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Japan Budget Calculator</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Get a realistic cost range for your trip across three travel styles — Budget, Standard,
        and Luxury — based on how long you&apos;re staying and how many people are going.
      </p>
      <div className="mt-10">
        <BudgetCalculatorForm />
      </div>
    </div>
  );
}
