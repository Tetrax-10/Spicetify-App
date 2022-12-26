import { mainWindow } from "../index"
import { app } from "electron"
import path from "path"
import fs from "fs"
import https from "https"
import { pipeline } from "stream/promises"
import { downloadRelease } from "@terascope/fetch-github-release"
import { spawn } from "child_process"

export function getOS() {
    let os = process.platform

    if (os === "darwin") {
        os = "Mac"
    } else if (os === "win32" || os === "win64") {
        os = "Windows"
    } else if (os === "linux") {
        os = "Linux"
    }

    return os
}

export function getPath(type) {
    const os = getOS()
    const joiner = os === "Windows" ? "\\" : "/"
    const userData = app.getPath("userData")

    switch (type) {
        case "spicetify.exe-path":
            if (os === "Windows") {
                return process.env.LOCALAPPDATA + "\\spicetify"
            }
        case "spicetify.exe":
            if (os === "Windows") {
                return process.env.LOCALAPPDATA + "\\spicetify\\spicetify.exe"
            }
        case "spicetify-user-config":
            return userData
        case "spicetify-extensions-folder":
            return userData + joiner + "Extensions"
        case "spicetify-themes-folder":
            return userData + joiner + "Themes"
        case "spicetify-custom_apps-folder":
            return userData + joiner + "CustomApps"
        default:
            return null
    }
}

export function windowControls(action) {
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

export async function downloadGithubFile(url) {
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

export function downloadGithubLatestRelease({ user, repo, leaveZipped = true, assetType = "windows-x64" }) {
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

export function execShellCommands(commands) {
    let shellProcess = spawn("powershell.exe", [commands[0]])

    shellProcess.stdout.on("data", (data) => {
        mainWindow.webContents.send("sendToRenderer/shell-output", data.toString())
    })
    shellProcess.stderr.on("data", (data) => {
        mainWindow.webContents.send("sendToRenderer/shell-output", "stderr: " + data.toString())
    })
    shellProcess.on("exit", () => {
        commands.shift()
        if (0 < commands.length) {
            execShellCommands(commands)
            mainWindow.webContents.send("sendToRenderer/shell-output", "command-executed")
        } else {
            mainWindow.webContents.send("sendToRenderer/shell-output", "all-commands-executed")
        }
    })
}
