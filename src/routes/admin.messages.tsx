import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash2, Mail } from "lucide-react";
import { MESSAGES, type Message } from "@/lib/admin-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/messages")({
  head: () => ({ meta: [{ title: "Pesan — Admin" }, { name: "robots", content: "noindex" }] }),
  component: MessagesAdmin,
});

function MessagesAdmin() {
  const [items, setItems] = useState<Message[]>(MESSAGES);
  const [viewing, setViewing] = useState<Message | null>(null);

  const markRead = (id: number) => setItems((s) => s.map((m) => (m.id === id ? { ...m, read: true } : m)));
  const remove = (id: number) => {
    setItems((s) => s.filter((m) => m.id !== id));
    toast.success("Pesan dihapus");
  };

  return (
    <AdminLayout title="Pesan Masuk" breadcrumbs={[{ label: "Messages" }]}>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Pengirim</TableHead>
                <TableHead>Telepon</TableHead>
                <TableHead>Pesan</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((m) => (
                <TableRow key={m.id} className={!m.read ? "bg-primary/5" : ""}>
                  <TableCell>
                    <Mail className={`h-4 w-4 ${!m.read ? "text-primary" : "text-muted-foreground"}`} />
                  </TableCell>
                  <TableCell>
                    <div className={!m.read ? "font-semibold" : "font-medium"}>{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.email}</div>
                  </TableCell>
                  <TableCell className="text-sm">{m.phone}</TableCell>
                  <TableCell className="max-w-md truncate text-sm">{m.message}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{m.date}</TableCell>
                  <TableCell>
                    {m.read ? <Badge variant="secondary">Dibaca</Badge> : <Badge>Baru</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setViewing(m);
                          markRead(m.id);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => remove(m.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pesan dari {viewing?.name}</DialogTitle>
            <DialogDescription>{viewing?.date}</DialogDescription>
          </DialogHeader>
          {viewing && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Email</span>
                <span className="col-span-2 font-medium">{viewing.email}</span>
                <span className="text-muted-foreground">Telepon</span>
                <span className="col-span-2 font-medium">{viewing.phone}</span>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">{viewing.message}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
