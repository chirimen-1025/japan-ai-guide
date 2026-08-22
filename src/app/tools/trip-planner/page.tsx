import type { Metadata } from "next";
import { TripPlannerForm } from "@/components/trip-planner-form";

export const metadata: Metadata = {
  title: "Japan Trip Planner — Free Itinerary Generator",
  description:
    "Enter your trip length, regions, and interests to get a free, realistic day-by-day Japan itinerary. No signup required.",
  alternates: { canonical: "/tools/trip-planner" },
};

export default function TripPlannerPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <p className="jp text-sm font-semibold text-accent">旅程プランナー</p>
      <h1 className="disp mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Japan Trip Planner</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Set your trip length, the regions you want to visit, and what you actually care about —
        get a day-by-day starting point in seconds.
      </p>
      <div className="mt-10">
        <TripPlannerForm />
      </div>
    </div>
  );
}
