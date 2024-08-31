import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      flexBasis: {
        '5': '5%',
        '7': '7%',
        '10': '10%',
        '15': '15%',
        '20': '20%',
        '25': '25%'
      }
    },
  },
  plugins: [],
};
export default config;
