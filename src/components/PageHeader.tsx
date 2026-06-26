interface Props {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-[var(--gradient-hero)] text-primary-foreground">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_40%),radial-gradient(circle_at_80%_60%,white_0,transparent_40%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-primary-foreground/85 sm:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
