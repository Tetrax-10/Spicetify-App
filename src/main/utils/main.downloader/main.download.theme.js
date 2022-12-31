import path from "path"
import { downloadGithubFile, createFolder } from "./main.downloader"

const CWD = process.cwd()

export async function downloadTheme(themeFiles) {
    let tempDownloadPath = path.join(CWD, themeFiles.folderName)
    await createFolder(path.join(tempDownloadPath, "assets"))
    await downloadGithubFile(themeFiles.usercss, path.join(tempDownloadPath, "user.css"))
    await downloadGithubFile(themeFiles.colorini, path.join(tempDownloadPath, "color.ini"))
    themeFiles.assets
        ? themeFiles.assets.flat(Infinity).forEach(async (asset) => {
              let [assetUrl, assetPath] = asset.split("|||")
              await createFolder(path.join(tempDownloadPath, "assets", path.dirname(assetPath)))
              await downloadGithubFile(assetUrl, path.join(tempDownloadPath, "assets", assetPath))
          })
        : null
}
// downloadTheme(themeFiles)
