# BARON LAUNCHER

A premium Minecraft Java Edition launcher for Windows, built with React, TypeScript, Vite and Electron.

## Current foundation

- React 19 + TypeScript + Vite renderer
- Electron 45 desktop shell
- Black / titanium / red visual system
- Home, Versions, Mods, Modpacks, Profiles, Customization and Settings screens
- Secure preload bridge with context isolation, sandboxing and Node integration disabled
- Native game-directory picker
- Windows x64 NSIS installer configuration
- Existing Gradle Java core foundation and CI workflow

The desktop shell is now integrated, but this is not yet a complete playable launcher. Minecraft version installation, Microsoft sign-in, mod-provider integrations, profile persistence, game process launching, backups and automatic updates are still implementation milestones.

## Requirements

- Windows 10 or 11 (Windows 11 is the primary development target)
- Node.js 22+
- npm
- Java JDK 25 and Gradle 9.1.0 for the existing Java core tasks

## Run the desktop application

```bash
npm install
npm run dev:desktop
```

The Vite renderer and Electron desktop window start together.

To run only the browser-based dashboard:

```bash
npm run dev
```

## Build

Build the React renderer:

```bash
npm run build
```

Create a Windows x64 installer:

```bash
npm run dist:win
```

The NSIS installer is generated in `release/`. To create an unpacked test build:

```bash
npm run dist:dir
```

## Existing Java core

From the repository root:

```bash
gradle :launcher-core:clean :launcher-core:test :launcher-core:build
```

The generated JAR is written to `launcher-core/build/libs/`.

## Desktop security

- Renderer Node.js integration is disabled.
- Context isolation and Chromium sandboxing are enabled.
- Renderer capabilities are exposed through a small preload API only.
- New windows are denied.
- External navigation is restricted to an HTTPS host allowlist.
- The renderer cannot directly access the filesystem or spawn processes.

## Current preload API

- `window.baron.getAppInfo()`
- `window.baron.selectDirectory()`
- `window.baron.openExternal(url)`

The main process validates external URLs before opening them. Do not place Microsoft client secrets or other credentials in the renderer or source repository.
