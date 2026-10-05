import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Page, Field, inputCls, btnCls, cardCls, meta } from "@/components/Shell";
import { useStore, type Role } from "@/lib/store";

export const Route = createFileRoute("/registration")({
  head: () => meta("Registration", "Register as a researcher, student, admin or NGO partner on ALABATT-HUB."),
  component: Reg,
});

function Reg() {
  const { users, setUsers } = useStore();
  const [f, setF] = useState({ name: "", email: "", matric: "", role: "Student" as Role });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name || !f.email || !f.matric) return toast.error("Please fill all fields");
    setUsers([...users, { id: Date.now(), ...f }]);
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
          <button className={btnCls}>Register</button>
        </form>
        <div className={cardCls}>
          <h2 className="font-bold text-primary">Registered Users ({users.length})</h2>
          <ul className="mt-4 divide-y divide-border">
            {users.map((u) => (
              <li key={u.id} className="py-2 text-sm"><span className="font-semibold">{u.name}</span> · {u.matric}<br /><span className="text-muted-foreground">{u.email} — {u.role}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  );
}
