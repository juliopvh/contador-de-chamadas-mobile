export const colors = {
  // Apple system colors (harmonized palette)
  primary: "#007AFF",
  success: "#34C759",
  warning: "#FF9500",
  purple: "#AF52DE",
  progress: "#34C759",
  buttonText: "#FFFFFF",
  shadow: "#000000",

  light: {
    background: "#F2F2F7",
    surface: "#FFFFFF",
    title: "#007AFF",
    text: "#1C1C1E",
    subtitle: "#8E8E93",
    inputBackground: "#FFFFFF",
    border: "#D1D1D6",
    visor: "#E5E5EA",
    number: "#1C1C1E",
    progressTrack: "#E5E5EA",
  },

  dark: {
    background: "#000000",
    surface: "#1C1C1E",
    title: "#0A84FF",
    text: "#FFFFFF",
    subtitle: "#8E8E93",
    inputBackground: "#1C1C1E",
    border: "#38383A",
    visor: "#2C2C2E",
    number: "#FFFFFF",
    progressTrack: "#38383A",
  },

  purpleTheme: {
    background: "#1A1025",
    surface: "#2D1F45",
    title: "#BF5AF2",
    text: "#F5F0FA",
    subtitle: "#C9B8E0",
    inputBackground: "#221533",
    border: "#7B5EA7",
    visor: "#3A2560",
    number: "#FFFFFF",
    progressTrack: "#4A3560",
  },

  julioTheme: {
    background: "#000000",
    surface: "#0A140A",
    title: "#30D158",
    text: "#30D158",
    subtitle: "#248A3D",
    inputBackground: "#050A05",
    border: "#1B5E20",
    visor: "#0D1F0D",
    number: "#30D158",
    progressTrack: "#1B3A1F",
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
