import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CrudTable, type Column } from "@/components/admin/CrudTable";
import { FormDialog, FieldError } from "@/components/admin/FormDialog";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useCrud } from "@/components/admin/useCrud";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GALLERY_ALBUMS } from "@/lib/data";
import { useRef } from "react";

export const Route = createFileRoute("/admin/gallery")({
  head: () => ({
    meta: [{ title: "Galeri — Admin" }, { name: "robots", content: "noindex" }],
  }),
  component: GalleryAdmin,
});

const CATEGORIES = ["Kegiatan", "Prestasi", "Fasilitas", "Umum"] as const;
type Category = (typeof CATEGORIES)[number];

interface Album {
  id: number;
  cover: string;
  title: string;
  category: Category;
  images: string[];
  order: number;
  active: boolean;
}

const EMPTY: Album = {
  id: 0,
  cover: "",
  title: "",
  category: "Kegiatan",
  images: [],
  order: 1,
  active: true,
};

const INITIAL: Album[] = GALLERY_ALBUMS.map((a, i) => ({
  id: i + 1,
  cover: a.cover,
  title: a.title,
  category: "Kegiatan",
  images: a.images,
  order: i + 1,
  active: true,
}));

function GalleryAdmin() {
  const { items, save, remove } = useCrud<Album>(INITIAL);

  const columns: Column<Album>[] = [
    {
      key: "cover",
      header: "Sampul",
      render: (r) => <img src={r.cover} alt="" className="h-12 w-16 rounded object-cover" />,
    },
    {
      key: "title",
      header: "Nama Album",
      sortable: true,
      render: (r) => <span className="font-medium">{r.title}</span>,
    },
    { key: "category", header: "Kategori", sortable: true, render: (r) => <Badge variant="secondary">{r.category}</Badge> },
    { key: "images", header: "Jumlah Foto", render: (r) => `${r.images.length} foto` },
    { key: "order", header: "Urutan", sortable: true, className: "w-20" },
    {
      key: "active",
      header: "Status",
      render: (r) =>
        r.active ? <Badge>Aktif</Badge> : <Badge variant="secondary">Nonaktif</Badge>,
    },
  ];

  return (
    <AdminLayout title="Galeri" breadcrumbs={[{ label: "Galeri" }]}>
      <CrudTable
        items={items}
        columns={columns}
        entityName="Album"
        searchKeys={["title"]}
        onDelete={remove}
        renderForm={(editing, close) => (
          <FormDialog<Album>
            open
            onOpenChange={(o) => !o && close()}
            title={editing ? "Edit Album" : "Tambah Album"}
            description="Unggah beberapa foto sekaligus. Foto pertama otomatis menjadi sampul."
            initial={editing}
            emptyValue={{ ...EMPTY, order: items.length + 1 }}
            size="xl"
            validate={(v) => {
              const e: Record<string, string> = {};
              if (!v.title.trim()) e.title = "Nama album wajib diisi.";
              if (v.images.length === 0) e.images = "Minimal 1 foto per album.";
              return e;
            }}
            onSubmit={(v) => save({ ...v, cover: v.images[0] ?? v.cover }, editing, "Album")}
          >
            {({ values, setField, errors }) => (
              <AlbumFormFields values={values} setField={setField} errors={errors} />
            )}
          </FormDialog>
        )}
      />
    </AdminLayout>
  );
}

function AlbumFormFields({
  values,
  setField,
  errors,
}: {
  values: Album;
  setField: <K extends keyof Album>(k: K, v: Album[K]) => void;
  errors: Record<string, string>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const addImages = (files: FileList | null) => {
    if (!files) return;
    const readers = Array.from(files).map(
      (f) =>
        new Promise<string>((resolve) => {
          const r = new FileReader();
          r.onload = () => resolve(String(r.result));
          r.readAsDataURL(f);
        }),
    );
    Promise.all(readers).then((urls) =>
      setField("images", [...values.images, ...urls]),
    );
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Nama Album</Label>
          <Input
            value={values.title}
            onChange={(e) => setField("title", e.target.value)}
          />
          <FieldError message={errors.title} />
        </div>
        <div className="space-y-2">
          <Label>Kategori</Label>
          <Select
            value={values.category}
            onValueChange={(v) => setField("category", v as Category)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Urutan</Label>
          <Input
            type="number"
            min={1}
            value={values.order}
            onChange={(e) => setField("order", Number(e.target.value))}
          />
        </div>
        <div className="flex items-end justify-between rounded-lg border border-border p-3">
          <span className="text-sm font-medium">Aktif</span>
          <Switch
            checked={values.active}
            onCheckedChange={(c) => setField("active", c)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Foto Album</Label>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              addImages(e.target.files);
              e.target.value = "";
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            + Tambah Foto
          </Button>
        </div>
        <FieldError message={errors.images} />
        {values.images.length === 0 ? (
          <ImageUpload
            value={undefined}
            onChange={(url) => url && setField("images", [url])}
            aspect="wide"
            label="Unggah Foto Pertama"
          />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {values.images.map((src, i) => (
              <div key={i} className="group relative overflow-hidden rounded-lg border border-border">
                <img src={src} alt="" className="aspect-square w-full object-cover" />
                {i === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                    Sampul
                  </span>
                )}
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute right-1.5 top-1.5 h-7 w-7 opacity-0 transition group-hover:opacity-100"
                  onClick={() =>
                    setField(
                      "images",
                      values.images.filter((_, idx) => idx !== i),
                    )
                  }
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
