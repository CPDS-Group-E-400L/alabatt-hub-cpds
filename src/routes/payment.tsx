import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Page, Field, inputCls, btnCls, cardCls, Status, meta } from "@/components/Shell";
import { useStore, genTx } from "@/lib/store";

export const Route = createFileRoute("/payment")({
  head: () => meta("Payment Checkout", "Pay CPDS fees in Naira with auto-generated transaction IDs."),
  component: Pay,
});

function Pay() {
  const { payments, setPayments, pendingPayment, setPendingPayment, setEvents } = useStore();
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [txId, setTxId] = useState("");
  useEffect(() => {
    setTxId(genTx());
    if (pendingPayment) { setPurpose(pendingPayment.purpose); setAmount(String(pendingPayment.amount)); }
  }, [pendingPayment]);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose || !amount) { toast.error("Enter purpose and amount"); return; }
    setPayments([{ txId, purpose, amount: Number(amount), status: "Pending" }, ...payments]);
    if (pendingPayment?.eventId) setEvents((ev) => ev.map((x) => x.id === pendingPayment.eventId ? { ...x, registered: x.registered + 1 } : x));
    setPendingPayment(null); setPurpose(""); setAmount(""); setTxId(genTx());
    toast.success("Payment initiated — status Pending");
  };
  const confirm = (id: string) => setPayments(payments.map((p) => p.txId === id ? { ...p, status: "Confirmed" } : p));
  return (
    <Page title="Payment Checkout" intro="All amounts in Nigerian Naira (NGN).">
      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={submit} className={`${cardCls} space-y-4`}>
          <Field label="Transaction ID (auto)" id="t"><input id="t" readOnly className={`${inputCls} bg-muted font-mono`} value={txId} /></Field>
          <Field label="Purpose" id="p"><input id="p" className={inputCls} value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Journal processing fee" /></Field>
          <Field label="Amount (₦)" id="a"><input id="a" type="number" min="0" className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value)} /></Field>
          <button className={btnCls}>Pay ₦{Number(amount || 0).toLocaleString()}</button>
        </form>
        <div className={`${cardCls} overflow-x-auto`}>
          <h2 className="font-bold text-primary">Transactions</h2>
          <table className="mt-4 w-full text-sm">
            <thead><tr className="text-left border-b border-border"><th className="py-2">ID</th><th>Purpose</th><th>₦</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.txId} className="border-b border-border">
                  <td className="py-2 font-mono text-xs">{p.txId}</td><td>{p.purpose}</td><td>{p.amount.toLocaleString()}</td><td><Status s={p.status} /></td>
                  <td>{p.status === "Pending" && <button onClick={() => confirm(p.txId)} className="text-xs font-semibold text-primary underline">Confirm</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
