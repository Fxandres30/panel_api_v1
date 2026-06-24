"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const router = useRouter();

  async function login() {
    const res = await fetch(
      "/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      }
    );

    if (!res.ok) {
      setError(
        "Contraseña incorrecta"
      );
      return;
    }

    router.push("/admin/chats");
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>EFAAT CRM</h1>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button onClick={login}>
          Entrar
        </button>

        {error && <p>{error}</p>}
      </div>
    </div>
  );
}