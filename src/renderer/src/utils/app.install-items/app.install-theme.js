import themeManifest from "../../../../public/Themes.manifest.json"
import { getConfig, saveConfig } from "../app.config"
import { getFolderContents } from "./app.install-items"

let CONFIG = getConfig()

export async function installTheme(id) {
    const themeData = themeManifest[id]
    const [, , , user, repo] = themeData.themeRepoLink.split("/")
    const rawFileLink = `https://raw.githubusercontent.com/${user}/${repo}/${themeData.branch}/`
    let themeFiles = {
        folderName: id,
        usercss: rawFileLink + themeData.usercss,
        colorini: rawFileLink + themeData.colorini,
        jsHelper: themeData.jsHelper.map((path) => rawFileLink + path),
        assets: themeData.assetsFolder ? await getFolderContents(user, repo, themeData.assetsFolder, rawFileLink) : null,
    }
    await ElectronAPI.downloadTheme(themeFiles)
}
// installTheme(CONFIG.installedItems.theme)
