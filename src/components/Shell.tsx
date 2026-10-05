import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const nav = [
  ["/", "Home"], ["/registration", "Registration"], ["/payment", "Payment"], ["/journal", "Journal"],
  ["/events", "Events"], ["/ngo", "NGO"], ["/members", "Members"], ["/team", "Team"], ["/dashboard", "Dashboard"],
] as const;

function Brand() {
  return (
    <div className="leading-tight">
      <p className="font-bold text-sm sm:text-base">Rev. Fr. Moses Orshio Adasu University Makurdi</p>
      <p className="text-xs sm:text-sm">Centre for Peace and Development Studies (CPDS) | <span className="text-gold font-semibold">ALABATT-HUB</span></p>
      <p className="text-xs opacity-90">Developed by Maths and Computer Science Department Group E 400L</p>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-start justify-between gap-4">
        <Brand />
        <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="lg:hidden rounded border border-primary-foreground/40 px-3 py-1 text-sm">Menu</button>
      </div>
      <nav aria-label="Main" className={`${open ? "block" : "hidden"} lg:block border-t border-primary-foreground/15`}>
        <ul className="mx-auto max-w-7xl px-4 flex flex-col lg:flex-row lg:gap-1 py-2">
          {nav.map(([to, label]) => (
            <li key={to}>
              <Link to={to} onClick={() => setOpen(false)} activeOptions={{ exact: true }}
                className="block rounded px-3 py-2 text-sm font-medium hover:bg-primary-foreground/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                activeProps={{ className: "bg-gold text-gold-foreground hover:bg-gold" }}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center flex flex-col items-center gap-2">
        <Brand />
        <p className="text-xs opacity-75 mt-2">© 2026 ALABATT-HUB. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function Page({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-primary">{title}</h1>
      {intro && <p className="mt-2 text-muted-foreground max-w-2xl">{intro}</p>}
      <div className="mt-8">{children}</div>
    </main>
  );
}

export const inputCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary";
export const btnCls = "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50";
export const goldBtnCls = "inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 font-bold text-gold-foreground hover:bg-gold/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground";
export const cardCls = "rounded-lg border border-border bg-card p-6 shadow-sm";

export function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

export function Status({ s }: { s: string }) {
  const c = s === "Confirmed" || s === "Accepted" ? "bg-chart-2/15 text-chart-2" : s === "Under Review" ? "bg-chart-3/15 text-chart-3" : "bg-gold/25 text-gold-foreground";
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${c}`}>{s}</span>;
}

export function meta(title: string, description: string) {
  const siteTitle = "ALABATT-HUB | CPDS - Rev. Fr. Moses Orshio Adasu University";
  return {
    meta: [
      { title: siteTitle },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — ALABATT-HUB` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}
