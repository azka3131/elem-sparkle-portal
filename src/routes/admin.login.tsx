import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Hidden admin entry. This route is intentionally NOT linked from any public
 * page (navbar, footer, sitemap). Administrators reach it by typing the URL
 * directly. Authentication will be wired in a later phase.
 */
export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-secondary/40 px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="mt-4 text-center text-2xl font-bold">Administrator Login</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Khusus untuk pengelola situs sekolah.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input id="admin-email" type="email" placeholder="admin@cendekiaharapan.sch.id" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input id="admin-password" type="password" placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full" disabled>
            Masuk (segera hadir)
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Autentikasi belum diaktifkan pada tahap ini.
        </p>
      </div>
    </div>
  );
}
