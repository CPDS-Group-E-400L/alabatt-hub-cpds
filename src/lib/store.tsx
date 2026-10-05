import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "Researcher" | "Student" | "Admin" | "NGO Partner";
export type User = { id: number; name: string; email: string; matric: string; role: Role };
export type Payment = { txId: string; purpose: string; amount: number; status: "Pending" | "Confirmed" };
export type Journal = { id: number; title: string; abstract: string; keywords: string; file: string; status: "Submitted" | "Under Review" | "Accepted" };
export type Event = { id: number; title: string; date: string; venue: string; capacity: number; fee: number; registered: number };
export type Ngo = { id: number; name: string; focus: string; contact: string };
export type Resource = { id: number; title: string; by: string };

export const genTx = () => "CPDS-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(Math.random() * 1000);

function useHub() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Godwin Ochechema Adoyi", email: "godwin@bsum.edu.ng", matric: "BSU/SC/CMP/22/65163", role: "Student" },
    { id: 2, name: "Dr. Mary Iorkyaa", email: "mary@bsum.edu.ng", matric: "STAFF/CPDS/014", role: "Researcher" },
  ]);
  const [payments, setPayments] = useState<Payment[]>([
    { txId: "CPDS-SEED-001", purpose: "Peace Summit 2026", amount: 5000, status: "Confirmed" },
  ]);
  const [journals, setJournals] = useState<Journal[]>([
    { id: 1, title: "Conflict Resolution in Benue Farming Communities", abstract: "A study of mediation...", keywords: "peace, agriculture", file: "paper.pdf", status: "Under Review" },
  ]);
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: "Peace Summit 2026", date: "2026-11-12", venue: "CPDS Auditorium", capacity: 200, fee: 5000, registered: 54 },
    { id: 2, title: "Youth & Development Workshop", date: "2026-11-28", venue: "Senate Hall", capacity: 80, fee: 2000, registered: 31 },
    { id: 3, title: "Research Methods Seminar", date: "2026-12-05", venue: "Faculty of Science LT", capacity: 120, fee: 0, registered: 12 },
  ]);
  const [ngos, setNgos] = useState<Ngo[]>([
    { id: 1, name: "Benue Peace Initiative", focus: "Conflict mediation", contact: "info@bpi.org" },
    { id: 2, name: "Hope for Makurdi", focus: "Humanitarian relief", contact: "hello@hfm.ng" },
  ]);
  const [resources, setResources] = useState<Resource[]>([
    { id: 1, title: "Community Dialogue Toolkit (PDF)", by: "Benue Peace Initiative" },
  ]);
  const [pendingPayment, setPendingPayment] = useState<{ purpose: string; amount: number; eventId?: number } | null>(null);
  return { users, setUsers, payments, setPayments, journals, setJournals, events, setEvents, ngos, setNgos, resources, setResources, pendingPayment, setPendingPayment };
}

const Ctx = createContext<ReturnType<typeof useHub> | null>(null);
export function HubProvider({ children }: { children: ReactNode }) {
  return <Ctx.Provider value={useHub()}>{children}</Ctx.Provider>;
}
export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("no store");
  return c;
}
