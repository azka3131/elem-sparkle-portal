import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CrudTable, type Column } from "@/components/admin/CrudTable";
import { FormDialog, FieldError } from "@/components/admin/FormDialog";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useCrud } from "@/components/admin/useCrud";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { HERO_SLIDES } from "@/lib/data";

export const Route = createFileRoute("/admin/hero")({
  head: () => ({
    meta: [{ title: "Hero Slider — Admin" }, { name: "robots", content: "noindex" }],
  }),
  component: HeroAdmin,
});

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
  order: number;
  active: boolean;
}

const EMPTY: Slide = {
  id: 0,
  image: "",
  title: "",
  subtitle: "",
  buttonText: "",
  buttonUrl: "",
  order: 1,
  active: true,
};

const INITIAL: Slide[] = HERO_SLIDES.map((s, i) => ({
  id: s.id,
  image: s.image,
  title: s.title,
  subtitle: s.subtitle,
  buttonText: i === 3 ? "Daftar Sekarang" : "Pelajari Lebih",
  buttonUrl: i === 3 ? "/ppdb" : "/profile/vision",
  order: i + 1,
  active: true,
}));

function HeroAdmin() {
  const { items, save, remove } = useCrud<Slide>(INITIAL);

  const columns: Column<Slide>[] = [
    {
      key: "image",
      header: "Gambar",
      render: (r) =>
        r.image ? (
          <img src={r.image} alt="" className="h-12 w-20 rounded object-cover" />
        ) : (
          <div className="grid h-12 w-20 place-items-center rounded bg-muted text-xs text-muted-foreground">
            —
          </div>
        ),
    },
    {
      key: "title",
      header: "Judul",
      sortable: true,
      render: (r) => <span className="font-medium">{r.title}</span>,
    },
    { key: "subtitle", header: "Subjudul", className: "max-w-xs truncate" },
    { key: "order", header: "Urutan", sortable: true, className: "w-20" },
    {
      key: "active",
      header: "Status",
      render: (r) =>
        r.active ? <Badge>Aktif</Badge> : <Badge variant="secondary">Nonaktif</Badge>,
    },
  ];

  return (
    <AdminLayout title="Hero Slider" breadcrumbs={[{ label: "Website" }, { label: "Hero Slider" }]}>
      <CrudTable
        items={items}
        columns={columns}
        entityName="Slider"
        searchKeys={["title", "subtitle"]}
        onDelete={remove}
        renderForm={(editing, close) => (
          <FormDialog<Slide>
            open
            onOpenChange={(o) => !o && close()}
            title={editing ? "Edit Slider" : "Tambah Slider"}
            description="Kelola gambar, teks, dan tombol pada hero slider halaman utama."
            initial={editing}
            emptyValue={{ ...EMPTY, order: items.length + 1 }}
            validate={(v) => {
              const e: Record<string, string> = {};
              if (!v.image) e.image = "Gambar wajib diunggah.";
              if (!v.title.trim()) e.title = "Judul wajib diisi.";
              if (!v.subtitle.trim()) e.subtitle = "Subjudul wajib diisi.";
              if (v.buttonText && !v.buttonUrl.trim())
                e.buttonUrl = "Isi tautan tombol atau kosongkan teks tombol.";
              if (v.order < 1) e.order = "Minimal 1.";
              return e;
            }}
            onSubmit={(v) => save(v, editing, "Slider")}
          >
            {({ values, setField, errors }) => (
              <>
                <div className="space-y-2">
                  <Label>Gambar</Label>
                  <ImageUpload
                    value={values.image}
                    onChange={(v) => setField("image", v ?? "")}
                    aspect="wide"
                  />
                  <FieldError message={errors.image} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Judul</Label>
                    <Input
                      value={values.title}
                      onChange={(e) => setField("title", e.target.value)}
                    />
                    <FieldError message={errors.title} />
                  </div>
                  <div className="space-y-2">
                    <Label>Subjudul</Label>
                    <Input
                      value={values.subtitle}
                      onChange={(e) => setField("subtitle", e.target.value)}
                    />
                    <FieldError message={errors.subtitle} />
                  </div>
                  <div className="space-y-2">
                    <Label>Teks Tombol</Label>
                    <Input
                      value={values.buttonText}
                      onChange={(e) => setField("buttonText", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tautan Tombol</Label>
                    <Input
                      value={values.buttonUrl}
                      placeholder="/ppdb"
                      onChange={(e) => setField("buttonUrl", e.target.value)}
                    />
                    <FieldError message={errors.buttonUrl} />
                  </div>
                  <div className="space-y-2">
                    <Label>Urutan Tampil</Label>
                    <Input
                      type="number"
                      min={1}
                      value={values.order}
                      onChange={(e) => setField("order", Number(e.target.value))}
                    />
                    <FieldError message={errors.order} />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <div className="text-sm font-medium">Aktif</div>
                      <div className="text-xs text-muted-foreground">
                        Nonaktifkan untuk menyembunyikan dari slider.
                      </div>
                    </div>
                    <Switch
                      checked={values.active}
                      onCheckedChange={(c) => setField("active", c)}
                    />
                  </div>
                </div>
              </>
            )}
          </FormDialog>
        )}
      />
    </AdminLayout>
  );
}
