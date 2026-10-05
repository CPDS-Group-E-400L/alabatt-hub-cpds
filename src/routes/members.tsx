import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Page, cardCls, meta } from "@/components/Shell";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/members")({
  head: () => meta("Members", "Public directory of registered ALABATT-HUB members by name and role."),
  component: Members,
});

function Members() {
  const [rows, setRows] = useState<{ full_name: string; role: string }[]>([]);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  useEffect(() => {
    supabase.from("users").select("full_name, role").order("full_name").then(({ data, error }) => {
      if (error) { setState("error"); return; }
      setRows(data ?? []); setState("ok");
    });
  }, []);
  return (
    <Page title="Members" intro="Registered CPDS members. Contact details and matric numbers are kept private.">
      <div className={cardCls}>
        {state === "loading" && <p className="text-muted-foreground">Loading members…</p>}
        {state === "error" && <p className="text-destructive">Could not load members right now.</p>}
        {state === "ok" && (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left text-primary"><th className="py-2">S/N</th><th>Name</th><th>Role</th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-border"><td className="py-2">{i + 1}</td><td className="font-semibold">{r.full_name}</td><td>{r.role}</td></tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={3} className="py-4 text-muted-foreground">No members yet.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </Page>
  );
}
