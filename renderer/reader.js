// Create button in remote content to mark item as "Done"
let readitClose = document.createElement('div')
readitClose.innerText = '削除'

// Style button
readitClose.style.position = 'fixed'
readitClose.style.bottom = '15px'
readitClose.style.right = '15px'
readitClose.style.padding = '5px 10px'
readitClose.style.fontSize = '20px'
readitClose.style.fontWeight = 'bold'
readitClose.style.background = 'red'
readitClose.style.color = 'white'
readitClose.style.borderRadius = '5px'
readitClose.style.cursor = 'default'
readitClose.style.boxShadow = '4px 4px 4px rgba(0,0,0,0.5)'
readitClose.style.zIndex = '9999'

// Attach click handler
readitClose.onclick = (e) => {
	// Message parent (opener) window
	window.opener.postMessage(
		// message
		// 他のウィンドウに送られるデータ。
		// データは the structured clone algorithm に従ってシリアル化されます。
		{
			action: 'delete-reader-item',
			itemIndex: '{{index}}',
		},
		'*'
	)
}

// Append button to body
// document.getElementsByTagName('body')[0].append(readitClose)
document.querySelector('body').append(readitClose)

// document.querySelector('body').insertAdjacentElement('beforeend', readitClose) // Uncaught (in promise) Error: Error invoking remote method 'ELECTRON_GUEST_WINDOW_MANAGER_WEB_CONTENTS_METHOD': Error: An object could not be cloned.
