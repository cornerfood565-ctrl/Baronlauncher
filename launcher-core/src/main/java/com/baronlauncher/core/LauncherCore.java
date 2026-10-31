package com.baronlauncher.core;

/**
 * Entry point for the Baron Launcher Java core.
 *
 * This initial milestone establishes the Gradle/JVM foundation. Minecraft
 * installation, authentication and process launching will be implemented
 * in subsequent milestones.
 */
public final class LauncherCore {
    private LauncherCore() {
    }

    public static void main(String[] args) {
        System.out.println("==================================");
        System.out.println("         BARON LAUNCHER");
        System.out.println("==================================");
        System.out.println("Java core: initialized");
        System.out.println("Version: " + LauncherBuildInfo.VERSION);
        System.out.println("Minecraft engine: not connected");
        System.out.println("Authentication: not configured");
        System.out.println();
        System.out.println("The Baron Launcher core is ready for development.");
    }
}
