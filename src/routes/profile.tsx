import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, History, Network } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profil Sekolah — SD Cendekia Harapan" },
      { name: "description", content: "Visi, misi, sejarah, dan struktur organisasi SD Cendekia Harapan." },
    ],
  }),
  component: Profile,
});

function Profile() {
  return (
    <>
      <PageHeader title="Profil Sekolah" subtitle="Mengenal lebih dekat siapa kami dan apa yang kami perjuangkan." />
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Accordion type="single" collapsible defaultValue="visi" className="space-y-4">
          <AccordionItem value="visi" className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <AccordionTrigger className="px-6 py-5 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                  <Eye className="h-5 w-5" />
                </div>
                <span className="text-lg font-semibold">Visi & Misi</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-primary"><Eye className="h-4 w-4" /><h3 className="font-semibold">Visi</h3></div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Menjadi sekolah dasar unggulan yang membentuk generasi cerdas, berkarakter, dan siap menghadapi tantangan masa depan dengan nilai-nilai luhur bangsa.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-primary"><Target className="h-4 w-4" /><h3 className="font-semibold">Misi</h3></div>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                      <li>Menyelenggarakan pembelajaran aktif, kreatif, dan menyenangkan.</li>
                      <li>Menumbuhkan karakter religius dan peduli sosial.</li>
                      <li>Mengembangkan literasi, numerasi, dan kompetensi digital.</li>
                      <li>Membangun budaya cinta lingkungan dan hidup sehat.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sejarah" className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <AccordionTrigger className="px-6 py-5 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                  <History className="h-5 w-5" />
                </div>
                <span className="text-lg font-semibold">Sejarah Sekolah</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
              <p>
                SD Cendekia Harapan didirikan pada tahun 1985 oleh sekelompok pendidik yang memimpikan sekolah dasar dengan pendekatan pembelajaran yang humanis dan modern. Berawal dari 3 ruang kelas sederhana, sekolah ini berkembang menjadi salah satu institusi pendidikan dasar terpercaya di Jakarta Selatan.
              </p>
              <p>
                Pada tahun 2002, sekolah ini menjadi salah satu pelopor penerapan kurikulum berbasis karakter di Indonesia. Di tahun 2018, kami meresmikan gedung baru tiga lantai dengan fasilitas laboratorium komputer, sains, serta perpustakaan modern.
              </p>
              <p>
                Hingga kini, lebih dari 8.000 alumni telah dihasilkan dan tersebar di berbagai bidang. Kami terus berinovasi untuk memberikan pendidikan terbaik bagi generasi penerus bangsa.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="struktur" className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <AccordionTrigger className="px-6 py-5 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                  <Network className="h-5 w-5" />
                </div>
                <span className="text-lg font-semibold">Struktur Organisasi</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-dashed border-border bg-secondary/40">
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
                  <Network className="h-10 w-10 text-primary/60" />
                  <p className="text-sm font-medium">Bagan Struktur Organisasi</p>
                  <p className="text-xs">Placeholder gambar — unggah bagan struktur di sini.</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  );
}
