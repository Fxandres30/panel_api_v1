"use client";

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
        className="topbar-menu"
        onClick={onToggleSidebar}
      >
        ☰
      </button>

      <div className="topbar-logo">
        EFAAT CRM
      </div>

    </header>

  );

}