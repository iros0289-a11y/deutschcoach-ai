const fontFamily = 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const typography = {
  screenTitle: {
    fontFamily,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700" as const
  },
  sectionTitle: {
    fontFamily,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "700" as const
  },
  body: {
    fontFamily,
    fontSize: 17,
    lineHeight: 28,
    fontWeight: "400" as const
  },
  bodyStrong: {
    fontFamily,
    fontSize: 17,
    lineHeight: 28,
    fontWeight: "600" as const
  },
  caption: {
    fontFamily,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600" as const
  }
} as const;
