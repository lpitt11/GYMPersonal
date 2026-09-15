"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para verificar se o usuário está realmente logado
    const verificarSessao = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Se tentar entrar sem logar, é chutado de volta para o login
        router.push("/"); 
      } else {
        setEmail(session.user.email ?? "");
        setLoading(false);
      }
    };

    verificarSessao();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-emerald-500 font-bold text-xl">
        Carregando painel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      
      {/* Barra de Navegação Superior */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black text-white tracking-tighter">
          GYM <span className="text-emerald-500">Personal</span>
        </h1>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">Logado como: <strong className="text-white">{email}</strong></span>
          <button 
            onClick={handleLogout}
            className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Visão Geral</h2>
        
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-zinc-400 font-medium mb-2">Meus Alunos</h3>
            <p className="text-4xl font-black text-white">0</p>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-zinc-400 font-medium mb-2">Treinos Criados</h3>
            <p className="text-4xl font-black text-white">0</p>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-zinc-400 font-medium mb-2">Faturamento Mês</h3>
            <p className="text-4xl font-black text-emerald-500">R$ 0,00</p>
          </div>
        </div>
      </main>

    </div>
  );
}