export const colors = {
  primary: "#2563EB",
  success: "#16A34A",
  warning: "#F59E0B",
  purple: "#7C3AED",
  progress: "#22A447",
  buttonText: "#FFFFFF",
  shadow: "#000000",

  light: {
    background: "#F1F5F9",
    surface: "#FFFFFF",
    title: "#2563EB",
    text: "#0F172A",
    subtitle: "#64748B",
    inputBackground: "#FFFFFF",
    border: "#CBD5E1",
    visor: "#EEF2FF",
    number: "#312E81",
    progressTrack: "#E2E8F0",
  },

  dark: {
    background: "#0F172A",
    surface: "#1E293B",
    title: "#2563EB",
    text: "#F8FAFC",
    subtitle: "#CBD5E1",
    inputBackground: "#0F172A",
    border: "#475569",
    visor: "#334155",
    number: "#FFFFFF",
    progressTrack: "#475569",
  },

  purpleTheme: {
    background: "#130D1F",
    surface: "#211632",
    title: "#2563EB",
    text: "#FAF7FF",
    subtitle: "#C4B5D8",
    inputBackground: "#190F28",
    border: "#49345F",
    visor: "#2D1B42",
    number: "#FFFFFF",
    progressTrack: "#49345F",
  },

  julioTheme: {
    background: "#000000",
    surface: "#060B06",
    title: "#39FF14",
    text: "#39FF14",
    subtitle: "#22C55E",
    inputBackground: "#020502",
    border: "#166534",
    visor: "#091409",
    number: "#39FF14",
    progressTrack: "#0F2912",
  },
} as const;

export type ThemeName = "light" | "dark" | "purple" | "julio";

export interface ThemePalette {
  background: string;
  surface: string;
  title: string;
  text: string;
  subtitle: string;
  inputBackground: string;
  border: string;
  visor: string;
  number: string;
  progressTrack: string;
}

export const PALETTE_BY_THEME: Record<ThemeName, ThemePalette> = {
  light: colors.light,
  dark: colors.dark,
  purple: colors.purpleTheme,
  julio: colors.julioTheme,
};
