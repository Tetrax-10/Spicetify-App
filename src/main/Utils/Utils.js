import { mainWindow } from "../index"
import path from "path"
import fs from "fs"
import { Buffer } from "buffer"

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

async function writeFile({ content, fileName }) {
    await fs.promises.writeFile(path.join(__dirname, fileName), content)
}

async function writeImage({ binaryData, fileName }) {
    let formatedBinaryData = binaryData.match(/^data:image\/\w+;base64,(.+)$/)[1]
    let buffer = Buffer.from(formatedBinaryData, "base64")
    await writeFile({ content: buffer, fileName: fileName })
}

export { windowControls, writeFile, writeImage }
