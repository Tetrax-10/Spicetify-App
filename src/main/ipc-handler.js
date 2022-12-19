import { ipcMain } from "electron"
import { windowControls, downloadGithubFile, downloadGithubLatestRelease } from "./Utils/Utils"

export default function handler() {
    ipcMain.handle("getFromElectron/platform", async (event, args) => {
        return process.platform
    })

    ipcMain.on("sendToElectron/windowControls", (event, action) => {
        windowControls(action)
    })

    ipcMain.on("sendToElectron/downloadGithubFile", (event, action) => {
        downloadGithubFile(action)
    })

    ipcMain.on("sendToElectron/downloadGithubLatestRelease", (event, action) => {
        downloadGithubLatestRelease(action)
    })
}
