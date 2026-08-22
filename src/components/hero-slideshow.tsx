"use client";

import { useEffect, useRef, useState } from "react";

type Slide = {
  src: string;
  alt: string;
};

const SLIDE_DURATION_MS = 6000;

export function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // A visitor who asked their OS for less motion still gets to see every
    // photo — the slideshow just stops crossfading and jumps between them,
    // and it stops advancing automatically at all.
    if (reducedMotionRef.current) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_DURATION_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-brand-strong">
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out motion-reduce:transition-none ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* Gradient scrim: keeps the headline and buttons readable over any photo,
          in both light and dark viewer themes, without dimming the images too
          much for their own sake. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(15,20,26,0.82) 0%, rgba(15,20,26,0.55) 38%, rgba(15,20,26,0.18) 62%, rgba(15,20,26,0.35) 100%), linear-gradient(0deg, rgba(15,20,26,0.45) 0%, rgba(15,20,26,0) 35%)",
        }}
      />
      <div className="absolute bottom-4 right-5 flex gap-1.5">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show photo ${i + 1} of ${slides.length}: ${slide.alt}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
