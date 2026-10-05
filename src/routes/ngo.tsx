import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Page, Field, inputCls, btnCls, cardCls, meta } from "@/components/Shell";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/ngo")({
  head: () => meta("NGO Directory", "CPDS partner NGOs, partnership requests and shared resources."),
  component: N,
});

function N() {
  const { ngos, setNgos, resources, setResources } = useStore();
  const [f, setF] = useState({ name: "", focus: "", contact: "" });
  const [r, setR] = useState({ title: "", by: "" });
  return (
    <Page title="NGO Directory" intro="Partners working with CPDS for peace and development.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ngos.map((n) => (
          <div key={n.id} className={cardCls}><h2 className="font-bold text-primary">{n.name}</h2><p className="text-sm">{n.focus}</p><p className="text-sm text-muted-foreground">{n.contact}</p></div>
        ))}
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <form className={`${cardCls} space-y-4`} onSubmit={(e) => {
          e.preventDefault();
          if (!f.name || !f.focus || !f.contact) return toast.error("Fill all fields");
          setNgos([...ngos, { id: Date.now(), ...f }]); setF({ name: "", focus: "", contact: "" }); toast.success("Partnership request added");
        }}>
          <h2 className="font-bold text-primary">Partnership Form</h2>
          <Field label="Organisation Name" id="on"><input id="on" className={inputCls} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
          <Field label="Focus Area" id="of"><input id="of" className={inputCls} value={f.focus} onChange={(e) => setF({ ...f, focus: e.target.value })} /></Field>
          <Field label="Contact Email" id="oc"><input id="oc" type="email" className={inputCls} value={f.contact} onChange={(e) => setF({ ...f, contact: e.target.value })} /></Field>
          <button className={btnCls}>Submit Partnership</button>
        </form>
        <div className={`${cardCls} space-y-4`}>
          <h2 className="font-bold text-primary">Resource Board</h2>
          <ul className="divide-y divide-border text-sm">{resources.map((x) => <li key={x.id} className="py-2"><span className="font-semibold">{x.title}</span> — {x.by}</li>)}</ul>
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => {
            e.preventDefault(); if (!r.title) return toast.error("Enter a title");
            setResources([...resources, { id: Date.now(), title: r.title, by: r.by || "Anonymous" }]); setR({ title: "", by: "" }); toast.success("Resource posted");
          }}>
            <input aria-label="Resource title" placeholder="Resource title" className={inputCls} value={r.title} onChange={(e) => setR({ ...r, title: e.target.value })} />
            <input aria-label="Posted by" placeholder="Posted by" className={inputCls} value={r.by} onChange={(e) => setR({ ...r, by: e.target.value })} />
            <button className={btnCls}>Post</button>
          </form>
        </div>
      </div>
    </Page>
  );
}
