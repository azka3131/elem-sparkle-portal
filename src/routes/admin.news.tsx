import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContentTable, type ContentRow } from "@/components/admin/ContentTable";
import { Badge } from "@/components/ui/badge";
import { SCHOOL_NEWS } from "@/lib/data";

export const Route = createFileRoute("/admin/news")({
  head: () => ({ meta: [{ title: "Berita — Admin" }, { name: "robots", content: "noindex" }] }),
  component: NewsAdmin,
});

const ITEMS: ContentRow[] = SCHOOL_NEWS.map((n) => ({
  id: n.id,
  image: n.image,
  title: n.title,
  slug: n.slug,
  category: n.category,
  date: n.date,
  author: n.author,
  status: n.status,
}));

function NewsAdmin() {
  return (
    <AdminLayout title="Berita" breadcrumbs={[{ label: "Berita" }]}>
      <ContentTable
        items={ITEMS}
        entityName="Berita"
        extraColumn={{
          header: "Kategori",
          render: (r) => <Badge variant="secondary">{r.category}</Badge>,
        }}
      />
    </AdminLayout>
  );
}
