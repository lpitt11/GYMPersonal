"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) {
        alert("Erro ao logar: " + error.message);
      } else {
        alert("Login feito com sucesso!");
        router.push("/dashboard"); 
      }
    } catch (error: any) {
      alert("Erro inesperado: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')" }}
    >
      {/* Overlay escuro para garantir que o texto fique legível */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Container Efeito Vidro (Glassmorphism) */}
      <div className="relative w-full max-w-md bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl">
        
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-lg">
            GYM <span className="text-emerald-500">Personal</span>
          </h1>
          <p className="text-zinc-300 mt-2 font-medium tracking-wide">
            A plataforma de elite para o seu treino.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-zinc-200 text-sm font-semibold mb-2 drop-shadow-sm">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-black/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-zinc-500 backdrop-blur-sm"
              required
            />
          </div>

          <div>
            <label className="block text-zinc-200 text-sm font-semibold mb-2 drop-shadow-sm">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-zinc-500 backdrop-blur-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Acessar Plataforma"}
          </button>
        </form>

        {/* Rodapé */}
        <div className="mt-6 text-center text-sm text-zinc-300">
          Não tem uma conta?{" "}
          <a href="/cadastro" className="text-emerald-400 hover:text-emerald-300 hover:underline font-bold transition-colors drop-shadow-sm">
            Criar conta
          </a>
        </div>
        
      </div>
    </div>
  );
}