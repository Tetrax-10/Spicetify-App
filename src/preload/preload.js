import { contextBridge, ipcRenderer } from "electron"

let API = {
    getPlatform: () => ipcRenderer.invoke("getFromElectron/platform"),
    windowControls: (action) => ipcRenderer.send("sendToElectron/windowControls", action),
    downloadGithubFile: (action) => ipcRenderer.send("sendToElectron/downloadGithubFile", action),
    downloadGithubLatestRelease: (action) => ipcRenderer.send("sendToElectron/downloadGithubLatestRelease", action),
}

contextBridge.exposeInMainWorld("electronAPI", API)
