import type { Metadata } from "next";
import { MenuHelperForm } from "@/components/menu-helper-form";

export const metadata: Metadata = {
  title: "Menu Helper",
  description:
    "Decode Japanese menus — izakaya food, rice bowls, drinks, and common menu vocabulary like teishoku and nomihoudai — with ingredients and useful phrases. Free, no signup.",
  alternates: { canonical: "/tools/menu" },
};

export default function MenuHelperPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <p className="jp text-sm font-semibold text-accent">メニュー解読サポート</p>
      <h1 className="disp mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Menu Helper</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Search or browse to figure out what a menu item actually is — ingredients, what it means,
        and a phrase to ask about it if you need to.
      </p>
      <div className="mt-10">
        <MenuHelperForm />
      </div>
    </div>
  );
}
