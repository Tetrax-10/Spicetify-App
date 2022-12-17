import { app, shell, BrowserWindow } from "electron"
import * as path from "path"
import handler from "./ipc-handler"
const Store = require("electron-store")

let mainWindow
let CONFIG = new Store()
let isDev = !app.isPackaged
let windowPosConfig = {
    width: 1280,
    height: 680,
}
let windowConfig = {
    minWidth: 800,
    minHeight: 600,
    show: false,
    frame: false,
    backgroundColor: "#2e3440",
    autoHideMenuBar: true,
    webPreferences: {
        preload: path.join(__dirname, "../preload/preload.js"),
        nodeIntegration: false,
        devTools: true,
        sandbox: false,
    },
}

function createWindow() {
    Object.assign(windowConfig, windowPosConfig, CONFIG.get("winBounds"))
    mainWindow = new BrowserWindow(windowConfig)

    if (isDev && process.env["ELECTRON_RENDERER_URL"]) {
        // loads app in development env with devtools access: http://localhost:5173
        mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
        mainWindow.webContents.openDevTools()
    } else {
        // opens index.html when packaged and build for production
        mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"))
    }

    // external links (new tab liinks) will be opened in default browser
    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: "deny" }
    })

    mainWindow.on("ready-to-show", () => {
        setTimeout(() => {
            if (windowConfig.isMaximized) {
                mainWindow.maximize()
            } else {
                mainWindow.show()
            }
        }, 300)
    })

    // saves window's properties
    mainWindow.on("close", () => {
        Object.assign(windowPosConfig, { isMaximized: mainWindow.isMaximized() }, mainWindow.getNormalBounds())
        CONFIG.set("winBounds", windowPosConfig)
    })
}

app.whenReady().then(() => {
    handler()
    createWindow()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

export { mainWindow }
