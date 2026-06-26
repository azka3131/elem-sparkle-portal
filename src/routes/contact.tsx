import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { SCHOOL } from "@/lib/data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontak — SD Cendekia Harapan" },
      {
        name: "description",
        content: "Hubungi SD Cendekia Harapan untuk informasi, kunjungan, atau pendaftaran.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // UI only — later this will POST to the backend and store the message in the database.
    setSending(true);
    setTimeout(() => {
      toast.success("Pesan terkirim", {
        description: "Terima kasih, tim kami akan menghubungi Anda secepatnya.",
      });
      setForm({ name: "", phone: "", message: "" });
      setSending(false);
    }, 600);
  }

  return (
    <>
      <PageHeader
        title="Hubungi Kami"
        subtitle="Kami senang mendengar dari Anda — kirimkan pesan kapan saja."
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: form */}
          <Card className="border-border/60 shadow-[var(--shadow-card)]">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl font-bold">Kirim Pesan</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Isi formulir di bawah ini dan tim kami akan segera merespons.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nama Anda"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="08xx-xxxx-xxxx"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tuliskan pesan Anda di sini..."
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={sending}>
                  <Send className="mr-2 h-4 w-4" />
                  {sending ? "Mengirim..." : "Kirim Pesan"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Right: map + info */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
              <iframe
                title="Lokasi Sekolah"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3!2d106.8!3d-6.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2sJakarta!5e0!3m2!1sen!2sid!4v1700000000000"
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <Card className="border-border/60">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">Informasi Sekolah</h3>
                <ul className="mt-4 space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-medium text-foreground">Alamat</div>
                      <div className="text-muted-foreground">{SCHOOL.address}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                      <Phone className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-medium text-foreground">Telepon</div>
                      <div className="text-muted-foreground">{SCHOOL.phone}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-medium text-foreground">Email</div>
                      <div className="text-muted-foreground">{SCHOOL.email}</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
