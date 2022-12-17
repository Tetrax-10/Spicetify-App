import { contextBridge, ipcRenderer } from "electron"

let API = {
    log: () => ipcRenderer.invoke("log"),
    getPlatform: () => ipcRenderer.invoke("get/platform"),
    windowControls: (action) => ipcRenderer.send("send/windowControls", action),
}

contextBridge.exposeInMainWorld("electronAPI", API)
