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
      selectDirectory: () => Promise<string | null>;
      openExternal: (url: string) => Promise<boolean>;
    };
  }
}
