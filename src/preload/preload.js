import { contextBridge, ipcRenderer } from "electron"
import { ipcRendererListners } from "./preload.ipc-helper"
import { send, receive } from "./utils/preload.utils"
import { initConfig } from "./utils/preload.config"
;(async () => {
    ipcRendererListners()

    const ElectronAPI = {
        ////////// Utils //////////
        send,
        receive,

        ////////// Get Info //////////
        getOS: () => ipcRenderer.invoke("getFromElectron/getOS"),
        getPath: (type) => ipcRenderer.invoke("getFromElectron/getPath", type),

        ////////// Send Instructions //////////
        windowControls: (action) => ipcRenderer.send("sendToElectron/windowControls", action),
        execShellCommands: (array) => ipcRenderer.send("sendToElectron/execShellCommands", array),

        ////////// Downloader //////////
        downloadGithubFile: (url) => ipcRenderer.send("sendToElectron/downloadGithubFile", url),
        downloadGithubLatestRelease: (user, repo, assetType) => ipcRenderer.send("sendToElectron/downloadGithubLatestRelease", [user, repo, assetType]),
        downloadTheme: (themeFiles) => ipcRenderer.send("sendToElectron/downloadTheme", themeFiles),

        ////////// Config //////////
        initConfig: await initConfig(),
        getConfig: () => ipcRenderer.invoke("getFromElectron/getConfig", "rendererSettings"),
        saveConfig: (config) => ipcRenderer.send("sendToElectron/saveConfig", ["rendererSettings", config]),
    }

    contextBridge.exposeInMainWorld("ElectronAPI", ElectronAPI)
})()
