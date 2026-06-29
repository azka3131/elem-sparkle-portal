import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CrudTable, DefaultForm, type Column } from "@/components/admin/CrudTable";
import { Badge } from "@/components/ui/badge";
import { SCHOOL_NEWS } from "@/lib/data";

export const Route = createFileRoute("/admin/news")({
  head: () => ({ meta: [{ title: "Berita — Admin" }, { name: "robots", content: "noindex" }] }),
  component: NewsAdmin,
});

interface NewsRow {
  id: number;
  image: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  status: "Publish" | "Draft";
}

const ITEMS: NewsRow[] = SCHOOL_NEWS.map((n) => ({
  id: n.id,
  image: n.image,
  title: n.title,
  slug: n.slug,
  category: n.category,
  date: n.date,
  author: n.author,
  status: "Publish",
}));

function NewsAdmin() {
  const columns: Column<NewsRow>[] = [
    { key: "image", header: "Thumbnail", render: (r) => <img src={r.image} alt="" className="h-12 w-16 rounded object-cover" /> },
    { key: "title", header: "Judul", render: (r) => (
      <div>
        <div className="font-medium">{r.title}</div>
        <div className="text-xs text-muted-foreground">/{r.slug}</div>
      </div>
    ) },
    { key: "category", header: "Kategori", render: (r) => <Badge variant="secondary">{r.category}</Badge> },
    { key: "date", header: "Tanggal" },
    { key: "author", header: "Penulis" },
    { key: "status", header: "Status", render: (r) => <Badge>{r.status}</Badge> },
  ];

  return (
    <AdminLayout title="Berita" breadcrumbs={[{ label: "News" }]}>
      <CrudTable
        items={ITEMS}
        columns={columns}
        entityName="Berita"
        searchKeys={["title", "category", "author"]}
        renderForm={(item, onClose) => <DefaultForm item={item} onClose={onClose} />}
      />
    </AdminLayout>
  );
}
