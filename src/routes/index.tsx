import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Phone, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NEWS, STATS, SCHOOL } from "@/lib/data";
import hero from "@/assets/hero.jpg";
import logo from "@/assets/school-logo.png";

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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img src={hero} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div className="text-primary-foreground">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Tahun Ajaran 2026/2027 dibuka
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              {SCHOOL.name}
            </h1>
            <p className="mt-3 text-lg text-primary-foreground/90 sm:text-xl">{SCHOOL.tagline}</p>
            <p className="mt-5 max-w-xl text-primary-foreground/85">{SCHOOL.welcome}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/ppdb">Daftar PPDB <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                <Link to="/profile">Tentang Sekolah</Link>
              </Button>
            </div>
          </div>
          <div className="hidden items-center justify-center lg:flex">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-white/10 blur-3xl" />
              <div className="relative grid h-72 w-72 place-items-center rounded-3xl bg-white/95 shadow-2xl">
                <img src={logo} alt="School logo" className="h-48 w-48" width={192} height={192} />
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* News preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Berita Terbaru</p>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Apa yang sedang terjadi di sekolah</h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/news">Lihat semua <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {NEWS.slice(0, 3).map((n) => (
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

      {/* Contact + Map */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Hubungi Kami</p>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Mari berkunjung ke sekolah kami</h2>
            <p className="mt-3 text-muted-foreground">
              Tim kami siap menyambut Anda untuk tur sekolah, konsultasi pendaftaran, atau sekadar berbincang tentang pendidikan anak.
            </p>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{SCHOOL.address}</span></li>
              <li className="flex items-start gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{SCHOOL.phone}</span></li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{SCHOOL.email}</span></li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
            <iframe
              title="Lokasi Sekolah"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3!2d106.8!3d-6.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2sJakarta!5e0!3m2!1sen!2sid!4v1700000000000"
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
