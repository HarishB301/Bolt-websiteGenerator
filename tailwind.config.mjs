/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // App Router
    "./src/**/*.{js,ts,jsx,tsx,mdx}",         // if using /src directory
  ],
  theme: {
    extend: {
      // Add your customizations here
      colors: {
        primary: "#6366f1",
        secondary: "#8b5cf6",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],      // if using Geist font
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;