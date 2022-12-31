import { ipcRenderer } from "electron"
import defaultConfig from "../../public/defaultConfig.json"

export async function initConfig() {
    let userConfig = await ipcRenderer.invoke("getFromElectron/getConfig", "rendererSettings")
    let tempConfig = {}
    if (userConfig !== undefined && typeof userConfig === "object") {
        Object.keys(defaultConfig).forEach((item) => {
            if (userConfig[item] === undefined) {
                tempConfig[item] = defaultConfig[item]
            } else {
                tempConfig[item] = userConfig[item]
            }
        })
        ipcRenderer.send("sendToElectron/saveConfig", ["rendererSettings", tempConfig])
        return tempConfig
    } else {
        ipcRenderer.send("sendToElectron/saveConfig", ["rendererSettings", defaultConfig])
        return defaultConfig
    }
}
