import { ipcMain } from "electron"
import Utils from "./utils"

export default function handler() {
    ipcMain.handle("get/platform", async (event, args) => {
        return process.platform
    })

    ipcMain.on("send/windowControls", (event, action) => {
        Utils.windowControls(action)
    })

    ipcMain.handle("log", async (event, args) => {
        return null
    })
}
