import path from "path"

import { downloadGithubFile, createFolder } from "./main.downloader"
import { getPath } from "../main.utils"

export async function downloadTheme(themeFiles) {
    let themePath = path.join(getPath("spicetify-themes-folder"), themeFiles.folderName)
    await createFolder(path.join(themePath, "assets"))
    await downloadGithubFile(themeFiles.usercss, path.join(themePath, "user.css"))
    await downloadGithubFile(themeFiles.colorini, path.join(themePath, "color.ini"))
    if (themeFiles.assets) {
        await themeFiles.assets.flat(Infinity).forEach(async (asset) => {
            let [assetUrl, assetPath] = asset.split("|||")
            await createFolder(path.join(themePath, "assets", path.dirname(assetPath)))
            await downloadGithubFile(assetUrl, path.join(themePath, "assets", assetPath))
        })
    }
}
