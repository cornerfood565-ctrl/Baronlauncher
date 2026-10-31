package com.baronlauncher.core;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class LauncherBuildInfoTest {
    @Test
    void exposesLauncherNameAndVersion() {
        assertEquals("Baron Launcher", LauncherBuildInfo.NAME);
        assertEquals("0.1.0", LauncherBuildInfo.VERSION);
    }
}
