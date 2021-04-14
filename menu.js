// Modules
const { Menu, shell, dialog, app } = require('electron')
const fs = require('fs')

const saveSS = (data, ext) => {
	// const filepath = `${__dirname}/ElecSS.${ext}`
	const filepath = `${app.getPath('desktop')}/ElecSS.${ext}`

	dialog
		.showSaveDialog({
			filters: [
				{ name: 'png file', extensions: ['png'] },
				{ name: 'All Files', extensions: ['*'] },
			],
			defaultPath: filepath,
			// defaultPath: app.getPath('desktop'),
		})
		.then((result) => {
			console.log(result)
			if (!result.canceled) {
				fs.writeFile(result.filePath, data, (err) => {
					if (err) throw err

					console.log(result.filePath, 'saved!')
				})
			}
		})
}


// Module function to create main app menu
module.exports = (appWin) => {
	// Menu template
	let template = [
		{
			label: 'ファイル',
			role: 'fileMenu',
		},
		{
			label: 'リスト',
			submenu: [
				{
					label: '追加',
					accelerator: 'CmdOrCtrl+O',
					click: () => {
						appWin.send('menu-show-modal')
					},
				},
				{
					label: 'Electronで開く',
					accelerator: 'CmdOrCtrl+Enter',
					click: () => {
						appWin.send('menu-open-item')
					},
				},
				{
					label: '1件削除',
					accelerator: 'CmdOrCtrl+Backspace',
					click: () => {
						appWin.send('menu-delete-item')
					},
				},
				{
					label: 'ブラウザで開く',
					accelerator: 'CmdOrCtrl+Shift+Enter',
					click: () => {
						appWin.send('menu-open-item-native')
					},
				},
				{
					label: 'Search Items',
					accelerator: 'CmdOrCtrl+F',
					click: () => {
						appWin.send('menu-focus-search')
					},
				},
			],
		},
		{
			label: '編集',
			role: 'editMenu',
		},
		{
			label: 'ウィンドウ',
			submenu: [
				{
					label: 'windowキャプチャー',
					accelerator: 'CmdOrCtrl+P',
					click: () => {
						appWin.capturePage().then((img) => {
							let screenshot = img.toDataURL()
							saveSS(img.toPNG(), 'png')
						})
					},
				},
			],
		},
		{
			label: 'ヘルプ',
			role: 'help',
			submenu: [
				{
					label: 'Learn more',
					click: () => {
						shell.openExternal(
							'https://github.com/stackacademytv/master-electron'
						)
					},
				},
			],
		},
	]

	// Create Mac app menu
	if (process.platform === 'darwin') template.unshift({ role: 'appMenu' })

	if (process.env.NODE_ENV !== 'production') {
		template.push({
			label: 'Dev_Tools',
			submenu: [
				{
					role: 'reload',
				},
				{
					label: 'Toggle DevTools',
					accelerator: process.platform == 'darwin' ? 'Command+Shift+I' : 'F12',
					// process.platform == 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
					// accelerator:
					// 	process.platform == 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
					role: 'toggleDevTools',
					// click(item, focusedWindow) {
					// 	focusedWindow.toggleDevTools()
					// },
				},
			],
		})
	}

	// Build menu
	let menu = Menu.buildFromTemplate(template)

	// Set as main app menu
	Menu.setApplicationMenu(menu)
}
