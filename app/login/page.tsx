"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login() {
    if (loading) return;

    if (!password.trim()) {
      setError("Ingresa la contraseña.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Contraseña incorrecta.");
        return;
      }

      router.push("/admin/chats");
    } catch {
      setError("No fue posible conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">

        <div className="login-logo">
          🎯
        </div>

        <h1>EFAAT CRM</h1>

        <p>
          Bienvenido nuevamente. Ingresa tu contraseña para continuar.
        </p>

        <div className="password-container">

          <input
            autoFocus
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") login();
            }}
          />

          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        <button
          className="login-btn"
          onClick={login}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="spin"
              />
              Verificando...
            </>
          ) : (
            "Ingresar"
          )}
        </button>

        {loading && (
          <div className="loading-text">
            Verificando credenciales...
          </div>
        )}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

      </div>
    </main>
  );
}