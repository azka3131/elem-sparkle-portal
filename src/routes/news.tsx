import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { NEWS } from "@/lib/data";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Berita Sekolah — SD Cendekia Harapan" },
      { name: "description", content: "Kegiatan, prestasi, dan pengumuman terbaru SD Cendekia Harapan." },
    ],
  }),
  component: News,
});

function News() {
  return (
    <>
      <PageHeader title="Berita Sekolah" subtitle="Ikuti cerita dan kabar terbaru dari komunitas kami." />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {NEWS.map((n) => (
            <Card key={n.id} className="group overflow-hidden border-border/60 pt-0 transition-shadow hover:shadow-[var(--shadow-card)]">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={n.image} alt={n.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-primary">{n.category}</Badge>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{n.date}</span>
                </div>
                <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug">{n.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{n.excerpt}</p>
                <button className="mt-4 text-sm font-medium text-primary hover:underline">Baca selengkapnya →</button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
