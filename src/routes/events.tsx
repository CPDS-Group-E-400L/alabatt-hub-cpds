import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Page, btnCls, cardCls, meta } from "@/components/Shell";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/events")({
  head: () => meta("Events", "Upcoming CPDS seminars, summits and workshops."),
  component: Ev,
});

function Ev() {
  const { events, setEvents, setPendingPayment } = useStore();
  const nav = useNavigate();
  const register = (id: number) => {
    const e = events.find((x) => x.id === id)!;
    if (e.fee > 0) {
      setPendingPayment({ purpose: `Event: ${e.title}`, amount: e.fee, eventId: e.id });
      nav({ to: "/payment" });
    } else {
      setEvents(events.map((x) => x.id === id ? { ...x, registered: x.registered + 1 } : x));
      toast.success("Registered for free event");
    }
  };
  return (
    <Page title="Events" intro="Paid events take you straight to checkout.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((e) => {
          const full = e.registered >= e.capacity;
          return (
            <article key={e.id} className={`${cardCls} flex flex-col`}>
              <h2 className="font-bold text-lg text-primary">{e.title}</h2>
              <dl className="mt-3 space-y-1 text-sm flex-1">
                <div><dt className="inline font-medium">Date: </dt><dd className="inline">{new Date(e.date).toDateString()}</dd></div>
                <div><dt className="inline font-medium">Venue: </dt><dd className="inline">{e.venue}</dd></div>
                <div><dt className="inline font-medium">Capacity: </dt><dd className="inline">{e.registered}/{e.capacity}</dd></div>
                <div><dt className="inline font-medium">Fee: </dt><dd className="inline">{e.fee ? `₦${e.fee.toLocaleString()}` : "Free"}</dd></div>
              </dl>
              <button disabled={full} onClick={() => register(e.id)} className={`${btnCls} mt-4`}>{full ? "Full" : "Register"}</button>
            </article>
          );
        })}
      </div>
    </Page>
  );
}
