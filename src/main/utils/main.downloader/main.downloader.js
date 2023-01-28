import path from "path"
import fs from "fs"
import https from "https"
import { pipeline } from "stream/promises"
import { downloadRelease } from "@terascope/fetch-github-release"

export async function downloadGithubFile(url, filePath) {
    return new Promise(async (onSuccess) => {
        https.get(url, async (res) => {
            const fileWriteStream = fs.createWriteStream(filePath, {
                autoClose: true,
                flags: "w",
            })
            await pipeline(res, fileWriteStream)
            onSuccess("success")
        })
    })
}

export function downloadGithubLatestRelease(data) {
    let [user, repo, assetType] = data
    let outputdir = path.join(__dirname, "temp")
    let leaveZipped = true
    let disableLogging = false

    function filterRelease(release) {
        return release.prerelease === false
    }

    function filterAsset(asset) {
        return asset.name.includes(assetType)
    }

    downloadRelease(user, repo, outputdir, filterRelease, filterAsset, leaveZipped, disableLogging)
        .then(() => {
            console.log(`downloaded ${repo}'s latest release`)
        })
        .catch((err) => {
            console.error(err.message)
        })
}

export async function createFolder(path) {
    await fs.promises.mkdir(path, { recursive: true })
}

export async function moveFolder(src, destination) {
    fs.rename(src, destination, (err) => {
        if (err) throw err
    })
}
