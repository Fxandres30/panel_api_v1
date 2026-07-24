"use client";

import { Menu } from "lucide-react";
import "./Topbar.css";

type Props = {
  onToggleSidebar: () => void;
};

export default function Topbar({
  onToggleSidebar,
}: Props) {
  return (
    <header className="topbar">
      <button
        type="button"
        className="topbar-menu"
        onClick={onToggleSidebar}
        aria-label="Abrir menú"
      >
        <Menu size={22} />
      </button>

      <div className="topbar-logo">
        🎯
        <span>EFAAT CRM</span>
      </div>

      <div className="topbar-user">
        <div className="avatar">
          A
        </div>
      </div>
    </header>
  );
}