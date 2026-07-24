"use client";

import "./Sidebar.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({
  open,
  onClose,
}: Props) {

  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar ${open ? "open" : ""}`}
      >

        <div className="sidebar-logo">
          EFAAT CRM
        </div>

        <nav className="sidebar-menu">

          <a href="/admin/dashboard">
            Dashboard
          </a>

          <a href="/admin/chats">
            Chats
          </a>

          <a href="/admin/clientes">
            Clientes
          </a>

          <a href="/admin/tickets">
            Tickets
          </a>

          <a href="/admin/reportes">
            Reportes
          </a>

          <a href="/admin/configuracion">
            Configuración
          </a>

        </nav>

      </aside>
    </>
  );
}