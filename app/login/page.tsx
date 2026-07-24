"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import "./login.css";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  async function login() {
    setError("");

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
        <div className="login-logo">🎯</div>

        <h1>EFAAT CRM</h1>

        <p>Acceso privado al panel administrativo</p>

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                login();
              }
            }}
          />

          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={
              showPassword
                ? "Ocultar contraseña"
                : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <button
          type="button"
          className="login-btn"
          onClick={login}
        >
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