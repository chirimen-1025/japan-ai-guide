import type { Metadata } from "next";
import { RestaurantHelperForm } from "@/components/restaurant-helper-form";

export const metadata: Metadata = {
  title: "Restaurant Japanese Helper",
  description:
    "Figure out what to order at a Japanese restaurant, and get phrase cards for allergies, vegetarian, vegan, halal, and other dietary needs — free, no signup.",
  alternates: { canonical: "/tools/restaurant-helper" },
};

export default function RestaurantHelperPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <p className="jp text-sm font-semibold text-accent">飲食店サポート</p>
      <h1 className="disp mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Restaurant Japanese Helper
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Two problems in one tool: figuring out what a dish actually is before you order it, and
        telling staff about allergies or dietary needs clearly.
      </p>
      <div className="mt-10">
        <RestaurantHelperForm />
      </div>
    </div>
  );
}
