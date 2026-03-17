import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "degen-green": "#00FFBD",
        "degen-cyan": "#32EBF3",
        "degen-purple": "#9F47D3",
      },
    },
  },
  plugins: [],
};
export default config;