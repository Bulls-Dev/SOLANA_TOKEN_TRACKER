"use client";
import Terminal from "@/components/Terminal";
import { Send, Github, Zap } from "lucide-react";

export default function TrackerPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Effect - Le même que le site */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#32EBF310_0%,transparent_50%)]" />
      
      <div className="relative z-10 w-full max-w-3xl space-y-8">
        
        {/* IDENTITY SECTION */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-degen-green/20 bg-degen-green/5 text-degen-green text-[10px] font-mono tracking-widest uppercase mb-4">
            <Zap size={12} fill="currentColor" /> Live On-Chain Data
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
            0xBlock Tracker
          </h1>
          
          <p className="text-zinc-500 font-medium italic text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Real-time engine monitoring Raydium liquidity pools. 
            Open-source and built for the Solana Trenches.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="https://t.me/dev_web3_blocks" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-black rounded-2xl hover:bg-degen-cyan transition-all transform active:scale-95 italic uppercase text-xs">
              <Send size={16} /> Join Telegram
            </a>
            <a href="https://github.com" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-white/10 text-white font-black rounded-2xl hover:bg-zinc-800 transition-all italic uppercase text-xs">
              <Github size={16} /> Get Source
            </a>
          </div>
        </div>

        {/* MONITORING TERMINAL */}
        <div className="relative group">
            {/* Glow effect around terminal */}
          <div className="absolute -inset-1 bg-gradient-to-r from-degen-cyan/20 to-degen-purple/20 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative">
             <Terminal />
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center pt-8">
           <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em]">
             Powered by 0xBlock · Solana Mainnet-Beta
           </p>
        </div>
      </div>
    </main>
  );
}