import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CrudTable, type Column } from "@/components/admin/CrudTable";
import { FormDialog, FieldError } from "@/components/admin/FormDialog";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useCrud } from "@/components/admin/useCrud";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ACHIEVEMENTS } from "@/lib/data";

export const Route = createFileRoute("/admin/achievements")({
  head: () => ({
    meta: [{ title: "Prestasi — Admin" }, { name: "robots", content: "noindex" }],
  }),
  component: AchievementsAdmin,
});

interface Achievement {
  id: number;
  image: string;
  title: string;
  year: number;
  description: string;
  active: boolean;
}

const CURRENT_YEAR = new Date().getFullYear();
const EMPTY: Achievement = {
  id: 0,
  image: "",
  title: "",
  year: CURRENT_YEAR,
  description: "",
  active: true,
};

const INITIAL: Achievement[] = ACHIEVEMENTS.map((a, i) => ({
  id: i + 1,
  ...a,
  active: true,
}));

function AchievementsAdmin() {
  const { items, save, remove } = useCrud<Achievement>(INITIAL);

  const columns: Column<Achievement>[] = [
    {
      key: "image",
      header: "Gambar",
      render: (r) =>
        r.image ? (
          <img src={r.image} alt="" className="h-12 w-16 rounded object-cover" />
        ) : (
          <div className="grid h-12 w-16 place-items-center rounded bg-muted text-xs">—</div>
        ),
    },
    {
      key: "title",
      header: "Judul",
      sortable: true,
      render: (r) => <span className="font-medium">{r.title}</span>,
    },
    { key: "year", header: "Tahun", sortable: true, className: "w-24" },
    { key: "description", header: "Deskripsi", className: "max-w-md truncate" },
    {
      key: "active",
      header: "Status",
      render: (r) =>
        r.active ? <Badge>Aktif</Badge> : <Badge variant="secondary">Nonaktif</Badge>,
    },
  ];

  return (
    <AdminLayout title="Prestasi" breadcrumbs={[{ label: "Prestasi" }]}>
      <CrudTable
        items={items}
        columns={columns}
        entityName="Prestasi"
        searchKeys={["title", "description"]}
        onDelete={remove}
        renderForm={(editing, close) => (
          <FormDialog<Achievement>
            open
            onOpenChange={(o) => !o && close()}
            title={editing ? "Edit Prestasi" : "Tambah Prestasi"}
            initial={editing}
            emptyValue={EMPTY}
            validate={(v) => {
              const e: Record<string, string> = {};
              if (!v.title.trim()) e.title = "Judul wajib diisi.";
              if (v.year < 1980 || v.year > CURRENT_YEAR + 1)
                e.year = `Tahun harus 1980–${CURRENT_YEAR + 1}.`;
              if (!v.description.trim()) e.description = "Deskripsi wajib diisi.";
              return e;
            }}
            onSubmit={(v) => save(v, editing, "Prestasi")}
          >
            {({ values, setField, errors }) => (
              <>
                <div className="space-y-2">
                  <Label>Gambar</Label>
                  <ImageUpload
                    value={values.image}
                    onChange={(v) => setField("image", v ?? "")}
                    aspect="video"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
                  <div className="space-y-2">
                    <Label>Judul Prestasi</Label>
                    <Input
                      value={values.title}
                      onChange={(e) => setField("title", e.target.value)}
                    />
                    <FieldError message={errors.title} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tahun</Label>
                    <Input
                      type="number"
                      value={values.year}
                      onChange={(e) => setField("year", Number(e.target.value))}
                    />
                    <FieldError message={errors.year} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Deskripsi</Label>
                  <Textarea
                    rows={4}
                    value={values.description}
                    onChange={(e) => setField("description", e.target.value)}
                  />
                  <FieldError message={errors.description} />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <div className="text-sm font-medium">Aktif</div>
                    <div className="text-xs text-muted-foreground">
                      Sembunyikan dari website tanpa menghapus data.
                    </div>
                  </div>
                  <Switch
                    checked={values.active}
                    onCheckedChange={(c) => setField("active", c)}
                  />
                </div>
              </>
            )}
          </FormDialog>
        )}
      />
    </AdminLayout>
  );
}
