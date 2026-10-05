import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Page, Field, inputCls, btnCls, cardCls, Status, meta } from "@/components/Shell";
import { useStore, type Journal } from "@/lib/store";

export const Route = createFileRoute("/journal")({
  head: () => meta("Journal Submission", "Submit research papers to the CPDS journal and track review status."),
  component: J,
});

const steps: Journal["status"][] = ["Submitted", "Under Review", "Accepted"];

function J() {
  const { journals, setJournals } = useStore();
  const [f, setF] = useState({ title: "", abstract: "", keywords: "", file: "" });
  const [key, setKey] = useState(0);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.title || !f.abstract || !f.file) { toast.error("Title, abstract and PDF are required"); return; }
    setJournals([{ id: Date.now(), ...f, status: "Submitted" }, ...journals]);
    setF({ title: "", abstract: "", keywords: "", file: "" }); setKey(key + 1);
    toast.success("Manuscript submitted");
  };
  const advance = (id: number) => setJournals(journals.map((j) => j.id === id ? { ...j, status: steps[Math.min(steps.indexOf(j.status) + 1, 2)]! } : j));
  return (
    <Page title="Journal Submission" intro="Submit a manuscript and follow its progress.">
      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={submit} className={`${cardCls} space-y-4`}>
          <Field label="Title" id="t"><input id="t" className={inputCls} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></Field>
          <Field label="Abstract" id="a"><textarea id="a" rows={4} className={inputCls} value={f.abstract} onChange={(e) => setF({ ...f, abstract: e.target.value })} /></Field>
          <Field label="Keywords (comma separated)" id="k"><input id="k" className={inputCls} value={f.keywords} onChange={(e) => setF({ ...f, keywords: e.target.value })} /></Field>
          <Field label="PDF Upload" id="f"><input key={key} id="f" type="file" accept="application/pdf" className={inputCls} onChange={(e) => setF({ ...f, file: e.target.files?.[0]?.name ?? "" })} /></Field>
          <button className={btnCls}>Submit Manuscript</button>
        </form>
        <div className={cardCls}>
          <h2 className="font-bold text-primary">Tracking</h2>
          <ul className="mt-4 space-y-4">
            {journals.map((j) => (
              <li key={j.id} className="border-b border-border pb-4">
                <div className="flex justify-between gap-2"><p className="font-semibold">{j.title}</p><Status s={j.status} /></div>
                <p className="text-xs text-muted-foreground">{j.keywords} · {j.file}</p>
                <div className="mt-2 flex gap-1" aria-label={`Progress: ${j.status}`}>
                  {steps.map((s, i) => <div key={s} className={`h-2 flex-1 rounded ${i <= steps.indexOf(j.status) ? "bg-primary" : "bg-muted"}`} />)}
                </div>
                {j.status !== "Accepted" && <button onClick={() => advance(j.id)} className="mt-2 text-xs font-semibold text-primary underline">Advance status (reviewer)</button>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  );
}
