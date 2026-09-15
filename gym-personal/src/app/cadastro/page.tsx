"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoConta, setTipoConta] = useState("aluno_avulso");
  const [loading, setLoading] = useState(false);

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Cria o usuário no sistema de autenticação do Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: senha,
      });

      if (authError) throw authError;

      // 2. Salva o perfil do usuário na nossa tabela 'perfis'
      if (authData.user) {
        const { error: profileError } = await supabase
          .from("perfis")
          .insert([
            {
              id: authData.user.id,
              nome: nome,
              tipo_conta: tipoConta,
            },
          ]);

        if (profileError) throw profileError;

        alert("Conta criada com sucesso! Faça login para continuar.");
        router.push("/"); // Manda de volta para a tela de login
      }
    } catch (error: any) {
      alert("Erro ao criar conta: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/75"></div>

      <div className="relative w-full max-w-md bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl mt-10 mb-10">
        
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-white tracking-tighter drop-shadow-lg">
            Criar <span className="text-emerald-500">Conta</span>
          </h1>
          <p className="text-zinc-300 mt-2 font-medium">Junte-se à plataforma de elite.</p>
        </div>

        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label className="block text-zinc-200 text-sm font-semibold mb-1">Nome Completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="João da Silva"
              className="w-full bg-black/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-zinc-200 text-sm font-semibold mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-black/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-zinc-200 text-sm font-semibold mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-zinc-200 text-sm font-semibold mb-1">Eu sou um:</label>
            <select
              value={tipoConta}
              onChange={(e) => setTipoConta(e.target.value)}
              className="w-full bg-black/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-all [&>option]:bg-zinc-900"
            >
              <option value="aluno_avulso">Aluno (Vou montar meu treino)</option>
              <option value="personal">Personal Trainer</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50"
          >
            {loading ? "Criando conta..." : "Criar Conta Agora"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-300">
          Já tem uma conta?{" "}
          <a href="/" className="text-emerald-400 hover:underline font-bold transition-colors">
            Fazer login
          </a>
        </div>
      </div>
    </div>
  );
}