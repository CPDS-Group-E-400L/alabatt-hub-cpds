import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, cardCls, meta } from "@/components/Shell";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  head: () => meta("Dashboard", "Live KPIs for CPDS users, reviews, events and payments."),
  component: D,
});

function D() {
  const { users, journals, events, payments } = useStore();
  const confirmed = payments.filter((p) => p.status === "Confirmed").reduce((a, p) => a + p.amount, 0);
  const kpis = [
    ["Total Users", users.length, "/registration"],
    ["Reviews", journals.filter((j) => j.status === "Under Review").length + " / " + journals.length, "/journal"],
    ["Events", events.length, "/events"],
    ["Payments", `₦${confirmed.toLocaleString()}`, "/payment"],
  ] as const;
  return (
    <Page title="Dashboard" intro="Live figures from all modules this session.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(([l, v, to]) => (
          <Link key={l} to={to} className={`${cardCls} border-l-4 border-l-gold hover:shadow-md`}>
            <p className="text-sm text-muted-foreground">{l}</p>
            <p className="mt-2 text-3xl font-extrabold text-primary">{v}</p>
          </Link>
        ))}
      </div>
      <div className={`${cardCls} mt-8`}>
        <h2 className="font-bold text-primary">Event Attendance</h2>
        <ul className="mt-4 space-y-3">
          {events.map((e) => (
            <li key={e.id} className="text-sm">
              <div className="flex justify-between"><span>{e.title}</span><span>{e.registered}/{e.capacity}</span></div>
              <div className="mt-1 h-2 rounded bg-muted"><div className="h-2 rounded bg-primary" style={{ width: `${(e.registered / e.capacity) * 100}%` }} /></div>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}
