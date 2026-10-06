import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Page, Field, inputCls, btnCls, cardCls, meta } from "@/components/Shell";
import { supabase } from "@/lib/supabase";
import type { Role } from "@/lib/store";

export const Route = createFileRoute("/registration")({
  head: () => meta("Registration", "Register as a researcher, student, admin or NGO partner on ALABATT-HUB."),
  component: Reg,
});

function Reg() {
  const [f, setF] = useState({ name: "", email: "", matric: "", role: "Student" as Role });
  const [busy, setBusy] = useState(false);
  // Public list: only name + role, read from the safe public_members view.
  const [members, setMembers] = useState<{ id: string | number; full_name: string; role: string }[]>([]);

  const loadMembers = () => {
    supabase.from("public_members").select("id, full_name, role").order("full_name").then(({ data }) => {
      setMembers(data ?? []);
    });
  };
  useEffect(loadMembers, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name || !f.email || !f.matric) { toast.error("Please fill all fields"); return; }
    setBusy(true);
    const normalizedEmail = f.email.trim().toLowerCase();
    const normalizedMatric = f.matric.trim().toUpperCase();
    const { error } = await supabase.from("users").insert({
      full_name: f.name.trim(),
      email: normalizedEmail,
      matric_number: normalizedMatric,
      role: f.role,
    });
    setBusy(false);
    if (error) {
      const duplicateDetail = `${error.message} ${error.details ?? ""}`.toLowerCase();
      if (error.code === "23505" && duplicateDetail.includes("matric")) {
        toast.error("Matric number already registered");
        return;
      }
      if (error.code === "23505" && duplicateDetail.includes("email")) {
        toast.error("Email already registered");
        return;
      }
      toast.error(`Registration failed: ${error.message}`);
      return;
    }
    loadMembers();
    setF({ name: "", email: "", matric: "", role: "Student" });
    toast.success("Registered successfully");
  };
  return (
    <Page title="Registration" intro="Create a CPDS account.">
      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={submit} className={`${cardCls} space-y-4`}>
          <Field label="Full Name" id="n"><input id="n" className={inputCls} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
          <Field label="Email" id="e"><input id="e" type="email" className={inputCls} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
          <Field label="Matric Number" id="m"><input id="m" className={inputCls} placeholder="BSU/SC/CMP/22/65165" value={f.matric} onChange={(e) => setF({ ...f, matric: e.target.value.toUpperCase() })} /></Field>
          <Field label="Role" id="r">
            <select id="r" className={inputCls} value={f.role} onChange={(e) => setF({ ...f, role: e.target.value as Role })}>
              {["Researcher", "Student", "Admin", "NGO Partner"].map((r) => <option key={r}>{r}</option>)}
            </select>
          </Field>
          <button className={btnCls} disabled={busy}>{busy ? "Registering…" : "Register"}</button>
        </form>
        <div className={cardCls}>
          <h2 className="font-bold text-primary">Registered Users ({members.length})</h2>
          <p className="mt-1 text-xs text-muted-foreground">Only names and roles are shown. Emails and matric numbers stay private.</p>
          <ul className="mt-4 divide-y divide-border">
            {members.map((u) => (
              <li key={u.id} className="py-2">
                <span className="block text-sm font-bold text-foreground">{u.full_name}</span>
                <span className="block text-xs text-muted-foreground">{u.role}</span>
              </li>
            ))}
            {members.length === 0 && <li className="py-2 text-sm text-muted-foreground">No members yet.</li>}
          </ul>
        </div>
      </div>
    </Page>
  );
}
