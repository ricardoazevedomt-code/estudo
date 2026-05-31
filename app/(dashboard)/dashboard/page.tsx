import { getDashboardStats } from "@/app/actions/reports";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Archive,
} from "lucide-react";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";

export const metadata = {
  title: "Dashboard | MaintTrack",
  description: "Visão geral do sistema de manutenção",
};

const statusIconMap: Record<string, { icon: typeof ClipboardList; color: "blue" | "green" | "yellow" | "red" | "purple" | "cyan" }> = {
  Pendente: { icon: Clock, color: "yellow" },
  "Em Andamento": { icon: AlertTriangle, color: "blue" },
  Concluído: { icon: CheckCircle2, color: "green" },
  Suspenso: { icon: XCircle, color: "red" },
  Arquivado: { icon: Archive, color: "cyan" },
};

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  if (!stats) {
    return <div className="dash-empty">Erro ao carregar dados.</div>;
  }

  const statusMap: Record<string, number> = {};
  stats.byStatus.forEach((s: { status: string; _count: { status: number } }) => {
    statusMap[s.status] = s._count.status;
  });

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Visão geral das manutenções registradas</p>
        </div>
        <div className="page-date">
          {new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* Top stat: total */}
      <div className="stats-grid">
        <StatCard
          title="Total de Relatórios"
          value={stats.total}
          subtitle="Todos os registros"
          icon={ClipboardList}
          color="purple"
        />
        {["Pendente", "Em Andamento", "Concluído", "Suspenso", "Arquivado"].map((s) => {
          const cfg = statusIconMap[s];
          return (
            <StatCard
              key={s}
              title={s}
              value={statusMap[s] ?? 0}
              icon={cfg.icon}
              color={cfg.color}
            />
          );
        })}
      </div>

      {/* Charts */}
      <DashboardCharts chartData={stats.chartData} byStatus={stats.byStatus} byPriority={stats.byPriority} />

      {/* Recent */}
      <div className="recent-section">
        <h2 className="section-heading">Registros Recentes</h2>
        <div className="recent-list">
          {stats.recentReports.map((r) => (
            <div key={r.id} className="recent-item">
              <div className="recent-icon">🔧</div>
              <div className="recent-info">
                <p className="recent-equipment">{r.equipment}</p>
                <p className="recent-meta">
                  {new Date(r.date).toLocaleDateString("pt-BR")} • {r.user.name || "—"}
                </p>
              </div>
              <span
                className="recent-status"
                style={{
                  background: r.status === "Concluído" ? "rgba(34,197,94,0.15)" : r.status === "Pendente" ? "rgba(234,179,8,0.15)" : "rgba(59,130,246,0.15)",
                  color: r.status === "Concluído" ? "#22c55e" : r.status === "Pendente" ? "#eab308" : "#3b82f6",
                }}
              >
                {r.status}
              </span>
            </div>
          ))}
          {stats.recentReports.length === 0 && (
            <p className="recent-empty">Nenhum relatório registrado ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
