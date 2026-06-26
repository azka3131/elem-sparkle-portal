import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface NewsItem {
  id: number | string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
}

interface Props {
  items: NewsItem[];
}

export function NewsGrid({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
        Belum ada konten untuk ditampilkan.
      </div>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((n) => (
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
  );
}
