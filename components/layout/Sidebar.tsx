"use client";

import "./Sidebar.css";

type Props = {
  open: boolean;
};

export default function Sidebar({
  open,
}: Props) {

  return (

    <aside
      className={
        open
          ? "sidebar open"
          : "sidebar"
      }
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

  );

}