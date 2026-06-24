"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function login() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError("Contraseña incorrecta");
      return;
    }

    router.push("/admin/chats");
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          🎯
        </div>

        <h1>EFAAT CRM</h1>

        <p>
          Acceso privado al panel administrativo
        </p>

        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              login();
            }
          }}
        />

        <button onClick={login}>
          Ingresar
        </button>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

      </div>
    </div>
  );
}