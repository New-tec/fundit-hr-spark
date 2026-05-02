import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload } from "lucide-react";

const documents = [
  { name: "Employment Contract.pdf", type: "Contract", size: "245 KB", date: "Mar 15, 2022" },
  { name: "Offer Letter.pdf", type: "Onboarding", size: "180 KB", date: "Mar 1, 2022" },
  { name: "Employee Handbook 2026.pdf", type: "Policy", size: "1.2 MB", date: "Jan 5, 2026" },
  { name: "Tax ID (TIN) Document.pdf", type: "Personal", size: "95 KB", date: "Apr 12, 2022" },
  { name: "Bank Verification Letter.pdf", type: "Personal", size: "120 KB", date: "Mar 20, 2022" },
  { name: "Performance Review 2025.pdf", type: "Performance", size: "320 KB", date: "Dec 18, 2025" },
];

export default function MyDocuments() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-foreground">My Documents</h2>
          <p className="text-sm text-muted-foreground">Access and upload your personal documents</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" /> Upload Document
        </Button>
      </div>

      <Card className="p-5 border-0 shadow-sm">
        <div className="space-y-2">
          {documents.map((d) => (
            <div
              key={d.name}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {d.type} · {d.size} · {d.date}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
