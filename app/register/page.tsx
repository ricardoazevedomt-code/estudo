"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push("/login?registered=true");
      } else {
        const data = await res.text();
        setError(data || "Ocorreu um erro ao criar a conta.");
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar se cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] blur-[100px] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255, 45, 120, 0.2), transparent)' }} />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] blur-[100px] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(124, 58, 237, 0.2), transparent)' }} />

      <div className="glass w-full max-w-md p-8 rounded-3xl relative z-10 animate-fade-up shadow-2xl border border-white/10">
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <Image src="/logo.svg" alt="eu+fitness logo" width={150} height={40} className="mb-6 hover:scale-105 transition-transform" />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Crie sua conta</h1>
          <p className="text-[#b0b0c3] text-center">Junte-se à nossa comunidade</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Nome Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-[#ff2d78] transition-all"
              placeholder="Seu nome"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-1.5 ml-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-[#ff2d78] transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-[#ff2d78] transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-[#ff2d78] transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 text-lg mt-3 disabled:opacity-50"
          >
            {loading ? "Criando conta..." : "Cadastrar"}
          </button>
        </form>

        <div className="mt-8 text-center text-[#b0b0c3]">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-[#ff2d78] font-bold hover:underline">
            Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}
