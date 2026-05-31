"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const STATUS_COLORS: Record<string, string> = {
  Pendente: "#eab308",
  "Em Andamento": "#3b82f6",
  Concluído: "#22c55e",
  Suspenso: "#f97316",
  Arquivado: "#6b7280",
};

const PRIORITY_COLORS: Record<string, string> = {
  Baixa: "#22c55e",
  Normal: "#3b82f6",
  Alta: "#f97316",
  Crítica: "#ef4444",
};

interface DashboardChartsProps {
  chartData: { month: string; count: number }[];
  byStatus: { status: string; _count: { status: number } }[];
  byPriority: { priority: string; _count: { priority: number } }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#1c1c28",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "10px",
        padding: "10px 16px",
        color: "#f5f5f7",
        fontSize: "0.85rem",
      }}>
        <p style={{ fontWeight: 700, marginBottom: 4 }}>{label}</p>
        <p style={{ color: "#a855f7" }}>{payload[0].value} relatório(s)</p>
      </div>
    );
  }
  return null;
};

export function DashboardCharts({ chartData, byStatus, byPriority }: DashboardChartsProps) {
  const statusPieData = byStatus.map((s) => ({
    name: s.status,
    value: s._count.status,
    color: STATUS_COLORS[s.status] ?? "#6b7280",
  }));

  const priorityPieData = byPriority.map((p) => ({
    name: p.priority,
    value: p._count.priority,
    color: PRIORITY_COLORS[p.priority] ?? "#6b7280",
  }));

  return (
    <div className="charts-grid">
      {/* Bar chart */}
      <div className="chart-card">
        <h3 className="chart-title">Relatórios por Mês</h3>
        <p className="chart-subtitle">Últimos 6 meses</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: "#8b8b9b", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#8b8b9b", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Status pie */}
      <div className="chart-card">
        <h3 className="chart-title">Distribuição por Status</h3>
        <p className="chart-subtitle">Todos os registros</p>
        {statusPieData.length === 0 ? (
          <div className="chart-empty">Sem dados ainda</div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={statusPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                {statusPieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value} relatório(s)`, name]}
                contentStyle={{ background: "#1c1c28", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#f5f5f7", fontSize: "0.82rem" }}
              />
              <Legend
                formatter={(value) => <span style={{ color: "#b0b0c3", fontSize: "0.8rem" }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Priority pie */}
      <div className="chart-card">
        <h3 className="chart-title">Distribuição por Prioridade</h3>
        <p className="chart-subtitle">Todos os registros</p>
        {priorityPieData.length === 0 ? (
          <div className="chart-empty">Sem dados ainda</div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={priorityPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                {priorityPieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value} relatório(s)`, name]}
                contentStyle={{ background: "#1c1c28", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#f5f5f7", fontSize: "0.82rem" }}
              />
              <Legend
                formatter={(value) => <span style={{ color: "#b0b0c3", fontSize: "0.8rem" }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
