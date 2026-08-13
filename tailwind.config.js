const plugin = require("tailwindcss/plugin");

const NUNITO = {
  400: "Nunito_400Regular",
  500: "Nunito_500Medium",
  600: "Nunito_600SemiBold",
  700: "Nunito_700Bold",
  800: "Nunito_800ExtraBold",
  900: "Nunito_900Black",
};

const TYPOGRAPHY = {
  "h1-bold": [72, 90, 700, -1.44],
  "web-h2": [60, 68, 700, -1.2],
  "h3-bold": [48, 60, 700, -0.96],
  "h4-bold": [36, 44, 700, -0.72],
  "h5-bold": [30, 38, 700],
  "h6-bold": [24, 32, 700],
  h5: [24, 28, 800],
  h6: [20, 24, 700],
  "t1-bold": [20, 24, 700],
  "t1-regular": [20, 24, 400],
  "t2-bold": [18, 22, 700],
  "t2-medium": [18, 22, 500],
  "t2-regular": [18, 22, 400],
  "t3-bold": [16, 20, 700],
  "t3-semibold": [16, 20, 600],
  "t3-medium": [16, 20, 500],
  t3: [16, 20, 400],
  "t4-bold": [14, 18, 700],
  "t4-regular": [14, 18, 400],
  "t5-bold": [12, 14, 700],
  "t5-regular": [12, 14, 400],
  body02: [14, 18, 400],
};

const WEIGHT_ALIASES = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

const typographyPlugin = plugin(({ addUtilities }) => {
  const typography = {};
  const weights = {};

  for (const [name, [fontSize, lineHeight, fontWeight, letterSpacing]] of Object.entries(TYPOGRAPHY)) {
    typography[`.text-${name}`] = {
      fontFamily: NUNITO[fontWeight],
      fontSize: `${fontSize}px`,
      lineHeight: `${lineHeight}px`,
      fontWeight: `${fontWeight}`,
      ...(letterSpacing !== undefined && { letterSpacing: `${letterSpacing}px` }),
    };
  }

  for (const [alias, weight] of Object.entries(WEIGHT_ALIASES)) {
    weights[`.font-${alias}`] = { fontFamily: NUNITO[weight], fontWeight: `${weight}` };
  }
  for (const [weight, family] of Object.entries(NUNITO)) {
    weights[`.font-nunito-${weight}`] = { fontFamily: family, fontWeight: weight };
  }

  addUtilities(typography);
  addUtilities(weights);
});

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    fontFamily: {
      nunito: ["Nunito_400Regular", "Nunito", "sans-serif"],
    },
    extend: {
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
      },
      screens: {
        tablet: "640px",

        laptop: "1024px",

        desktop: "1280px",
        "desktop-2xl": "1440px",
        "desktop-3xl": "1536px",

        "hd+": "1440px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      gridTemplateColumns: {
        24: "repeat(24, minmax(0, 1fr))",
      },
      colors: {
        blue: "#C12525",
        secondary: "#ffefe7",
        "primary-foreground": "white",
        transparent: "transparent",
        current: "currentColor",
        white: {
          25: "#F4F4F4",
          50: "rgba(242, 242, 247, 1)",
          DEFAULT: "#FFFFFF",
          "03": "#F4F4F4",
          "02": "rgba(255, 248, 242, 1)",
        },
        blue: {
          500: "rgba(0, 122, 255, 1)",
        },
        black: "#242424",
        dark: {
          25: "rgba(196, 196, 199, 1)",
          50: "rgba(138, 138, 142, 1)",
          75: "rgba(29, 29, 31, 1)",
          "05": "#FFF",
          "06": "rgba(235, 235, 245, 0.6)",
          "08": "#EBEBF52E",
          "09": "#8A8A8E",
          10: "007AFF1A",
          75: "rgba(29, 29, 31, 1)",
        },
        secondary: {
          DEFAULT: "#eee8e3",
          "01": "#13A62E",
          "02": "#E5F6E9",
          "03": "#B2E5BC",
          "04": "#F0FDF4",
        },
        background: {
          DEFAULT: "#D1D1D6",
          "01": "#F2F2F7",
        },
        neutral: {
          "01": "#000",
          "02": "#8E8E93",
          "05": "#D1D1D6",
          "06": "#E5E5EA",
          "04": "#C7C7CC",
          "07": "#FFFFFF",
        },
        light: {
          0: "rgba(245, 245, 247, 1)",
          "00": "rgba(43, 50, 66, 1)",
          "01": "#000",
          "02": "#3C3C4399",
          "03": "rgba(60, 60, 67, 0.3)",
          "04": "#3C3C432E",
          "06": "#F5F5F7",
          "07": "#C4C4C7",
        },
        pastel: {
          "01": "#FF6D3B",
          "02": "#565FCC",
          "03": "#8DD8B5",
          "04": "#FABF49",
          "07": "#FFA41B",
          "09": "#57CD96",
        },
        orange: {
          "01": "#FBEFE4",
          "02": "#FFF0EB",
          "03": "#FFFAF6",
        },
        teritary: {
          "01": "#FF3B30",
          "02": "#4DC262",
          "03": "#34C759",
          "04": "#00C7BE",
          "05": "#30B0C7",
          "06": "#007AFF",
          "07": "#5856D6",
          "08": "#AF52DE",
          "09": "#FF4266",
          "10": "#A2845E",
          "11": "#EEEEFB",
          "12": "#E5F2FF",
          "200": "#FFE456",

        },
        primary: {
          DEFAULT: "#F15F22",
          "00": "#2B3242",
          "01": "#FF6D3A",
          "02": "#FFF0EB",
          "03": "#FFC5B0",
          "06": "#CC3A07",
          "07": "#990700",
          17: "#00001A",
        },
        green: {
          25: "rgba(19, 166, 46, 0.25)",
          500: "rgba(19, 166, 46, 1)",
        },
        redcolor: {
          25: "#FFEBEA",
          500: "#FF3B30",
        },
        primary1: "var(--color-primary1)",
        primary2: "var(--color-primary2)",
        primary3: "var(--color-primary3)",
        "gradient-primary1": "var(--color-gradient-primary1)",
        neu1: "var(--color-neu1)",
        neu2: "var(--color-neu2)",
        neu3: "var(--color-neu3)",
        neu4: "var(--color-neu4)",
        neu5: "var(--color-neu5)",
        neu6: "var(--color-neu6)",
        neu7: "var(--color-neu7)",
        neu8: "var(--color-neu8)",
        green1: "var(--color-green1)",
        yellow: "var(--color-orange)",
        red: "var(--color-red)",

        pure: "#7635c8",
        blurgray: "#2b2f8e",
        blurlight: "#3369f4",
        graydefault: "#f7f7f7",
        greenpastel: "#ebfdef",
        orangepastel: "#ffefe7",
        bluepastel: "#e8eff9",
        greypastel: "#EFB495",
        ylight: {
          0: "rgba(245, 245, 247, 1)",
        },
        grey: {
          50: "#E5E5EA",
          100: "#D1D1D6",
        },
      },
    },
  },
  plugins: [typographyPlugin],
}