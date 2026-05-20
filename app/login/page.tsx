"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("E-mail ou senha incorretos.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar entrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] blur-[100px] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255, 45, 120, 0.2), transparent)' }} />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] blur-[100px] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(124, 58, 237, 0.2), transparent)' }} />

      <div className="glass w-full max-w-md p-8 rounded-3xl relative z-10 animate-fade-up shadow-2xl border border-white/10">
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <Image src="/logo_transparent.png" alt="eu+fitness logo" width={150} height={40} className="mb-6 hover:scale-105 transition-transform" />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Bem-vinda de volta</h1>
          <p className="text-[#b0b0c3] text-center">Entre para continuar sua jornada fitness</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2 ml-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78] transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2 ml-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78] transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-8 text-center text-[#b0b0c3]">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-[#ff2d78] font-bold hover:underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
