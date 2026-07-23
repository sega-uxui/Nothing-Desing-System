export type ThemeId = 'light' | 'main' | 'playful' | 'dark';

export interface ThemeConfig {
  id: ThemeId;
  label: string;
  // sidebar shell
  sidebarBg: string;
  sidebarBorder: string;
  sidebarHeaderBorder: string;
  // sidebar text
  sidebarTitle: string;
  sidebarText: string;
  sidebarMuted: string;
  sidebarSubtle: string;
  sidebarLabel: string;
  // sidebar nav states
  sidebarActiveBg: string;
  sidebarActiveText: string;
  sidebarActiveMuted: string;
  sidebarHoverBg: string;
  sidebarHoverText: string;
  // logo mark
  logoDot: string;
  // main content
  mainBg: string;
  mainText: string;
  mainMuted: string;
  mainSubtle: string;
  mainBorder: string;
  mainHeaderBg: string;
  // accent
  accent: string;
  accentFg: string;
  // swatches (for theme picker preview dots)
  swatches: [string, string, string] | [string, string, string, string];
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  light: {
    id: 'light',
    label: 'Light',
    sidebarBg: '#111111',
    sidebarBorder: 'rgba(255,255,255,0.06)',
    sidebarHeaderBorder: 'rgba(255,255,255,0.07)',
    sidebarTitle: '#ffffff',
    sidebarText: '#e5e5e5',
    sidebarMuted: '#525252',
    sidebarSubtle: '#404040',
    sidebarLabel: '#3a3a3a',
    sidebarActiveBg: '#262626',
    sidebarActiveText: '#ffffff',
    sidebarActiveMuted: '#737373',
    sidebarHoverBg: 'rgba(255,255,255,0.05)',
    sidebarHoverText: '#d4d4d4',
    logoDot: '#ffffff',
    mainBg: '#ffffff',
    mainText: '#171717',
    mainMuted: '#737373',
    mainSubtle: '#a3a3a3',
    mainBorder: '#f5f5f5',
    mainHeaderBg: '#ffffff',
    accent: '#171717',
    accentFg: '#ffffff',
    swatches: ['#111111', '#525252', '#ffffff'],
  },
  main: {
    id: 'main',
    label: 'Main',
    sidebarBg: '#3E2C23',
    sidebarBorder: 'rgba(245,233,216,0.08)',
    sidebarHeaderBorder: 'rgba(245,233,216,0.1)',
    sidebarTitle: '#F5E9D8',
    sidebarText: '#F5E9D8',
    sidebarMuted: 'rgba(245,233,216,0.55)',
    sidebarSubtle: 'rgba(245,233,216,0.32)',
    sidebarLabel: 'rgba(245,233,216,0.3)',
    sidebarActiveBg: '#E76F2E',
    sidebarActiveText: '#ffffff',
    sidebarActiveMuted: 'rgba(255,255,255,0.72)',
    sidebarHoverBg: 'rgba(231,111,46,0.18)',
    sidebarHoverText: '#F5E9D8',
    logoDot: '#E76F2E',
    mainBg: '#F5E9D8',
    mainText: '#3E2C23',
    mainMuted: 'rgba(62,44,35,0.55)',
    mainSubtle: 'rgba(62,44,35,0.35)',
    mainBorder: 'rgba(62,44,35,0.1)',
    mainHeaderBg: 'rgba(245,233,216,0.6)',
    accent: '#2FA4D7',
    accentFg: '#ffffff',
    swatches: ['#3E2C23', '#E76F2E', '#2FA4D7'],
  },
  playful: {
    id: 'playful',
    label: 'Playful',
    sidebarBg: '#3852B4',
    sidebarBorder: 'rgba(255,255,255,0.15)',
    sidebarHeaderBorder: 'rgba(255,255,255,0.2)',
    sidebarTitle: '#ffffff',
    sidebarText: '#ffffff',
    sidebarMuted: 'rgba(255,255,255,0.8)',
    sidebarSubtle: 'rgba(255,255,255,0.6)',
    sidebarLabel: 'rgba(255,255,255,0.5)',
    sidebarActiveBg: '#F08D39',
    sidebarActiveText: '#ffffff',
    sidebarActiveMuted: 'rgba(255,255,255,0.9)',
    sidebarHoverBg: 'rgba(240,141,57,0.2)',
    sidebarHoverText: '#ffffff',
    logoDot: '#F3BE7A',
    mainBg: '#ffffff',
    mainText: '#3852B4',
    mainMuted: 'rgba(56,82,180,0.7)',
    mainSubtle: 'rgba(56,82,180,0.5)',
    mainBorder: 'rgba(56,82,180,0.15)',
    mainHeaderBg: 'rgba(243,190,122,0.1)',
    accent: '#F08D39',
    accentFg: '#ffffff',
    swatches: ['#3852B4', '#5E7AC4', '#F3BE7A', '#F08D39'],
  },
  dark: {
    id: 'dark',
    label: 'Dark',
    sidebarBg: '#0a0a0a',
    sidebarBorder: 'rgba(255,255,255,0.06)',
    sidebarHeaderBorder: 'rgba(255,255,255,0.07)',
    sidebarTitle: '#ffffff',
    sidebarText: '#e5e5e5',
    sidebarMuted: '#525252',
    sidebarSubtle: '#404040',
    sidebarLabel: '#3a3a3a',
    sidebarActiveBg: '#262626',
    sidebarActiveText: '#ffffff',
    sidebarActiveMuted: '#737373',
    sidebarHoverBg: 'rgba(255,255,255,0.05)',
    sidebarHoverText: '#d4d4d4',
    logoDot: '#ffffff',
    mainBg: '#111111',
    mainText: '#e5e5e5',
    mainMuted: '#737373',
    mainSubtle: '#525252',
    mainBorder: 'rgba(255,255,255,0.08)',
    mainHeaderBg: '#111111',
    accent: '#2FA4D7',
    accentFg: '#ffffff',
    swatches: ['#0a0a0a', '#262626', '#2FA4D7'],
  },
};

export const THEME_ORDER: ThemeId[] = ['light', 'main', 'playful', 'dark'];