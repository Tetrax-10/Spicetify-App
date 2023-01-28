import { ipcRenderer } from "electron"

export function ipcRendererListners() {
    console.log("IPC Renderer started Listening to IPC Main")
    ipcRenderer.on("sendToRenderer/log", (event, args) => {
        console.log(args)
    })
}
