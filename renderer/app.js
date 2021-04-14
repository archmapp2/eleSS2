// Modules
const { ipcRenderer } = require('electron')
const items = require('./items')

// Dom Nodes
const addBtn = $$q('.modalBtnOK')
const itemUrl = $$Id('url')
const search = $$Id('search')

$$de(() => {
	// $$codeS('#pre1')
	$$qAe_ocL('.modalBtn', '#modalTrgt')
	$$qcL_f('.modalBtn_f', { selT: '#modalTrgt' }, () => {
		$$Id('url').focus()
		$$q('.modalBtnOK').disabled = false
		$$q('.modalBtnOK').style.opacity = 1
		$$ocL(addBtn, 'is-loading', 'remove')
	})
	// Quickview extension
	bulmaQuickview.attach()
})

ipcRenderer.on('ping', (event, message) => {
	if (items.readerWin) {
		items.readerWin.close()
		items.readerWin = null
	}
	// console.log(message)
})

// Open modal from menu
ipcRenderer.on('menu-show-modal', () => {
	$$q('.modalBtn_f').click()
})

// Open selected item from menu
ipcRenderer.on('menu-open-item', () => {
	items.open()
})

// Delete selected item from menu
ipcRenderer.on('menu-delete-item', () => {
	items.delete()
})

// Open item in native browser from menu
ipcRenderer.on('menu-open-item-native', () => {
	items.openNative()
})

// Focus the search input from the menu
ipcRenderer.on('menu-focus-search', () => {
	search.focus()
})

ipcRenderer.on('focus', () => {
	search.focus()
})

// Filter items with "search"
$$oe(
	search,
	(e) => {
		setFilter()
	},
	'keyup'
)

const setFilter = () => {
	let i = 0
	Array.from($$qAll('.read-item')).forEach((item) => {
		// Hide items that don't match search value
		let hasMatch = item.innerText
			.toLowerCase()
			.includes(search.value.toLowerCase())
		if (hasMatch) {
			item.style.display = 'flex'
			i++
		} else {
			item.style.display = 'none'
		}
	})
	items.tagNset(i)
}
// Navigate item selection with up/down arrows
$$oe(
	document,
	(e) => {
		// console.log(e.key)
		if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			e.preventDefault()
			items.changeSelection(e.key)
		}
	},
	'keydown'
)

// Handle new item
$$oe(addBtn, (e) => {
	if (itemUrl.value) {
		$$ocL(addBtn, 'is-loading', 'add')
		addBtn.disabled = true
		addBtn.style.opacity = 0.5
		ipcRenderer.send('new-item', itemUrl.value)
		// Disable buttons
		// toggleModalButtons()
	}
})

// Listen for new item from main process
ipcRenderer.on('new-item-success', (e, item) => {
	items.insTopHTML(item)
	items.storage.unshift(item)
	items.lSsave()
	items.tagNset()

	itemUrl.value = ''
	search.value = ''
	setFilter()
	$$qcL('#modalTrgt')
})

$$oe(
	itemUrl,
	(e) => {
		if (e.key === 'Enter') addBtn.click()
	},
	'keyup'
)
