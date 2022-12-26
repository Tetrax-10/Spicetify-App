import { contextBridge, ipcRenderer } from "electron"
import { ipcRendererListners } from "./ipc-handler-helpers"

ipcRendererListners()

let API = {
    send: (channel, data) => {
        let validChannels = []
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data)
        } else {
            console.error("can't send data: channel is invalid")
        }
    },
    receive: (channel, func) => {
        let validChannels = ["sendToRenderer/shell-output"]
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args))
        } else {
            console.error("can't receive data: channel is invalid")
        }
    },
    getOS: () => ipcRenderer.invoke("getFromElectron/getOS"),
    getPath: (action) => ipcRenderer.invoke("getFromElectron/getPath", action),
    windowControls: (action) => ipcRenderer.send("sendToElectron/windowControls", action),
    downloadGithubFile: (action) => ipcRenderer.send("sendToElectron/downloadGithubFile", action),
    downloadGithubLatestRelease: (action) => ipcRenderer.send("sendToElectron/downloadGithubLatestRelease", action),
    execShellCommands: (action) => ipcRenderer.send("sendToElectron/execShellCommands", action),
}

contextBridge.exposeInMainWorld("ElectronAPI", API)
