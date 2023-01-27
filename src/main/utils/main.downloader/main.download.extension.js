import path from "path"

import { downloadGithubFile, createFolder, moveFolder, removeFolder } from "./main.downloader"
import { getPath, formatPath } from "../main.utils"

export async function downloadExtensions(urls) {
    let tempDownloadPath = path.join(process.cwd(), "tempExtensionFolder")
    await createFolder(tempDownloadPath)

    urls.forEach(async (url) => {
        await downloadGithubFile(url, path.join(tempDownloadPath, formatPath(["get-fileName", url])))
    })

    await moveFolder(path.join(tempDownloadPath, "*"), path.join(getPath("spicetify-extensions-folder")))

    await removeFolder(tempDownloadPath)
}
