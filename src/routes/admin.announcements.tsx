import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CrudTable, DefaultForm, type Column } from "@/components/admin/CrudTable";
import { Badge } from "@/components/ui/badge";
import { Paperclip } from "lucide-react";
import { ANNOUNCEMENTS } from "@/lib/data";

export const Route = createFileRoute("/admin/announcements")({
  head: () => ({ meta: [{ title: "Pengumuman — Admin" }, { name: "robots", content: "noindex" }] }),
  component: AnnouncementsAdmin,
});

interface AnnRow {
  id: number;
  image: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  attachments: number;
  status: "Publish" | "Draft";
}

const ITEMS: AnnRow[] = ANNOUNCEMENTS.map((a) => ({
  id: a.id,
  image: a.image,
  title: a.title,
  slug: a.slug,
  date: a.date,
  author: a.author,
  attachments: a.attachments?.length ?? 0,
  status: "Publish",
}));

function AnnouncementsAdmin() {
  const columns: Column<AnnRow>[] = [
    { key: "image", header: "Thumbnail", render: (r) => <img src={r.image} alt="" className="h-12 w-16 rounded object-cover" /> },
    { key: "title", header: "Judul", render: (r) => (
      <div>
        <div className="font-medium">{r.title}</div>
        <div className="text-xs text-muted-foreground">/{r.slug}</div>
      </div>
    ) },
    { key: "date", header: "Tanggal" },
    { key: "author", header: "Penulis" },
    { key: "attachments", header: "Lampiran", render: (r) => (
      <span className="inline-flex items-center gap-1 text-sm">
        <Paperclip className="h-3.5 w-3.5 text-muted-foreground" />
        {r.attachments}
      </span>
    ) },
    { key: "status", header: "Status", render: (r) => <Badge>{r.status}</Badge> },
  ];

  return (
    <AdminLayout title="Pengumuman" breadcrumbs={[{ label: "Announcements" }]}>
      <CrudTable
        items={ITEMS}
        columns={columns}
        entityName="Pengumuman"
        searchKeys={["title", "author"]}
        renderForm={(item, onClose) => <DefaultForm item={item} onClose={onClose} />}
      />
    </AdminLayout>
  );
}
