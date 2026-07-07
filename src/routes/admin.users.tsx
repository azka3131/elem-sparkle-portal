import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CrudTable, type Column } from "@/components/admin/CrudTable";
import { FormDialog, FieldError } from "@/components/admin/FormDialog";
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
import { ADMIN_USERS, type AdminUser } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [{ title: "Pengguna — Admin" }, { name: "robots", content: "noindex" }],
  }),
  component: UsersAdmin,
});

const ROLES: AdminUser["role"][] = ["Super Admin", "Editor", "Author"];

interface UserForm extends AdminUser {
  password: string;
  passwordConfirm: string;
}

const EMPTY: UserForm = {
  id: 0,
  name: "",
  email: "",
  role: "Editor",
  active: true,
  password: "",
  passwordConfirm: "",
};

function UsersAdmin() {
  const initial: UserForm[] = ADMIN_USERS.map((u) => ({
    ...u,
    password: "",
    passwordConfirm: "",
  }));
  const { items, save, remove } = useCrud<UserForm>(initial);

  const columns: Column<UserForm>[] = [
    {
      key: "name",
      header: "Nama",
      sortable: true,
      render: (r) => (
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-xs font-bold">
            {r.name.charAt(0)}
          </div>
          <span className="font-medium">{r.name}</span>
        </div>
      ),
    },
    { key: "email", header: "Email", sortable: true },
    {
      key: "role",
      header: "Peran",
      sortable: true,
      render: (r) => <Badge variant="secondary">{r.role}</Badge>,
    },
    {
      key: "active",
      header: "Status",
      render: (r) =>
        r.active ? <Badge>Aktif</Badge> : <Badge variant="outline">Nonaktif</Badge>,
    },
  ];

  return (
    <AdminLayout title="Pengguna" breadcrumbs={[{ label: "Pengguna" }]}>
      <CrudTable
        items={items}
        columns={columns}
        entityName="Pengguna"
        searchKeys={["name", "email", "role"]}
        onDelete={remove}
        renderForm={(editing, close) => (
          <FormDialog<UserForm>
            open
            onOpenChange={(o) => !o && close()}
            title={editing ? "Edit Pengguna" : "Tambah Pengguna"}
            initial={editing}
            emptyValue={EMPTY}
            validate={(v) => {
              const e: Record<string, string> = {};
              if (!v.name.trim()) e.name = "Nama wajib diisi.";
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
                e.email = "Format email tidak valid.";
              // Password required for new user; optional when editing.
              const requirePassword = !editing;
              if (requirePassword && v.password.length < 6)
                e.password = "Kata sandi minimal 6 karakter.";
              if (v.password && v.password !== v.passwordConfirm)
                e.passwordConfirm = "Konfirmasi kata sandi tidak cocok.";
              return e;
            }}
            onSubmit={(v) =>
              save(
                { ...v, password: "", passwordConfirm: "" },
                editing,
                "Pengguna",
              )
            }
          >
            {({ values, setField, errors }) => (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Nama Lengkap</Label>
                    <Input
                      value={values.name}
                      onChange={(e) => setField("name", e.target.value)}
                    />
                    <FieldError message={errors.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={values.email}
                      onChange={(e) => setField("email", e.target.value)}
                    />
                    <FieldError message={errors.email} />
                  </div>
                  <div className="space-y-2">
                    <Label>Peran</Label>
                    <Select
                      value={values.role}
                      onValueChange={(v) => setField("role", v as AdminUser["role"])}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end justify-between rounded-lg border border-border p-3">
                    <div>
                      <div className="text-sm font-medium">Aktif</div>
                      <div className="text-xs text-muted-foreground">
                        Cabut akses tanpa menghapus akun.
                      </div>
                    </div>
                    <Switch
                      checked={values.active}
                      onCheckedChange={(c) => setField("active", c)}
                    />
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="mb-3 text-sm font-medium">
                    {editing ? "Ubah Kata Sandi (opsional)" : "Kata Sandi"}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Kata Sandi</Label>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        value={values.password}
                        onChange={(e) => setField("password", e.target.value)}
                      />
                      <FieldError message={errors.password} />
                    </div>
                    <div className="space-y-2">
                      <Label>Konfirmasi Kata Sandi</Label>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        value={values.passwordConfirm}
                        onChange={(e) => setField("passwordConfirm", e.target.value)}
                      />
                      <FieldError message={errors.passwordConfirm} />
                    </div>
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
