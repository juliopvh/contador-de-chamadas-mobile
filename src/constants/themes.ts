import { colors, PALETTE_BY_THEME, type ThemeName, type ThemePalette } from "./colors";

export type StatusBarStyle = "light" | "dark" | "auto";

export interface ThemeConfig {
  palette: ThemePalette;
  statusBarStyle: StatusBarStyle;
  nextLabel: string;
}

const THEME_ORDER: ThemeName[] = ["light", "dark", "purple", "julio"];

const NEXT_LABEL: Record<ThemeName, string> = {
  light: "Próximo: Escuro",
  dark: "Próximo: Roxo",
  purple: "Próximo: Terminal",
  julio: "Próximo: Claro",
};

const STATUS_BAR_STYLE: Record<ThemeName, StatusBarStyle> = {
  light: "dark",
  dark: "light",
  purple: "light",
  julio: "light",
};

export const THEME_CONFIG: Record<ThemeName, ThemeConfig> = THEME_ORDER.reduce(
  (acc, name) => {
    acc[name] = {
      palette: PALETTE_BY_THEME[name],
      statusBarStyle: STATUS_BAR_STYLE[name],
      nextLabel: NEXT_LABEL[name],
    };
    return acc;
  },
  {} as Record<ThemeName, ThemeConfig>,
);

export const THEME_NAMES = THEME_ORDER;
export const DEFAULT_THEME: ThemeName = "light";

export function nextTheme(current: ThemeName): ThemeName {
  const idx = THEME_ORDER.indexOf(current);
  return THEME_ORDER[(idx + 1) % THEME_ORDER.length];
}

// Re-export for convenience.
export { colors };
export type { ThemeName, ThemePalette };
