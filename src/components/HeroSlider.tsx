import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface HeroSlide {
  id: number | string;
  image: string;
  title?: string;
  subtitle?: string;
}

interface Props {
  slides: HeroSlide[];
  intervalMs?: number;
  children?: React.ReactNode;
}

/**
 * Reusable full-width hero image slider.
 * - Auto-advances every `intervalMs` (default 3s)
 * - Smooth fade transition
 * - Prev/Next buttons + pagination indicators
 * - Optional overlay content (CTA buttons etc.) via `children`
 *
 * Slide data is injected via props so an admin can later swap the source
 * (DB / CMS) without changing this component.
 */
export function HeroSlider({ slides, intervalMs = 3000, children }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(t);
  }, [paused, count, intervalMs]);

  if (count === 0) return null;

  return (
    <section
      className="relative -mt-16 h-screen min-h-[560px] w-full overflow-hidden bg-primary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <img src={s.image} alt={s.title ?? ""} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/70" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-primary-foreground">
          {slides[index].title && (
            <h1 className="font-display text-4xl font-bold leading-tight drop-shadow-md sm:text-5xl md:text-6xl">
              {slides[index].title}
            </h1>
          )}
          {slides[index].subtitle && (
            <p className="mt-4 text-lg text-primary-foreground/90 sm:text-xl">
              {slides[index].subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/30 p-2 text-primary-foreground backdrop-blur transition hover:bg-background/50 sm:left-6 sm:p-3"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/30 p-2 text-primary-foreground backdrop-blur transition hover:bg-background/50 sm:right-6 sm:p-3"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "w-8 bg-primary-foreground"
                    : "w-2.5 bg-primary-foreground/50 hover:bg-primary-foreground/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
