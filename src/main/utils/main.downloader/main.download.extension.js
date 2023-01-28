import path from "path"

import { downloadGithubFile } from "./main.downloader"
import { getPath, formatPath, logMessageInRenderer } from "../main.utils"

export async function downloadExtensions(urls) {
    try {
        urls.forEach(async (url) => {
            await downloadGithubFile(url, path.join(getPath("spicetify-extensions-folder"), formatPath(["get-fileName", url])))
        })
    } catch (error) {
        logMessageInRenderer(error)
    }
}
