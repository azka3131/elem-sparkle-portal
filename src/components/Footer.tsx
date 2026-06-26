import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/school-logo.png";
import { FOOTER_LINKS, SCHOOL } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-10" width={40} height={40} />
            <span className="font-display font-bold text-primary">{SCHOOL.name}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Sekolah dasar modern yang menumbuhkan rasa ingin tahu, karakter, dan kreativitas setiap anak sejak dini.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Navigasi Cepat</h4>
          <ul className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
            {FOOTER_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground hover:text-primary">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Kontak</h4>
          <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{SCHOOL.address}</span></li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{SCHOOL.phone}</span></li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{SCHOOL.email}</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Ikuti Kami</h4>
          <div className="mt-3 flex gap-2">
            {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-9 w-9 place-items-center rounded-full bg-background text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Jam operasional: {SCHOOL.hours}</p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {SCHOOL.name}. Hak cipta dilindungi undang-undang.
        </div>
      </div>
    </footer>
  );
}
