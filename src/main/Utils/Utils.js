import { mainWindow } from "../index"
import path from "path"
import fs from "fs"
import https from "https"
import { pipeline } from "stream/promises"
import { downloadRelease } from "@terascope/fetch-github-release"

function windowControls(action) {
    switch (action) {
        case "minimize":
            mainWindow.minimize()
            break
        case "maximize":
            mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
            break
        case "close":
            mainWindow.close()
            break
    }
}

async function downloadGithubFile(url) {
    return new Promise(async (onSuccess) => {
        https.get(url, async (res) => {
            let fileName = url.split("/").pop()
            const fileWriteStream = fs.createWriteStream(path.join(__dirname, fileName), {
                autoClose: true,
                flags: "w",
            })
            await pipeline(res, fileWriteStream)
            onSuccess("success")
        })
    })
}

function downloadGithubLatestRelease({ user, repo, leaveZipped = true, assetType = "windows-x64" }) {
    let outputdir = path.join(__dirname)
    let disableLogging = false

    function filterRelease(release) {
        return release.prerelease === false
    }

    function filterAsset(asset) {
        return asset.name.includes(assetType)
    }

    downloadRelease(user, repo, outputdir, filterRelease, filterAsset, leaveZipped, disableLogging)
        .then(() => {
            console.log("All done!")
        })
        .catch((err) => {
            console.error(err.message)
        })
}

export { windowControls, downloadGithubFile, downloadGithubLatestRelease }
