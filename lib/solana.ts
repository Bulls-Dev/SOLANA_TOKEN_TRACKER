import { Connection, PublicKey } from '@solana/web3.js';

const RAYDIUM_PUBLIC_KEY = "675k1q2AYp7jkdgVsBkHX8n9s7BPrLndA988v1BfR3z"; // Raydium AMM Program

export const startTokenTracker = (callback: (data: any) => void) => {
  const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL!, 'confirmed');
  const raydiumPK = new PublicKey(RAYDIUM_PUBLIC_KEY);

  // On écoute les logs du programme Raydium
  return connection.onLogs(raydiumPK, ({ logs, signature }) => {
    // Si le log contient "initialize2", c'est une création de pool
    if (logs.some(log => log.includes("initialize2"))) {
      callback({
        signature,
        time: new Date().toLocaleTimeString(),
        status: "NEW POOL DETECTED",
        platform: "Raydium"
      });
    }
  }, 'confirmed');
};