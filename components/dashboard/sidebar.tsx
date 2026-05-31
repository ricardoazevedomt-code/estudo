"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  LogOut,
  Wrench,
  User,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/reports", label: "Relatórios", icon: ClipboardList },
  { href: "/reports/new", label: "Novo Relatório", icon: PlusCircle },
];

interface SidebarProps {
  user?: {
    name?: string | null;
    email?: string | null;
  };
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Wrench size={20} />
        </div>
        <div>
          <p className="sidebar-logo-title">MaintTrack</p>
          <p className="sidebar-logo-sub">Sistema de Manutenção</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <p className="sidebar-nav-label">Menu</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {isActive && <div className="sidebar-nav-indicator" />}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            <User size={16} />
          </div>
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">{user?.name || "Usuário"}</p>
            <p className="sidebar-user-email">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="sidebar-logout"
          title="Sair"
        >
          <LogOut size={16} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
