let CONFIG = structuredClone(ElectronAPI.initConfig)

export function getConfig() {
    return CONFIG
}

export async function saveConfig(item, value) {
    if (item) {
        let tempConfig = await ElectronAPI.getConfig()
        tempConfig[item] = value
        ElectronAPI.saveConfig(tempConfig)
        return
    }
    ElectronAPI.saveConfig(CONFIG)
}
