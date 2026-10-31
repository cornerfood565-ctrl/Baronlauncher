plugins {
    base
}

allprojects {
    group = "com.baronlauncher"
    version = "0.1.0"
}

tasks.register("printBuildInfo") {
    group = "help"
    description = "Prints Baron Launcher build information."
    doLast {
        println("Baron Launcher $version")
        println("Modules: launcher-core")
    }
}
