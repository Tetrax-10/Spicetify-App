import { spawn } from "child_process"

import { logMessageInRenderer } from "./main.utils"

export function execShellCommands(commands) {
    let shellProcess = spawn("powershell.exe", [commands[0]])

    shellProcess.stdout.on("data", (data) => {
        logMessageInRenderer(data.toString())
    })
    shellProcess.stderr.on("data", (data) => {
        logMessageInRenderer("error: " + data.toString())
    })
    shellProcess.on("exit", () => {
        commands.shift()
        if (0 < commands.length) {
            execShellCommands(commands)
            logMessageInRenderer("command-executed")
        } else {
            logMessageInRenderer("all-commands-executed")
        }
    })
}
