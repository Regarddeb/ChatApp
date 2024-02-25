/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        thin: ["thin"],
        extralight: ["extralight"],
        light: ["light"],
        regular: ["regular"],
        medium: ["medium"],
        semibold: ["semibold"],
        bold: ["bold"],
        extrabold: ["extrabold"],
      },
      colors: {
        primary: "#7a84ba",
        background: "#F7F3EB",
        secondary: '#F2F0FF',
        success: '#29FF09'
      },
    },
  },
  plugins: [],
};
