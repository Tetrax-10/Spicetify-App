import { app } from "electron"
import path from "path"

import { mainWindow } from "../index"

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
    const userData = app.getPath("userData").replace("spicetify-app", "spicetify")

    switch (type) {
        case "spicetify.exe-path":
            if (os === "Windows") {
                return path.join(process.env.LOCALAPPDATA, "spicetify")
            }
            break
        case "spicetify.exe":
            if (os === "Windows") {
                return path.join(process.env.LOCALAPPDATA, "spicetify", "spicetify.exe")
            }
            break
        case "spicetify-user-config":
            return userData
        case "spicetify-extensions-folder":
            return path.join(userData, "Extensions")
        case "spicetify-themes-folder":
            return path.join(userData, "Themes")
        case "spicetify-custom_apps-folder":
            return path.join(userData, "CustomApps")
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

export function formatPath(rawData) {
    let [type, data] = rawData
    switch (type) {
        case "get-fileName":
            return path.basename(data)
        default:
            return null
    }
}

export function logMessageInRenderer(message) {
    mainWindow.webContents.send("sendToRenderer/log", message)
}
