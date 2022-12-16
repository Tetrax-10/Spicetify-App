import { app, shell, BrowserWindow, ipcMain } from "electron"
import * as path from "path"
const Store = require("electron-store")

let CONFIG = new Store()
let isDev = !app.isPackaged
let windowConfig = {
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
}

function createWindow() {
	Object.assign(windowConfig, CONFIG.get("winBounds"))

	const mainWindow = new BrowserWindow(windowConfig)

	mainWindow.on("ready-to-show", () => {
		mainWindow.show()
	})

	// external links (new tab liinks) will be opened in default browser
	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: "deny" }
	})

	if (isDev && process.env["ELECTRON_RENDERER_URL"]) {
		// loads app in development env with devtools access: http://localhost:5173
		mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
		mainWindow.webContents.openDevTools()
	} else {
		// opens index.html when packaged and build for production
		mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"))
	}

	// saves window's properties
	mainWindow.on("close", () => {
		CONFIG.set("winBounds", mainWindow.getBounds())
	})

	ipcMain.handle("log", async (event, args) => {
		return process.env["ELECTRON_RENDERER_URL"]
	})
}

app.whenReady().then(() => {
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
