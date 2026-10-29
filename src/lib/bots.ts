// Crawlers refused site-wide: robots.txt asks them to stay out, proxy.ts enforces it.
export const BLOCKED_BOTS = [
  "Baiduspider",
  "GPTBot",
  "ClaudeBot",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "PetalBot",
  "SemrushBot",
  "AhrefsBot",
  "MJ12bot",
  "DotBot",
] as const;

export const BLOCKED_BOT_PATTERN = new RegExp(BLOCKED_BOTS.join("|"), "i");
