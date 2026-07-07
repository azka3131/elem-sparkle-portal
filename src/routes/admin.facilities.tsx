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
import { FACILITIES } from "@/lib/data";

export const Route = createFileRoute("/admin/facilities")({
  head: () => ({
    meta: [{ title: "Fasilitas — Admin" }, { name: "robots", content: "noindex" }],
  }),
  component: FacilitiesAdmin,
});

interface Facility {
  id: number;
  image: string;
  title: string;
  description: string;
  active: boolean;
}

const EMPTY: Facility = { id: 0, image: "", title: "", description: "", active: true };
const INITIAL: Facility[] = FACILITIES.map((f, i) => ({ id: i + 1, ...f, active: true }));

function FacilitiesAdmin() {
  const { items, save, remove } = useCrud<Facility>(INITIAL);

  const columns: Column<Facility>[] = [
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
      header: "Nama Fasilitas",
      sortable: true,
      render: (r) => <span className="font-medium">{r.title}</span>,
    },
    { key: "description", header: "Deskripsi", className: "max-w-md truncate" },
    {
      key: "active",
      header: "Status",
      render: (r) =>
        r.active ? <Badge>Aktif</Badge> : <Badge variant="secondary">Nonaktif</Badge>,
    },
  ];

  return (
    <AdminLayout title="Fasilitas" breadcrumbs={[{ label: "Fasilitas" }]}>
      <CrudTable
        items={items}
        columns={columns}
        entityName="Fasilitas"
        searchKeys={["title", "description"]}
        onDelete={remove}
        renderForm={(editing, close) => (
          <FormDialog<Facility>
            open
            onOpenChange={(o) => !o && close()}
            title={editing ? "Edit Fasilitas" : "Tambah Fasilitas"}
            initial={editing}
            emptyValue={EMPTY}
            validate={(v) => {
              const e: Record<string, string> = {};
              if (!v.title.trim()) e.title = "Nama fasilitas wajib diisi.";
              if (!v.description.trim()) e.description = "Deskripsi wajib diisi.";
              return e;
            }}
            onSubmit={(v) => save(v, editing, "Fasilitas")}
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
                <div className="space-y-2">
                  <Label>Nama Fasilitas</Label>
                  <Input
                    value={values.title}
                    onChange={(e) => setField("title", e.target.value)}
                  />
                  <FieldError message={errors.title} />
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
                  <span className="text-sm font-medium">Aktif</span>
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
