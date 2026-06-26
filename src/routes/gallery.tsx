import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { GALLERY } from "@/lib/data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Galeri — SD Cendekia Harapan" },
      { name: "description", content: "Momen-momen berharga di SD Cendekia Harapan." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <>
      <PageHeader title="Galeri" subtitle="Potret keseharian dan kegiatan istimewa di sekolah kami." />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {GALLERY.map((src, i) => (
            <div key={i} className="mb-4 overflow-hidden rounded-2xl border border-border bg-secondary break-inside-avoid">
              <img
                src={src}
                alt={`Galeri ${i + 1}`}
                loading="lazy"
                className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
