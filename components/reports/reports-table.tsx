"use client";

import { useState, useTransition } from "react";
import { deleteReport } from "@/app/actions/reports";
import { toast } from "sonner";
import { Trash2, Search, Filter, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

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

const statusColors: Record<string, { bg: string; color: string }> = {
  Pendente: { bg: "rgba(234,179,8,0.15)", color: "#eab308" },
  "Em Andamento": { bg: "rgba(59,130,246,0.15)", color: "#3b82f6" },
  Concluído: { bg: "rgba(34,197,94,0.15)", color: "#22c55e" },
  Suspenso: { bg: "rgba(249,115,22,0.15)", color: "#f97316" },
  Arquivado: { bg: "rgba(107,114,128,0.15)", color: "#9ca3af" },
};

const priorityColors: Record<string, string> = {
  Baixa: "#22c55e",
  Normal: "#3b82f6",
  Alta: "#f97316",
  Crítica: "#ef4444",
};

const statusOptions = ["all", "Pendente", "Em Andamento", "Concluído", "Suspenso", "Arquivado"];

const PAGE_SIZE = 8;

interface ReportsTableProps {
  reports: Report[];
}

export function ReportsTable({ reports }: ReportsTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const filtered = reports.filter((r) => {
    const matchSearch =
      !search ||
      r.equipment.toLowerCase().includes(search.toLowerCase()) ||
      r.problem.toLowerCase().includes(search.toLowerCase()) ||
      (r.location ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este relatório?")) return;
    startTransition(async () => {
      const result = await deleteReport(id);
      if (result.success) toast.success("Relatório excluído!");
      else toast.error(result.error);
    });
  };

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const handleStatus = (v: string) => { setStatusFilter(v); setPage(1); };

  return (
    <div className="table-wrapper">
      {/* Filters */}
      <div className="table-filters">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por equipamento, problema ou local..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
            id="reports-search"
          />
        </div>
        <div className="filter-box">
          <Filter size={15} />
          <select
            value={statusFilter}
            onChange={(e) => handleStatus(e.target.value)}
            className="filter-select"
            id="reports-status-filter"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s === "all" ? "Todos os Status" : s}</option>
            ))}
          </select>
        </div>
        <span className="table-count">{filtered.length} registro{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      <div className="table-scroll">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Equipamento</th>
              <th>Local</th>
              <th>Status</th>
              <th>Prioridade</th>
              <th>Responsável</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="table-empty">
                  <div>
                    <p style={{ fontSize: "2rem", marginBottom: "8px" }}>📋</p>
                    <p>Nenhum relatório encontrado</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((r) => (
                <>
                  <tr key={r.id} className="table-row">
                    <td className="table-cell">
                      <span className="cell-date">
                        {new Date(r.date).toLocaleDateString("pt-BR")}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className="cell-equipment">{r.equipment}</span>
                    </td>
                    <td className="table-cell">
                      <span className="cell-muted">{r.location || "—"}</span>
                    </td>
                    <td className="table-cell">
                      <span
                        className="status-badge"
                        style={{
                          background: statusColors[r.status]?.bg,
                          color: statusColors[r.status]?.color,
                          border: `1px solid ${statusColors[r.status]?.color}44`,
                        }}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className="priority-dot" style={{ background: priorityColors[r.priority] }} />
                      <span className="cell-muted">{r.priority}</span>
                    </td>
                    <td className="table-cell">
                      <span className="cell-muted">{r.user.name || r.user.email}</span>
                    </td>
                    <td className="table-cell table-actions">
                      <button
                        className="action-btn view"
                        title="Ver detalhes"
                        onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        className="action-btn delete"
                        title="Excluir"
                        onClick={() => handleDelete(r.id)}
                        disabled={pending}
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                  {expanded === r.id && (
                    <tr key={`${r.id}-detail`} className="table-expanded">
                      <td colSpan={7}>
                        <div className="expanded-content">
                          <div className="expanded-block">
                            <p className="expanded-label">🔴 Problema</p>
                            <p className="expanded-text">{r.problem}</p>
                          </div>
                          <div className="expanded-block">
                            <p className="expanded-label">✅ Solução</p>
                            <p className="expanded-text">{r.solution}</p>
                          </div>
                          {r.notes && (
                            <div className="expanded-block">
                              <p className="expanded-label">📝 Observações</p>
                              <p className="expanded-text">{r.notes}</p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft size={16} /> Anterior
          </button>
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`page-num ${page === p ? "active" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            className="page-btn"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Próxima <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
