import type { Config } from "tailwindcss";

// [VYNEDAM] Forced Cache Rebuild Triggered
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(auth)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(dashboard)/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
