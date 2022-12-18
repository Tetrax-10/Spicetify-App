import { contextBridge, ipcRenderer } from "electron"

let API = {
    getPlatform: () => ipcRenderer.invoke("getFromElectron/platform"),
    windowControls: (action) => ipcRenderer.send("sendToElectron/windowControls", action),
    writeFile: (args) => ipcRenderer.send("sendToElectron/writeFile", args),
    writeImage: (args) => ipcRenderer.send("sendToElectron/writeImage", args),
}

contextBridge.exposeInMainWorld("electronAPI", API)
