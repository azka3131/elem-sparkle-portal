import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileImage, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/ppdb")({
  head: () => ({
    meta: [
      { title: "PPDB 2026/2027 — SD Cendekia Harapan" },
      { name: "description", content: "Informasi Penerimaan Peserta Didik Baru tahun ajaran 2026/2027." },
    ],
  }),
  component: PPDB,
});

const steps = [
  "Isi formulir pendaftaran online",
  "Unggah dokumen persyaratan",
  "Mengikuti observasi kesiapan",
  "Pengumuman & daftar ulang",
];

function PPDB() {
  return (
    <>
      <PageHeader title="PPDB 2026/2027" subtitle="Bergabunglah dengan keluarga besar SD Cendekia Harapan." />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="aspect-[3/4] w-full overflow-hidden bg-[var(--gradient-hero)] sm:aspect-[16/10]">
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center text-primary-foreground">
              <FileImage className="h-16 w-16 opacity-90" />
              <p className="text-2xl font-bold sm:text-3xl">Brosur PPDB 2026/2027</p>
              <p className="max-w-md text-primary-foreground/85">
                Placeholder gambar — unggah brosur penerimaan siswa baru di sini (rekomendasi rasio 3:4 atau 16:10).
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Alur Pendaftaran</h3>
              <ol className="mt-4 space-y-3">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-start gap-3">
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</div>
                    <p className="pt-0.5 text-sm text-foreground">{s}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Persyaratan</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {["Usia minimal 6 tahun", "Akta kelahiran", "Kartu Keluarga", "Pas foto 3x4"].map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{r}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full"><Download className="mr-2 h-4 w-4" />Unduh Brosur</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
