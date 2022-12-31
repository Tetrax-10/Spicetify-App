import Store from "electron-store"

let CONFIG = new Store()

export function getConfig(item) {
    return CONFIG.get(item)
}

export function saveConfig(data) {
    let [item, value] = data
    CONFIG.set(item, value)
}
