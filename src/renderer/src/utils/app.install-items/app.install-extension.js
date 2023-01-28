import extensionManifest from "../../../../public/Extensions.manifest.json"
import { getConfig, saveConfig } from "../app.config"
import { changeInstalledItems } from "./app.install-items"

let CONFIG = getConfig()

export async function installExtension(id) {
    const extensionData = await extensionManifest[id]
    const [, , , user, repo] = extensionData.themeRepoLink.split("/")
    const rawFileLink = `https://raw.githubusercontent.com/${user}/${repo}/${extensionData.branch}/`
    let extensionFiles = extensionData.mainJS.map((path) => {
        changeInstalledItems("extension", path)
        return rawFileLink + path
    })
    saveConfig("installedItems", CONFIG.installedItems)
    await ElectronAPI.downloadExtensions(extensionFiles)
}
// await installExtension("ad-block")
