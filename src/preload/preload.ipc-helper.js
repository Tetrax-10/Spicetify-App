import { ipcRenderer } from "electron"

export function ipcRendererListners() {
    console.log("IPC Renderer started Listening to IPC Main")
    ipcRenderer.on("sendToRenderer/shell-output", (event, args) => {
        console.log(args)
    })
}
