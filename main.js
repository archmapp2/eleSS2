// Modules
const { app, BrowserWindow, ipcMain } = require('electron')
const windowStateKeeper = require('electron-window-state')
const readItem = require('./readItem') // offscreenWindow
const appMenu = require('./menu')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Listen for new item request
ipcMain.on('new-item', (e, itemUrl) => {
	// Get new item and send back to renderer
	readItem(itemUrl, (item) => {
		e.sender.send('new-item-success', item)
	})
})

// Create a new BrowserWindow when `app` is ready
function createWindow() {
	// Win state keeper
	let state = windowStateKeeper({
		defaultWidth: 500,
		defaultHeight: 650,
	})

	mainWindow = new BrowserWindow({
		x: state.x,
		y: state.y,
		width: state.width,
		height: state.height,
		minWidth: 350,
		maxWidth: 950,
		minHeight: 300,
		webPreferences: {
			nodeIntegration: true,
			// contextIsolation: true // プロセス間でwindowが同一のオブジェクトではない
			// ==> contextBridge
			// nativeWindowOpen: true,
			// webviewTag: true,
		},
	})

	// Create main app menu
	appMenu(mainWindow)

	// Load index.html into the new BrowserWindow
	mainWindow.loadFile('renderer/main.html')

	// Manage new window state
	state.manage(mainWindow)

	// Open DevTools - Remove for PRODUCTION!
	// mainWindow.webContents.openDevTools()

	// Listen for window being closed
	mainWindow.on('closed', () => {
		// debugger
		mainWindow = null
	})

	mainWindow.on('focus', () => {
		mainWindow.webContents.send('ping', 'whoooooooh!')
		// console.log('mainWindow focused')
	})
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
	if (mainWindow === null) createWindow()
})

// app.on('browser-window-focus', e => {
//   console.log('App focused')
// })

const capturePage = () => {
	mainWindow.webContents.capturePage().then((image) => {
		let screenshot = image.toDataURL()
		let title = mainWindow.getTitle()
		console.log(
			'🚀 ~ file: main.js ~ line 87 ~ mainWindow.webContents.capturePage ~ title',
			title
		)
	})
}
