import { mainWindow } from "../index"
import { app } from "electron"

export function getOS() {
    let os = process.platform

    if (os === "darwin") {
        os = "Mac"
    } else if (os === "win32" || os === "win64") {
        os = "Windows"
    } else if (os === "linux") {
        os = "Linux"
    }

    return os
}

export function getPath(type) {
    const os = getOS()
    const joiner = os === "Windows" ? "\\" : "/"
    const userData = app.getPath("userData")

    switch (type) {
        case "spicetify.exe-path":
            if (os === "Windows") {
                return process.env.LOCALAPPDATA + "\\spicetify"
            }
        case "spicetify.exe":
            if (os === "Windows") {
                return process.env.LOCALAPPDATA + "\\spicetify\\spicetify.exe"
            }
        case "spicetify-user-config":
            return userData
        case "spicetify-extensions-folder":
            return userData + joiner + "Extensions"
        case "spicetify-themes-folder":
            return userData + joiner + "Themes"
        case "spicetify-custom_apps-folder":
            return userData + joiner + "CustomApps"
        default:
            return null
    }
}

export function windowControls(action) {
    switch (action) {
        case "minimize":
            mainWindow.minimize()
            break
        case "maximize":
            mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
            break
        case "close":
            mainWindow.close()
            break
    }
}
