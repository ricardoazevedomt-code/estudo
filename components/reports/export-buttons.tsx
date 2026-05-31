"use client";

import { FileDown, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

type Report = {
  id: string;
  date: Date;
  equipment: string;
  location: string | null;
  problem: string;
  solution: string;
  status: string;
  priority: string;
  notes: string | null;
  createdAt: Date;
  user: { name: string | null; email: string | null };
};

interface ExportButtonsProps {
  reports: Report[];
}

export function ExportButtons({ reports }: ExportButtonsProps) {
  const exportPDF = async () => {
    try {
      const { default: jsPDF } = await import("jspdf");
      const { default: autoTable } = await import("jspdf-autotable");

      const doc = new jsPDF({ orientation: "landscape" });

      doc.setFontSize(18);
      doc.setTextColor(30, 30, 50);
      doc.text("Relatórios de Manutenção", 14, 18);

      doc.setFontSize(10);
      doc.setTextColor(120, 120, 140);
      doc.text(`Gerado em: ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`, 14, 26);
      doc.text(`Total de registros: ${reports.length}`, 14, 32);

      autoTable(doc, {
        startY: 38,
        head: [["Data", "Equipamento", "Local", "Problema", "Solução", "Status", "Prioridade", "Responsável"]],
        body: reports.map((r) => [
          new Date(r.date).toLocaleDateString("pt-BR"),
          r.equipment,
          r.location || "—",
          r.problem.slice(0, 60) + (r.problem.length > 60 ? "..." : ""),
          r.solution.slice(0, 60) + (r.solution.length > 60 ? "..." : ""),
          r.status,
          r.priority,
          r.user.name || r.user.email || "—",
        ]),
        headStyles: {
          fillColor: [30, 30, 50],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 9,
        },
        bodyStyles: { fontSize: 8, textColor: [40, 40, 60] },
        alternateRowStyles: { fillColor: [245, 245, 252] },
        styles: { cellPadding: 3 },
      });

      doc.save(`relatorios-manutencao-${new Date().toISOString().split("T")[0]}.pdf`);
      toast.success("PDF exportado com sucesso!");
    } catch (e) {
      console.error(e);
      toast.error("Erro ao exportar PDF");
    }
  };

  const exportExcel = async () => {
    try {
      const XLSX = await import("xlsx");

      const data = reports.map((r) => ({
        Data: new Date(r.date).toLocaleDateString("pt-BR"),
        Equipamento: r.equipment,
        Local: r.location || "",
        Problema: r.problem,
        Solução: r.solution,
        Status: r.status,
        Prioridade: r.priority,
        Responsável: r.user.name || r.user.email || "",
        Observações: r.notes || "",
        "Criado em": new Date(r.createdAt).toLocaleDateString("pt-BR"),
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();

      // Column widths
      ws["!cols"] = [
        { wch: 12 }, { wch: 20 }, { wch: 16 }, { wch: 40 },
        { wch: 40 }, { wch: 14 }, { wch: 12 }, { wch: 20 },
        { wch: 30 }, { wch: 12 },
      ];

      XLSX.utils.book_append_sheet(wb, ws, "Manutenções");
      XLSX.writeFile(wb, `relatorios-manutencao-${new Date().toISOString().split("T")[0]}.xlsx`);
      toast.success("Excel exportado com sucesso!");
    } catch (e) {
      console.error(e);
      toast.error("Erro ao exportar Excel");
    }
  };

  return (
    <div className="export-buttons">
      <button onClick={exportPDF} className="export-btn pdf" id="export-pdf-btn">
        <FileDown size={16} />
        Exportar PDF
      </button>
      <button onClick={exportExcel} className="export-btn excel" id="export-excel-btn">
        <FileSpreadsheet size={16} />
        Exportar Excel
      </button>
    </div>
  );
}
