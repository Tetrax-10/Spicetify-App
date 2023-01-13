import { spawn } from "child_process"

import { mainWindow } from "../index"

export function execShellCommands(commands) {
    let shellProcess = spawn("powershell.exe", [commands[0]])

    shellProcess.stdout.on("data", (data) => {
        mainWindow.webContents.send("sendToRenderer/shell-output", data.toString())
    })
    shellProcess.stderr.on("data", (data) => {
        mainWindow.webContents.send("sendToRenderer/shell-output", "error: " + data.toString())
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
