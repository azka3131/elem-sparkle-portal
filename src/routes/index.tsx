import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Trophy, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroSlider } from "@/components/HeroSlider";
import { ACHIEVEMENTS, FACILITIES, HERO_SLIDES, SCHOOL_NEWS, STATS, SCHOOL } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SD Cendekia Harapan — Beranda" },
      { name: "description", content: "Sekolah dasar modern yang menumbuhkan rasa ingin tahu, karakter, dan kreativitas." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Full-width hero image slider */}
      <HeroSlider slides={HERO_SLIDES}>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" variant="secondary">
            <Link to="/profile/vision">Learn More <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            <Link to="/ppdb">PPDB Registration</Link>
          </Button>
        </div>
      </HeroSlider>

      {/* Stats */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Berita Terbaru"
          title="Apa yang sedang terjadi di sekolah"
          link={{ to: "/news/school", label: "Lihat semua berita" }}
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {SCHOOL_NEWS.slice(0, 3).map((n) => (
            <Card key={n.id} className="group overflow-hidden border-border/60 pt-0 transition-shadow hover:shadow-[var(--shadow-card)]">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={n.image} alt={n.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-primary">{n.category}</Badge>
                  <span>{n.date}</span>
                </div>
                <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug">{n.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{n.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Achievements preview */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Prestasi"
            title="Pencapaian membanggakan kami"
            link={{ to: "/achievements", label: "Semua prestasi" }}
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {ACHIEVEMENTS.slice(0, 3).map((a) => (
              <Card key={a.title} className="group overflow-hidden border-border/60 pt-0 transition-shadow hover:shadow-[var(--shadow-card)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">{a.year}</Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold leading-snug">{a.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Fasilitas"
          title="Sarana penunjang pembelajaran"
          link={{ to: "/facilities", label: "Semua fasilitas" }}
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FACILITIES.slice(0, 4).map((f) => (
            <Card key={f.title} className="group overflow-hidden border-border/60 pt-0 transition-shadow hover:shadow-[var(--shadow-card)]">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={f.image} alt={f.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-primary">
                  <Building2 className="h-4 w-4" />
                  <h3 className="text-base font-semibold">{f.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact section */}
      <section className="bg-[var(--gradient-hero)] py-16 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/80">Hubungi Kami</p>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Mari berkunjung ke {SCHOOL.name}</h2>
            <p className="mt-3 max-w-xl text-primary-foreground/90">
              Tim kami siap menyambut Anda untuk tur sekolah, konsultasi pendaftaran, atau sekadar berbincang tentang pendidikan anak.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Hubungi Sekolah</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <Link to="/ppdb">Daftar PPDB</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeader({
  eyebrow,
  title,
  link,
}: {
  eyebrow: string;
  title: string;
  link?: { to: string; label: string };
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{title}</h2>
      </div>
      {link && (
        <Button asChild variant="ghost" className="hidden sm:inline-flex">
          <Link to={link.to}>{link.label} <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      )}
    </div>
  );
}
