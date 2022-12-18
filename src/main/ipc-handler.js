import { ipcMain } from "electron"
import { windowControls, writeFile, writeImage } from "./Utils/Utils"

export default function handler() {
    ipcMain.handle("getFromElectron/platform", async (event, args) => {
        return process.platform
    })

    ipcMain.on("sendToElectron/windowControls", (event, action) => {
        windowControls(action)
    })

    ipcMain.on("sendToElectron/writeFile", async (event, action) => {
        await writeFile(action)
    })

    ipcMain.on("sendToElectron/writeImage", async (event, action) => {
        await writeImage(action)
    })
}
