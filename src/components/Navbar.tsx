import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/school-logo.png";
import { NAV_LINKS, SCHOOL } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-10 shrink-0" width={40} height={40} />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-bold text-primary sm:text-base">{SCHOOL.name}</div>
            <div className="hidden text-xs text-muted-foreground sm:block">{SCHOOL.tagline}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary bg-secondary" }}
              inactiveProps={{ className: "text-foreground/70 hover:text-primary hover:bg-secondary/60" }}
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm">
            <Link to="/ppdb">Daftar PPDB</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-foreground/80 hover:bg-secondary lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary bg-secondary" }}
                inactiveProps={{ className: "text-foreground/80" }}
                className="rounded-md px-3 py-2.5 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link to="/ppdb" onClick={() => setOpen(false)}>Daftar PPDB</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
