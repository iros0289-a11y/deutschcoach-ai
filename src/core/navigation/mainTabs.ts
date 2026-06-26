import type { TabIconName } from "../../ui/components/TabBarIcon";

export type MainTabName = "index" | "learn" | "exams" | "stats" | "settings";

export type MainTabConfig = {
  name: MainTabName;
  title: string;
  icon: TabIconName;
};

export const mainTabs: MainTabConfig[] = [
  {
    name: "index",
    title: "Start",
    icon: "home-variant-outline"
  },
  {
    name: "learn",
    title: "Lernen",
    icon: "book-open-outline"
  },
  {
    name: "exams",
    title: "Prüfungen",
    icon: "clipboard-text-outline"
  },
  {
    name: "stats",
    title: "Statistik",
    icon: "chart-line"
  },
  {
    name: "settings",
    title: "Einstellungen",
    icon: "cog-outline"
  }
];
