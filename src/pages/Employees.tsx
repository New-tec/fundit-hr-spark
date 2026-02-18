import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone } from "lucide-react";
import { useState } from "react";

const employees = [
  { id: 1, name: "Adebayo Johnson", email: "adebayo@fundit.com.ng", role: "Finance Analyst", department: "Finance", client: "FUNDiT", status: "Active", joined: "2024-03-15" },
  { id: 2, name: "Chioma Eze", email: "chioma@client1.com", role: "Marine Engineer", department: "Operations", client: "Oil & Marine Co", status: "Active", joined: "2026-01-20" },
  { id: 3, name: "Tunde Bello", email: "tunde@client2.com", role: "Energy Consultant", department: "Consulting", client: "Energy Solutions", status: "Active", joined: "2025-06-01" },
  { id: 4, name: "Fatima Yusuf", email: "fatima@fundit.com.ng", role: "HR Coordinator", department: "HR", client: "FUNDiT", status: "On Leave", joined: "2024-08-10" },
  { id: 5, name: "Emeka Obi", email: "emeka@client1.com", role: "Safety Officer", department: "HSE", client: "Oil & Marine Co", status: "Active", joined: "2025-02-14" },
  { id: 6, name: "Grace Adeyemi", email: "grace@client2.com", role: "Property Manager", department: "Real Estate", client: "Energy Solutions", status: "Active", joined: "2025-09-03" },
  { id: 7, name: "Ibrahim Musa", email: "ibrahim@fundit.com.ng", role: "Credit Analyst", department: "Finance", client: "FUNDiT", status: "Active", joined: "2024-11-20" },
  { id: 8, name: "Ngozi Okwu", email: "ngozi@client1.com", role: "Logistics Lead", department: "Supply Chain", client: "Oil & Marine Co", status: "Probation", joined: "2026-01-05" },
];

export default function Employees() {
  const [search, setSearch] = useState("");
  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Employees</h2>
          <p className="text-muted-foreground">Manage employees across all client companies</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> Add Employee
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <div className="p-4 flex items-center gap-3 border-b border-border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search employees or clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Client Company</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full stat-card-gradient flex items-center justify-center shrink-0">
                        <span className="text-primary-foreground text-xs font-semibold">
                          {emp.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{emp.role}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{emp.client}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={emp.status === "Active" ? "default" : emp.status === "On Leave" ? "secondary" : "outline"}
                      className={
                        emp.status === "Active"
                          ? "bg-success/10 text-success border-0 hover:bg-success/10"
                          : emp.status === "On Leave"
                          ? "bg-warning/10 text-warning border-0 hover:bg-warning/10"
                          : ""
                      }
                    >
                      {emp.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{emp.joined}</td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 rounded hover:bg-secondary transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
