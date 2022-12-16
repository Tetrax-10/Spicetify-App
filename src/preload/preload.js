import { contextBridge, ipcRenderer } from "electron"

let API = {
	log: () => ipcRenderer.invoke("log"),
}

contextBridge.exposeInMainWorld("api", API)
