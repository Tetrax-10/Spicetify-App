import { mainWindow } from "./index"

let Utils = {
	windowControls: windowControls,
}

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

export default Utils
