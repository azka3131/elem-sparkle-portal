import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/school-logo.png";
import { NAV_ITEMS, SCHOOL, type NavItem } from "@/lib/data";
import { Button } from "@/components/ui/button";

function isActivePath(pathname: string, item: NavItem): boolean {
  if (item.to === "/") return pathname === "/";
  if (pathname === item.to) return true;
  if (pathname.startsWith(item.to + "/")) return true;
  return item.children?.some((c) => pathname === c.to || pathname.startsWith(c.to + "/")) ?? false;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item);
            if (item.children) {
              return (
                <div key={item.to} className="group relative">
                  <button
                    className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      active ? "bg-secondary text-primary" : "text-foreground/70 hover:bg-secondary/60 hover:text-primary"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-0 top-full z-50 min-w-[220px] translate-y-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="mt-2 overflow-hidden rounded-xl border border-border bg-popover py-2 shadow-[var(--shadow-soft)]">
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          activeProps={{ className: "bg-secondary text-primary" }}
                          inactiveProps={{ className: "text-foreground/80" }}
                          className="block px-4 py-2 text-sm hover:bg-secondary/60 hover:text-primary"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary bg-secondary" }}
                inactiveProps={{ className: "text-foreground/70 hover:text-primary hover:bg-secondary/60" }}
                className="rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:block">
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
            {NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item);
              if (item.children) {
                const expanded = mobileExpanded === item.to;
                return (
                  <div key={item.to} className="border-b border-border/40 last:border-0">
                    <button
                      onClick={() => setMobileExpanded(expanded ? null : item.to)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium ${
                        active ? "text-primary" : "text-foreground/80"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                    </button>
                    {expanded && (
                      <div className="ml-3 flex flex-col border-l border-border pb-2 pl-3">
                        {item.children.map((c) => (
                          <Link
                            key={c.to}
                            to={c.to}
                            onClick={() => setOpen(false)}
                            activeProps={{ className: "text-primary" }}
                            inactiveProps={{ className: "text-foreground/70" }}
                            className="rounded-md px-3 py-2 text-sm"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-primary bg-secondary" }}
                  inactiveProps={{ className: "text-foreground/80" }}
                  className="rounded-md px-3 py-2.5 text-sm font-medium"
                >
                  {item.label}
                </Link>
              );
            })}
            <Button asChild className="mt-3">
              <Link to="/ppdb" onClick={() => setOpen(false)}>Daftar PPDB</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
