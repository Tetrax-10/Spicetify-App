import path from "path"

import { downloadGithubFile, createFolder, moveFolder } from "./main.downloader"
import { getPath } from "../main.utils"

export async function downloadTheme(themeFiles) {
    let tempDownloadPath = path.join(process.cwd(), themeFiles.folderName)
    await createFolder(path.join(tempDownloadPath, "assets"))
    await downloadGithubFile(themeFiles.usercss, path.join(tempDownloadPath, "user.css"))
    await downloadGithubFile(themeFiles.colorini, path.join(tempDownloadPath, "color.ini"))
    themeFiles.assets
        ? await themeFiles.assets.flat(Infinity).forEach(async (asset) => {
              let [assetUrl, assetPath] = asset.split("|||")
              await createFolder(path.join(tempDownloadPath, "assets", path.dirname(assetPath)))
              await downloadGithubFile(assetUrl, path.join(tempDownloadPath, "assets", assetPath))
          })
        : null

    await moveFolder(themeFiles.folderName, path.join(getPath("spicetify-themes-folder")))
}
