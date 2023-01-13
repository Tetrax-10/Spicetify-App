import { ipcMain } from "electron"

import { getOS, getPath, windowControls, formatPath } from "./utils/main.utils"
import { getConfig, saveConfig } from "./utils/main.config"
import { execShellCommands } from "./utils/main.shell"
import { downloadGithubFile, downloadGithubLatestRelease } from "./utils/main.downloader/main.downloader"
import { downloadTheme } from "./utils/main.downloader/main.download.theme"

export default function handler() {
    ////////// Get Info //////////
    ipcMain.handle("getFromElectron/getOS", async (event) => {
        return getOS()
    })
    ipcMain.handle("getFromElectron/getPath", async (event, type) => {
        return getPath(type)
    })
    ipcMain.handle("getFromElectron/formatPath", async (event, data) => {
        return formatPath(data)
    })

    ////////// Send Instructions //////////
    ipcMain.on("sendToElectron/windowControls", (event, action) => {
        windowControls(action)
    })
    ipcMain.on("sendToElectron/execShellCommands", (event, commands) => {
        execShellCommands(commands)
    })

    ////////// Downloader //////////
    ipcMain.on("sendToElectron/downloadGithubFile", (event, url) => {
        downloadGithubFile(url)
    })
    ipcMain.on("sendToElectron/downloadGithubLatestRelease", (event, data) => {
        downloadGithubLatestRelease(data)
    })
    ipcMain.on("sendToElectron/downloadTheme", (event, url) => {
        downloadTheme(url)
    })

    ////////// Config //////////
    ipcMain.handle("getFromElectron/getConfig", (event, item) => {
        return getConfig(item)
    })
    ipcMain.on("sendToElectron/saveConfig", (event, data) => {
        saveConfig(data)
    })
}
