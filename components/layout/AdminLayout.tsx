"use client";

import { useState } from "react";

import "./AdminLayout.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (

    <div className="admin-layout">

      <Topbar
        onToggleSidebar={() =>
          setSidebarOpen(
            !sidebarOpen
          )
        }
      />

      <Sidebar
        open={sidebarOpen}
      />

      <main className="admin-content">
        {children}
      </main>

    </div>

  );

}