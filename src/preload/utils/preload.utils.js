import { ipcRenderer } from "electron"

export function send(channel, data) {
    let validChannels = []
    if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data)
    } else {
        console.error("can't send data: channel is invalid")
    }
}

export function receive(channel, func) {
    let validChannels = ["sendToRenderer/log"]
    if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(...args))
    } else {
        console.error("can't receive data: channel is invalid")
    }
}
