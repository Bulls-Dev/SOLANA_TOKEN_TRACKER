export default function Identity() {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-4xl font-black italic tracking-tighter uppercase">0xBlock Tools</h2>
      <p className="text-zinc-400 max-w-md mx-auto italic">
        Free Open-Source Monitoring. Building the future of Solana trading engines.
      </p>
      <div className="flex justify-center gap-4">
        <a href="https://t.me/dev_web3_blocks" className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-degen-cyan transition-all">
          JOIN TELEGRAM
        </a>
        <a href="https://github.com/ton-github" className="px-6 py-2 border border-zinc-800 rounded-full hover:border-white transition-all">
          GET SOURCE
        </a>
      </div>
    </div>
  );
}