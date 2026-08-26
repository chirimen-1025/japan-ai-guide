import type { Metadata } from "next";
import { TripMapView } from "@/components/trip-map-view";

export const metadata: Metadata = {
  title: "Trip Map — Plan Realistic Days Between Your Japan Stops",
  description:
    "Add places from any travel guide article to a running list, see them plotted on a map, and get a rough day-count estimate for visiting them comfortably.",
  alternates: { canonical: "/tools/trip-map" },
};

export default function TripMapPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <p className="jp text-sm font-semibold text-accent">旅行地図</p>
      <h1 className="disp mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Trip Map</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Click &ldquo;Add to Trip Map&rdquo; on any travel guide article to build a list of places you
        want to visit. This page plots them and gives you a rough sense of how many days you&apos;d
        want to see them all without rushing.
      </p>
      <div className="mt-10">
        <TripMapView />
      </div>
    </div>
  );
}
