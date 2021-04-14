// Modules
const { shell } = require('electron')
const fs = require('fs')

// DOM nodes
let itemsDIV = document.getElementById('items')
let sItem = null
let sItemIndex = -1

exports.tagNset = (i = this.storage.length) => {
	$$Id('tagN').textContent = `${i} / ${this.storage.length}`
}

const makeHTML = (item) => {
	// !(event)
	// click イベントのイベントリスナーが二回呼び出されたあとに dblclick イベントのイベントリスナが―呼び出されます。
	const HTML = `
    <article
      class="read-item media"
      data-url="${item.url}"
      onclick="items.select(event)"
      ondblclick="items.open(event)"
    >
      <figure class="media-left">
        <div class="image is-128x128">
          <img src="${item.screenshot}" />
        </div>
      </figure>
      <div class="media-content">
        <div class="content">
          <div>
            <strong>(${item.No})</strong>
            <small
              ><time datetime="${item.time}"> ${item.time}</time></small
            >
          </div>
          <h2>HELLO (${item.No})</h2>
          <p>${item.title}</p>
        </div>
        <div>
          <small title="goto Hell!"><a href="${item.url}">${item.url}</a></small>
        </div>
      </div>
    </article>
  `
	return HTML
}

// Persist storage
exports.lSsave = () => {
	localStorage.setItem('readit-items', JSON.stringify(this.storage))
}

exports.lSget = () => {
	return JSON.parse(localStorage.getItem('readit-items'))
}

// Track items in storage
exports.storage = this.lSget() || []
this.storage.forEach((item) => {
	itemsDIV.insertAdjacentHTML('beforeend', makeHTML(item))
	// itemsDIV.innerHTML += makeHTML(item) ... not good enough
})
this.tagNset()

// Add new item
exports.insTopHTML = (item) => {
	if (this.storage.length >= 1) {
		item.No = this.storage[0].No + 1
	} else {
		item.No = 0
	}
	item.time = new Date()

	itemsDIV.insertAdjacentHTML('afterbegin', makeHTML(item))
	// itemsDIV.innerHTML = makeHTML(item) + itemsDIV.innerHTML ... not good enough
	// itemsDIV.innerHTML += makeHTML(item)

	if ($$qoAll(itemsDIV, '.read-item').length === 1) {
		sItem = itemsDIV.firstElementChild
		sItem.classList.add('selected')
		sItemIndex = 0
	}
}

if (1 <= this.storage.length) {
	sItem = itemsDIV.firstElementChild
	sItem.classList.add('selected')
	sItemIndex = 0
}

// Listen for "done" message from reader window
window.addEventListener('message', (e) => {
	// Check for correct message
	if (e.data.action === 'delete-reader-item') {
		// Delete item at given index
		// this.delete(e.data.itemIndex)
		this.delete()

		// Close the reader window
		e.source.close()
	}
})

// Delete item
exports.delete = () => {
	if (!sItem) return

	itemsDIV.removeChild(sItem)
	this.storage.splice(sItemIndex, 1)
	this.lSsave()

	this.tagNset()
	if (1 <= this.storage.length) {
		sItemIndex = sItemIndex === 0 ? 0 : sItemIndex - 1

		// Select item at new index
		sItem = $$qoAll(itemsDIV, '.read-item')[sItemIndex]
		sItem.classList.add('selected')
	} else {
		sItem = null
		sItemIndex = -1
	}
}

// Set item as selected
exports.select = (e) => {
	// Remove currently selected item class
	sItem.classList.remove('selected')

	sItem = e.currentTarget
	sItemIndex = Array.from($$qoAll(itemsDIV, '.read-item')).indexOf(
		e.currentTarget
	)
	// console.log("sItemIndex:", sItemIndex)
	sItem.classList.add('selected')
}

// Move to newly selected item
exports.changeSelection = (direction) => {
	if (!sItem) return

	// Handle up/down
	if (direction === 'ArrowUp' && sItem.previousElementSibling) {
		sItem.classList.remove('selected')
		sItem = sItem.previousElementSibling
		sItem.classList.add('selected')
		sItemIndex--
	} else if (direction === 'ArrowDown' && sItem.nextElementSibling) {
		sItem.classList.remove('selected')
		sItem = sItem.nextElementSibling
		sItem.classList.add('selected')
		sItemIndex++
	}
}

// Open selected item in native browser
exports.openNative = () => {
	// Only if we have items (in case of menu open)
	if (!this.storage.length) return

	// Open in user's default system browser
	shell.openExternal(this.storage[sItemIndex].url)
}

exports.readerWin = null
// Open selected item
exports.open = () => {
	// Only if we have items (in case of menu open)
	if (!sItem) return

	// Open item in proxy BrowserWindow
	this.readerWin = window.open(
		this.storage[sItemIndex].url,
		'',
		`
    maxWidth=2000,
    maxHeight=2000,
    width=1200,
    height=800,
    backgroundColor=#DEDEDE,
    nodeIntegration=0,
    contextIsolation=1
  `
	)
	// contextIsolation: true
	// trueとすると、preload.jsから呼び出したwindowと、
	// index.htmlで呼び出すwindowのインスタンスが別物になってしまいます。

	// Inject JavaScript with specific item index (selectedItem.index)

	// Get readerJS content
	let readerJS
	fs.readFile(`${__dirname}/reader.js`, (err, data) => {
		// fs.readFile(`${__dirname}/readerHTML.js`, (err, data) => {
		readerJS = data.toString()
		this.readerWin.eval(readerJS.replace("'{{index}}'", sItemIndex))
		// this.readerWin.eval(
		// 	`document
		// 		.querySelector('body')
		// 		.insertAdjacentHTML('beforeend', readerJS)`
		// )
	})
}
