import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { cardCls, goldBtnCls, meta } from "@/components/Shell";

export const Route = createFileRoute("/")({
  head: () => meta("Unifying CPDS Operations", "ALABATT-HUB unifies registration, payments, journals, events and NGO partnerships for CPDS, Rev. Fr. Moses Orshio Adasu University Makurdi."),
  component: Home,
});

const modules = [
  ["/registration", "Registration", "Enrol researchers, students, admins and NGO partners."],
  ["/payment", "Payment", "Checkout in NGN with auto transaction IDs and status."],
  ["/journal", "Journal", "Submit papers and track review progress."],
  ["/events", "Events", "Browse and register for CPDS events."],
  ["/ngo", "NGO Directory", "Partner organisations, partnership form and resources."],
  ["/dashboard", "Dashboard", "Live KPIs across every module."],
] as const;

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="University campus at sunset" width={1600} height={800} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-primary/80" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:py-32 text-primary-foreground">
          <h1 className="text-4xl sm:text-6xl font-extrabold max-w-3xl">ALABATT-HUB <span className="text-gold">—</span> Unifying CPDS Operations</h1>
          <p className="mt-6 max-w-2xl text-lg">Transforming the Centre for Peace and Development Studies from scattered paperwork into one digital hub for people, payments, research, events and partnerships.</p>
          <a href="#modules" className={`${goldBtnCls} mt-8`}>Explore Modules</a>
        </div>
      </section>
      <section id="modules" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold text-primary">Modules</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map(([to, t, d]) => (
            <Link key={to} to={to} className={`${cardCls} border-t-4 border-t-gold hover:shadow-md transition-shadow`}>
              <h3 className="font-bold text-lg text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-primary underline">Open →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
