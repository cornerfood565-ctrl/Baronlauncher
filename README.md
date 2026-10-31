# Baron Launcher

A premium Minecraft Java Edition launcher project.

## Current milestone — UI + Gradle core foundation

- React + TypeScript + Vite dashboard
- Black / titanium / red visual system
- Compact sidebar and large dashboard
- Home, Versions, Mods, Modpacks, Profiles, Customization and Settings screens
- Gradle multi-project build
- Java 21 launcher-core module
- CI workflow builds the dashboard and tests/packages the Java core

**Important:** This is still an early development foundation. The Java core currently starts and reports its build status. Minecraft installation, Microsoft authentication, launching the game process, mod provider integrations, backups and automatic updates are not implemented yet.

## Requirements

- Node.js 22+
- Java JDK 21
- Gradle 8.12.1 (or use the Gradle version configured in CI)

## Run the dashboard

```bash
npm install
npm run dev
```

## Build the dashboard

```bash
npm run build
```

## Build and test the Java core

From the repository root:

```bash
gradle :launcher-core:clean :launcher-core:test :launcher-core:build
```

Run the generated core JAR:

```bash
java -jar launcher-core/build/libs/baron-launcher-core-0.1.0.jar
```

The GitHub Actions build uploads the Java JAR as an artifact after a successful build.

## Planned desktop packaging

Electron integration will connect the React dashboard to the Java core in a later milestone. The Java core will then gain the Minecraft version installer, Microsoft account flow, profile manager, mod integrations and game process controller.
