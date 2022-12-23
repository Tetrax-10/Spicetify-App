import { ipcMain } from "electron"
import { getOS, getPath, windowControls, downloadGithubFile, downloadGithubLatestRelease, execShellCommands } from "./Utils/Utils"

export default function handler() {
    ipcMain.handle("getFromElectron/getOS", async (event, args) => {
        return getOS()
    })
    ipcMain.handle("getFromElectron/getPath", (event, type) => {
        return getPath(type)
    })
    ipcMain.on("sendToElectron/windowControls", (event, action) => {
        windowControls(action)
    })
    ipcMain.on("sendToElectron/downloadGithubFile", (event, url) => {
        downloadGithubFile(url)
    })
    ipcMain.on("sendToElectron/downloadGithubLatestRelease", (event, args) => {
        downloadGithubLatestRelease(args)
    })
    ipcMain.on("sendToElectron/execShellCommands", (event, commands) => {
        execShellCommands(commands)
    })
}
