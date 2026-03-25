export const logger = {
  info: (...args: any[]) => console.log("[INFO]", ...args),
  warn: (...args: any[]) => console.error("[WARNING]", ...args),
  error: (...args: any[]) => console.error("[ERROR]", ...args),
};
