import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Download, FolderOpen, Search, File, Image, FileSignature } from "lucide-react";
import { Input } from "@/components/ui/input";

const docStats = [
  { label: "Total Documents", value: "124", icon: FileText, gradient: "stat-card-gradient" },
  { label: "Pending Signatures", value: "5", icon: FileSignature, gradient: "accent-gradient" },
  { label: "Recent Uploads", value: "8", icon: Upload, gradient: "info-gradient" },
];

const documents = [
  { name: "Employment Contract - Chioma Eze", type: "Contract", size: "245 KB", uploaded: "2026-02-15", category: "Contracts", icon: File },
  { name: "Company Policy Handbook v3", type: "Policy", size: "1.2 MB", uploaded: "2026-01-20", category: "Policies", icon: FileText },
  { name: "Adebayo Johnson - ID Card", type: "ID Document", size: "120 KB", uploaded: "2026-02-10", category: "ID Documents", icon: Image },
  { name: "Q1 Performance Review Template", type: "Template", size: "85 KB", uploaded: "2026-01-05", category: "Templates", icon: FileText },
  { name: "Loan Agreement - Tunde Bello", type: "Agreement", size: "198 KB", uploaded: "2026-02-01", category: "Agreements", icon: FileSignature },
  { name: "Tax Certificate 2025 - All Staff", type: "Tax Form", size: "340 KB", uploaded: "2026-01-15", category: "Tax", icon: File },
];

const folders = [
  { name: "Contracts", count: 32, icon: FolderOpen },
  { name: "Policies", count: 15, icon: FolderOpen },
  { name: "ID Documents", count: 48, icon: FolderOpen },
  { name: "Tax Forms", count: 18, icon: FolderOpen },
  { name: "Performance Reviews", count: 11, icon: FolderOpen },
];

export default function Documents() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Documents</h2>
          <p className="text-muted-foreground">Manage employee contracts, policies, and records</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Upload className="w-4 h-4" /> Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {docStats.map((s) => (
          <Card key={s.label} className="p-5 border-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.gradient} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Folders sidebar */}
        <Card className="p-4 border-0 shadow-sm">
          <h3 className="font-semibold text-foreground mb-3">Folders</h3>
          <div className="space-y-1">
            {folders.map((f) => (
              <button key={f.name} className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors text-sm">
                <div className="flex items-center gap-2">
                  <f.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{f.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{f.count}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Documents list */}
        <Card className="col-span-3 border-0 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-10" />
            </div>
          </div>
          <div className="divide-y divide-border">
            {documents.map((doc, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <doc.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.type} · {doc.size} · {doc.uploaded}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
