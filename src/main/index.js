import { app, shell, BrowserWindow } from "electron"
import * as path from "path"
const Store = require("electron-store")

let CONFIG = new Store()
let isDev = !app.isPackaged

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 680,
		show: false,
		frame: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, "../preload/preload.js"),
			nodeIntegration: false,
			devTools: true,
			sandbox: false,
		},
	})

	mainWindow.on("ready-to-show", () => {
		mainWindow.show()
	})

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: "deny" }
	})

	if (isDev && process.env["ELECTRON_RENDERER_URL"]) {
		mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
		mainWindow.webContents.openDevTools()
	} else {
		mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"))
	}
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
	}
})
