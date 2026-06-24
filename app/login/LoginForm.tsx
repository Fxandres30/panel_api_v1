"use client";

import { useState } from "react";
import { loginAdmin } from "@/lib/auth";

export default function LoginForm() {
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const ok = await loginAdmin(password);

    if (ok) {
      window.location.href = "/admin/chats";
      return;
    }

    alert("Contraseña incorrecta");
  }

  return (
    <div>
      {/* formulario */}
    </div>
  );
}