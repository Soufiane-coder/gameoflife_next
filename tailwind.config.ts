import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl' : '2.2rem',
        'oval': '50%'
      },
      gridTemplateColumns : {
        'grid-routine-card-cols' : 'repeat(auto-fit, minmax(22rem, 1fr))',
      },
      width: {
        'nav-icon' : '3.5rem'
      },
      height: {
        'nav-icon' : '3.5rem'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
