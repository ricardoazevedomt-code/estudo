"use client";

import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: "blue" | "green" | "yellow" | "red" | "purple" | "cyan";
  trend?: { value: number; label: string };
}

const colorMap = {
  blue: { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)", icon: "#3b82f6", glow: "0 0 20px rgba(59,130,246,0.2)" },
  green: { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", icon: "#22c55e", glow: "0 0 20px rgba(34,197,94,0.2)" },
  yellow: { bg: "rgba(234,179,8,0.12)", border: "rgba(234,179,8,0.3)", icon: "#eab308", glow: "0 0 20px rgba(234,179,8,0.2)" },
  red: { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)", icon: "#ef4444", glow: "0 0 20px rgba(239,68,68,0.2)" },
  purple: { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.3)", icon: "#a855f7", glow: "0 0 20px rgba(168,85,247,0.2)" },
  cyan: { bg: "rgba(6,182,212,0.12)", border: "rgba(6,182,212,0.3)", icon: "#06b6d4", glow: "0 0 20px rgba(6,182,212,0.2)" },
};

export function StatCard({ title, value, subtitle, icon: Icon, color, trend }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className="stat-card" style={{ borderColor: c.border, boxShadow: c.glow }}>
      <div className="stat-card-header">
        <div className="stat-card-icon" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
          <Icon size={22} style={{ color: c.icon }} />
        </div>
        {trend && (
          <span className={`stat-card-trend ${trend.value >= 0 ? "positive" : "negative"}`}>
            {trend.value >= 0 ? "▲" : "▼"} {Math.abs(trend.value)}% {trend.label}
          </span>
        )}
      </div>
      <p className="stat-card-value" style={{ color: c.icon }}>{value}</p>
      <p className="stat-card-title">{title}</p>
      {subtitle && <p className="stat-card-subtitle">{subtitle}</p>}
    </div>
  );
}
