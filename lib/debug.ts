/**
 * Debug utilities for BOTTLE [CODE] Contact Form
 * Provides safe logging that works in production
 */

export const debugLog = {
  group: (label: string) => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV !== "production"
    ) {
      // eslint-disable-next-line no-console
      console.group(label);
    }
  },

  groupEnd: () => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV !== "production"
    ) {
      // eslint-disable-next-line no-console
      console.groupEnd();
    }
  },

  log: (...args: any[]) => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV !== "production"
    ) {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  },

  error: (...args: any[]) => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV !== "production"
    ) {
      // eslint-disable-next-line no-console
      console.error(...args);
    }
  },

  warn: (...args: any[]) => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV !== "production"
    ) {
      // eslint-disable-next-line no-console
      console.warn(...args);
    }
  },
};

export const serverDebugLog = {
  group: (label: string) => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.group(label);
    }
  },

  groupEnd: () => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.groupEnd();
    }
  },

  log: (...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  },

  error: (...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error(...args);
    }
  },

  warn: (...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(...args);
    }
  },
};
