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
import { TEACHERS } from "@/lib/data";

export const Route = createFileRoute("/admin/teachers")({
  head: () => ({
    meta: [{ title: "Guru & Staf — Admin" }, { name: "robots", content: "noindex" }],
  }),
  component: TeachersAdmin,
});

interface Teacher {
  id: number;
  photo: string;
  name: string;
  position: string;
  bio: string;
  order: number;
  active: boolean;
}

const EMPTY: Teacher = {
  id: 0,
  photo: "",
  name: "",
  position: "",
  bio: "",
  order: 1,
  active: true,
};

const INITIAL: Teacher[] = TEACHERS.map((t, i) => ({
  id: i + 1,
  photo: t.photo,
  name: t.name,
  position: t.position,
  bio: t.bio,
  order: i + 1,
  active: true,
}));

function TeachersAdmin() {
  const { items, save, remove } = useCrud<Teacher>(INITIAL);

  const columns: Column<Teacher>[] = [
    {
      key: "photo",
      header: "Foto",
      render: (r) =>
        r.photo ? (
          <img src={r.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <div className="grid h-10 w-10 place-items-center rounded-full bg-muted text-xs">
            {r.name.charAt(0) || "?"}
          </div>
        ),
    },
    {
      key: "name",
      header: "Nama",
      sortable: true,
      render: (r) => <span className="font-medium">{r.name}</span>,
    },
    { key: "position", header: "Jabatan", sortable: true },
    { key: "order", header: "Urutan", sortable: true, className: "w-20" },
    {
      key: "active",
      header: "Status",
      render: (r) =>
        r.active ? <Badge>Aktif</Badge> : <Badge variant="secondary">Nonaktif</Badge>,
    },
  ];

  return (
    <AdminLayout title="Guru & Staf" breadcrumbs={[{ label: "Guru & Staf" }]}>
      <CrudTable
        items={items}
        columns={columns}
        entityName="Guru/Staf"
        searchKeys={["name", "position"]}
        onDelete={remove}
        renderForm={(editing, close) => (
          <FormDialog<Teacher>
            open
            onOpenChange={(o) => !o && close()}
            title={editing ? "Edit Guru/Staf" : "Tambah Guru/Staf"}
            initial={editing}
            emptyValue={{ ...EMPTY, order: items.length + 1 }}
            validate={(v) => {
              const e: Record<string, string> = {};
              if (!v.name.trim()) e.name = "Nama wajib diisi.";
              if (!v.position.trim()) e.position = "Jabatan wajib diisi.";
              if (v.bio.length > 400) e.bio = "Maksimal 400 karakter.";
              return e;
            }}
            onSubmit={(v) => save(v, editing, "Guru/Staf")}
          >
            {({ values, setField, errors }) => (
              <>
                <div className="grid gap-4 sm:grid-cols-[220px_1fr]">
                  <div className="space-y-2">
                    <Label>Foto</Label>
                    <ImageUpload
                      value={values.photo}
                      onChange={(v) => setField("photo", v ?? "")}
                      aspect="square"
                      label="Unggah Foto"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nama Lengkap</Label>
                      <Input
                        value={values.name}
                        onChange={(e) => setField("name", e.target.value)}
                      />
                      <FieldError message={errors.name} />
                    </div>
                    <div className="space-y-2">
                      <Label>Jabatan</Label>
                      <Input
                        value={values.position}
                        onChange={(e) => setField("position", e.target.value)}
                      />
                      <FieldError message={errors.position} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
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
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Deskripsi Singkat</Label>
                  <Textarea
                    rows={4}
                    value={values.bio}
                    onChange={(e) => setField("bio", e.target.value)}
                    placeholder="Latar belakang pendidikan, mata pelajaran diampu, dsb."
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <FieldError message={errors.bio} />
                    <span>{values.bio.length}/400</span>
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
