import { createFileRoute } from "@tanstack/react-router";
import { Page, cardCls, meta } from "@/components/Shell";

export const Route = createFileRoute("/team")({
  head: () => meta("Team — Group E 400L", "The Maths and Computer Science Group E 400L students who built ALABATT-HUB."),
  component: T,
});

const team = [
  ["BSU/SC/CMP/22/65163", "Godwin Ochechema Adoyi"], ["BSU/SC/CMP/22/65164", "Edache James Adoyi"],
  ["BSU/SC/CMP/22/65165", "William Ochoyebo Agada"], ["BSU/SC/CMP/22/67001", "Sefa Stephen Hyuma"],
  ["BSU/SC/CMP/22/65167", "Adakole Francis Agbaji"], ["BSU/SC/CMP/22/65168", "Aondosoo Stephen Agbemji"],
  ["BSU/SC/CMP/22/65169", "Victor Ochefije Agbiti"], ["BSU/SC/CMP/22/65170", "Peter Inalegwu Agbo"],
  ["BSU/SC/CMP/22/65171", "Joseph Ejembi Agbo"], ["BSU/SC/CMP/22/65172", "Michael Onoja Agbo"],
  ["BSU/SC/CMP/22/65173", "Jason Kator Ageba"], ["BSU/SC/CMP/22/65174", "Terseer Erikson Ageva"],
  ["BSU/SC/CMP/22/65151", "Meshack Ondujum Abba"], ["BSU/ED/CED/22/63628", "Adeka Joseph Adeka"],
  ["BSU/SC/CMP/22/66998", "Blessing Iverline Ange"], ["BSU/SC/CMP/22/65152", "Shagbaor Emmanuel Abeh"],
  ["BSU/SC/CMP/22/65229", "Sughter Abraham Hian"], ["BSU/SC/CMP/22/65150", "Elias John Abakpa"],
  ["BSU/SC/CMP/22/65291", "Joshua Adamowoicho Ochijele"], ["BSU/SC/CMP/21/61151", "Thomas Torkuma Bem"],
];

function T() {
  return (
    <Page title="Project Team" intro="Maths and Computer Science Department — Group E, 400 Level.">
      <div className={`${cardCls} p-0 overflow-x-auto`}>
        <table className="w-full text-sm">
          <caption className="sr-only">Group E team members</caption>
          <thead className="bg-primary text-primary-foreground"><tr><th scope="col" className="px-4 py-3 text-left">S/N</th><th scope="col" className="px-4 py-3 text-left">Matric Number</th><th scope="col" className="px-4 py-3 text-left">Name</th></tr></thead>
          <tbody>
            {team.map(([m, n], i) => (
              <tr key={m} className="border-b border-border even:bg-muted">
                <td className="px-4 py-2">{i + 1}</td><td className="px-4 py-2 font-mono">{m}</td><td className="px-4 py-2">{n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}
