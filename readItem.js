// Modules
const { BrowserWindow } = require('electron')

// Offscreen BrowserWindow
let offscreenWindow

// Exported readItem function
module.exports = (url, callback) => {
	// Create offscreen window
	offscreenWindow = new BrowserWindow({
		width: 500,
		height: 500,
		show: false,
		webPreferences: {
			offscreen: true,
		},
	})

	// Load item url
	offscreenWindow.loadURL(url)

	offscreenWindow.webContents.on('did-fail-load', (e) => {
		console.log('did-fail-load')
	})

	// Wait for content to finish loading
	offscreenWindow.webContents.on('did-finish-load', (e) => {
		let title = offscreenWindow.getTitle()

		// Get screenshot (thumbnail)
		offscreenWindow.webContents.capturePage().then((image) => {
			let screenshot = image.toDataURL()

			// Execute callback with new item object
			callback({ title, screenshot, url })

			// Clean up
			offscreenWindow.close()
			offscreenWindow = null
		})
	})
}
