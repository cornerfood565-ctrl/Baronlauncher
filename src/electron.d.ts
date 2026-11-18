export {};

declare global {
  interface Window {
    baron: {
      getAppInfo: () => Promise<{
        name: string;
        version: string;
        platform: string;
        arch: string;
        isPackaged: boolean;
      }>;
      windowControl: (action: "minimize" | "toggle-maximize" | "close") => Promise<boolean>;
      selectDirectory: () => Promise<string | null>;
      openExternal: (url: string) => Promise<boolean>;
    };
  }
}
