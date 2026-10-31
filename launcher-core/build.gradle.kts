plugins {
    application
}

repositories {
    mavenCentral()
}

dependencies {
    testImplementation("org.junit.jupiter:junit-jupiter:5.11.4")
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(21))
    }
}

application {
    mainClass.set("com.baronlauncher.core.LauncherCore")
}

tasks.test {
    useJUnitPlatform()
}

tasks.jar {
    archiveBaseName.set("baron-launcher-core")
    manifest {
        attributes["Main-Class"] = application.mainClass.get()
        attributes["Implementation-Title"] = "Baron Launcher Core"
        attributes["Implementation-Version"] = project.version
    }
}
