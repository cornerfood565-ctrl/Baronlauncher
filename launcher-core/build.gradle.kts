plugins {
    application
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(21))
    }
}

application {
    mainClass.set("com.baronlauncher.core.LauncherCore")
}

tasks.jar {
    archiveBaseName.set("baron-launcher-core")
    manifest {
        attributes["Main-Class"] = application.mainClass.get()
        attributes["Implementation-Title"] = "Baron Launcher Core"
        attributes["Implementation-Version"] = project.version
    }
}
