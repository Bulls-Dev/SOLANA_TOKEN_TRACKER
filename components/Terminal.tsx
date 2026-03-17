"use client";
import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";

export default function Terminal() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
    
    if (!rpcUrl) {
      console.error("❌ RPC URL manquante dans .env.local");
      return;
    }

    const connection = new Connection(rpcUrl, {
      commitment: "confirmed",
      wsEndpoint: rpcUrl.replace("https://", "wss://") 
    });

    // --- ADRESSES OFFICIELLES RAYDIUM (MISES À JOUR) ---
    const raydiumLegacy = new PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8");
    const raydiumCPMM = new PublicKey("CPMMoo8LqVnSgSZR69BhR7B9A3yRz8HhJ7C9s999999");

    console.log("🚀 MONITORING STARTED - Legacy & CPMM Active");

    const handleLogs = ({ logs, signature }: { logs: string[], signature: string }) => {
      // 1. On log dans la console pour être sûr que Helius envoie des trucs
      console.log("Flux reçu pour signature:", signature.slice(0, 8));

      // 2. Filtre ultra-large : Si un log contient "init" ou "create" ou "liquidity"
      // On l'affiche pour voir ce qui se passe sur le réseau.
      const isInteresting = logs.some(log => {
        const l = log.toLowerCase();
        return l.includes("init") || 
               l.includes("create") || 
               l.includes("pool") || 
               l.includes("liquidity");
      });

      if (isInteresting) {
        const newEntry = {
          id: signature,
          time: new Date().toLocaleTimeString(),
          sig: signature.slice(0, 12),
        };
        setLogs(prev => [newEntry, ...prev].slice(0, 50));
      }
    };
    // On s'abonne aux deux programmes principaux de Raydium
    const subLegacy = connection.onLogs(raydiumLegacy, handleLogs, "confirmed");
    const subCPMM = connection.onLogs(raydiumCPMM, handleLogs, "confirmed");

    return () => {
      connection.removeOnLogsListener(subLegacy);
      connection.removeOnLogsListener(subCPMM);
      console.log("👋 Subscription stopped");
    };
  }, []);

  return (
    <div className="bg-[#080808]/90 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-[450px] flex flex-col shadow-2xl overflow-hidden">
      {/* Top Bar */}
      <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50 animate-pulse" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-mono text-degen-green animate-pulse">● LIVE</span>
           <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">Raydium_Amm_Monitor_v1.0</span>
        </div>
      </div>

      {/* Log list */}
      <div className="flex-1 overflow-y-auto space-y-2 font-mono scrollbar-hide">
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-700 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-md bg-degen-cyan/20 animate-pulse"></div>
              <div className="relative animate-spin rounded-full h-6 w-6 border-b-2 border-degen-cyan"></div>
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] italic animate-pulse text-center">
              Scanning Solana Trenches...<br/>
              <span className="text-[8px] text-zinc-800 not-italic mt-2 block">Waiting for new pool liquidity</span>
            </p>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex items-center justify-between text-[11px] p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-degen-cyan/30 hover:bg-white/[0.04] transition-all group animate-in fade-in slide-in-from-left duration-300">
              <div className="flex items-center gap-3">
                <span className="text-zinc-600 italic">[{log.time}]</span>
                <span className="text-degen-green font-bold tracking-tighter flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-degen-green rounded-full shadow-[0_0_8px_#00FFBD]"></span>
                  POOL_DETECTED
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-zinc-500 group-hover:text-degen-cyan transition-colors italic hidden md:inline">SIG: {log.sig}...</span>
                <a 
                  href={`https://solscan.io/tx/${log.id}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[9px] bg-zinc-900 px-3 py-1.5 rounded border border-white/10 hover:border-degen-cyan text-zinc-400 group-hover:text-white transition-all uppercase font-black"
                >
                  View
                </a>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Bottom status */}
      <div className="mt-4 pt-2 border-t border-white/5 flex justify-between items-center">
         <span className="text-[9px] text-zinc-600 font-mono italic">Listening to AMM & CPMM Programs...</span>
         <span className="text-[9px] text-zinc-600 font-mono uppercase font-bold text-degen-cyan">{logs.length} Pools Found</span>
      </div>
    </div>
  );
}