# Electron desktop shell

BARON LAUNCHER now has an Electron desktop entry point around the existing Vite + React renderer.

## Development

- Node.js 22 or newer
- npm

Install dependencies and run the desktop app:

```bash
npm install
npm run dev:desktop
```

Build the renderer:

```bash
npm run build
```

Create a Windows x64 NSIS installer:

```bash
npm run dist:win
```

The installer is written to `release/`.

## Security baseline

- Renderer Node.js integration is disabled.
- Context isolation and sandboxing are enabled.
- Renderer access is limited to the small API exposed by `preload.cjs`.
- New windows are denied; approved HTTPS destinations are opened externally.
- Renderer navigation is restricted to the local app.

## Current bridge

- `getAppInfo()`: app version and runtime metadata.
- `selectDirectory()`: native directory picker for a Minecraft game directory.
- `openExternal(url)`: opens only the allowlisted HTTPS hosts.

Minecraft installation, Microsoft sign-in, mod-provider APIs and game launching remain separate implementation milestones. No account tokens or secrets are stored by this initial shell.
