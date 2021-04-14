// shortBulma$$.js

// ss: String, not selector
const $$Id0 = (id) => {
	return document.getElementById(id)
}
const $$Id = (id) => {
	id = id.substring(0, 1) === '#' ? id.substring(1) : id
	return document.getElementById(id)
}

// selector
const $$q = (sel) => document.querySelector(sel)
const $$qAll = (sel) => document.querySelectorAll(sel)
const $$oq = (o, sel) => o.querySelector(sel)
const $$qoAll = (o, sel) => o.querySelectorAll(sel)

const $$de = (f) => {
	document.addEventListener('DOMContentLoaded', f)
}

const $$oe = (o, f, evNa = 'click') => {
	o.addEventListener(evNa, f)
}

const $$oeon = (o, f, evNa = 'click') => {
	o.on(evNa, f)
}

const $$dqoe = (sel, f) => {
	$$de(() => $$qe(sel, f))
}

const $$qecL = (sel, selT, cN = 'is-active', mN = 'toggle') => {
	$$qe(sel, (e) => {
		e.stopPropagation()
		$$qcL(sel, cN, mN)
		$$qcL(selT, cN, mN)
	})
}

const $$qe = (sel, f, evNa = 'click') => {
	// console.log('$$qe', sel);
	$$oe($$q(sel), f, evNa)
}

const $$doe = (o, f, evNa = 'click') => {
	$$de(() => $$oe(o, f, evNa))
}

const $$qAe = (sel, f, evNa = 'click') => {
	$$qAll(sel).forEach((o) => {
		$$oe(o, (e) => f(e), evNa)
	})
}

const $$qAe_ocL = (sel, selTrgt, evNa = 'click', f = () => {}) => {
	$$qAll(sel).forEach((o) => {
		$$oe(o, () => $$ocL($$q(selTrgt)), evNa)
	})
}

const $$qcL = (sel, cN = 'is-active', mN = 'toggle') =>
	$$q(sel).classList[mN](cN)

const $$ocL = (o, cN = 'is-active', mN = 'toggle') => {
	o.classList[mN](cN)
}

const $$qcLAll = (selS, sel, cN, change, evNa = 'toggle') => {
	$$qe(
		selS,
		(e) => {
			$$qAll(sel).forEach((o) => $$ocL(o, cN, evNa))
		},
		change
	)
}

// $$qcLAll('#switchE2', '.square', 'square_w', 'change');

const $$qcLm = (
	sel,
	{ selT, cN = 'is-active' },
	mN = 'toggle',
	stopP = true
) => {
	$$ocLm($$q(sel), { trgt: $$q(selT), cN }, mN, stopP)
}

const $$ocLm = (o, { trgt, cN = 'is-active' }, mN = 'toggle', stopP = true) => {
	$$oe(o, (e) => {
		if (stopP) e.stopPropagation()
		trgt.classList[mN](cN)
	})
}

const $$qcL_f = (
	sel,
	{ selT, cN = 'is-active' },
	f = () => {},
	mN = 'toggle',
	stopP = true
) => {
	// console.log(sel, selT)
	$$ocL_f($$q(sel), { trgt: $$q(selT), cN }, f, mN, stopP)
}

const $$ocL_f = (
	o,
	{ trgt, cN = 'is-active' },
	f = () => {},
	mN = 'toggle',
	stopP = true
) => {
	$$oe(o, (e) => {
		if (stopP) e.stopPropagation()
		trgt.classList[mN](cN)
		f()
	})
}

const $$oAcLm = (
	o,
	{ trgts, cN = 'is-active' }, // trgts: array
	mN = 'toggle',
	stopP = true
) => {
	$$oe(o, (e) => {
		if (stopP) e.stopPropagation()
		trgts.forEach((t) => t.classList[mN](cN))
	})
}

const $$DF = () => new DocumentFragment()

const $$oes = (o, f) => {
	o.addEventListener('submit', f)
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  <template> 要素は、そのHTMLTemplateElement.contentプロパティにDocumentFragmentを含みます。

const $$mkTemplate = (id, v) => {
	const template = document.createElement('template')
	template.id = id
	template.innerHTML = v
	$$q('body').appendChild(template)
}

const $$tC = (id) => {
	return $$Id(id).content
}

const $$tCc = (id, b = true) => {
	return document.importNode($$tC(id), b)
}

const $$tCco = (o, b = true) => {
	return document.importNode(o, b)
}

const $$da_t = (id) => document.body.appendChild($$tCc(id))
const $$oa_t = (o, id) => o.appendChild($$tCc(id))
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const $$ogA = (o, ss) => o.getAttribute('data-' + ss)
const $$ogD = (o, ss) => o.dataset[ss]
const $$qogA = (sel, ss) => $$q(sel).getAttribute('data-' + ss)
const $$qogD = (sel, ss) => $$q(sel).dataset[ss]

const $$na = (ss) => document.getElementsByName(ss) // form radio

const $$getRadioValue = (na) => {
	let ret = ''

	$$na(na).forEach((elm) => {
		if (elm.checked) {
			ret = elm.value
		}
	})
	return ret
}

const $$hbs = (ss, context) => Handlebars.compile(ss)(context)
const $$hbP = (ssP, context) => Handlebars.templates[ssP](context)

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const $$bulmaMenu = (ss, ssT) => {
	// $$de( () => {... この中で使う } )
	$$qecL(ss, ssT)
	$$qe('body', (e) => {
		// bodyをクリックしてメニューを消す
		e.stopPropagation()
		if ($$q(ss).classList.contains('is-active')) {
			$$qcL(ss)
			$$qcL(ssT)
		}
	})
}

const $$bulmaTabs = (ssTabs, ssContent) => {
	const tabs = $$qAll(ssTabs)
	const boxes = $$qAll(ssContent)

	tabs.forEach((tab) => {
		const target = $$Id(tab.dataset.target)

		$$oe(tab, () => {
			$$bulmaTab(tabs, tab)
			$$bulmaTabR(boxes, target, 'is-hidden')
		})
	})
}

// $$bulmaTabs('.tabs li', '#tab-content > div');

const $$bulmaTab = (items, target, cN = 'is-active') => {
	items.forEach((item) => {
		if (item === target) {
			$$ocL(item, cN, 'add')
		} else {
			$$ocL(item, cN, 'remove')
		}
	})
}

const $$bulmaTabR = (items, target, cN = 'is-active') => {
	items.forEach((item) => {
		if (item === target) {
			$$ocL(item, cN, 'remove')
		} else {
			$$ocL(item, cN, 'add')
		}
	})
}

const $$bulmaModal = (sel, selB, selM) => {
	$$qcLm(sel, { selT: selM })
	$$qcLm(selB, { selT: selM })
}

const $$bulmaSwitch = (selS, sel, cN, change, evNa = 'toggle') => {
	$$qe(
		selS,
		(e) => {
			$$qAll(sel).forEach((o) => {
				$$ocL(o, cN, evNa)
			})
		},
		change
	)
}

// ~~ Animation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  need CSS 'jump ...'
$$jump = (sel) => {
	$$qAe(
		sel,
		(e) => {
			$$ocL(e.currentTarget, 'jump', 'add')
		},
		'mousedown'
	)

	$$qAe(
		sel,
		(e) => {
			$$ocL(e.currentTarget, 'jump', 'remove')
		},
		'animationend'
	)

	$$qAe(
		sel,
		(e) => {
			$$ocL(e.currentTarget, 'jump', 'remove')
		},
		'animationcancel'
	)
}

/* 
			.a_btn {
				display: block;
				cursor: pointer;
			}
			.a_btn.jump {
				animation: 0.07s cubic-bezier(0.2, 1, 0.2, 1) 0s 1 jump;
			}
			@keyframes jump {
				0%,
				50% {
					transform: translateY(-2px);
				}
				100% {
					transform: translateY(0px);
				}
			}
 */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Bulmaとは直接関係ありません。
const $$codeS = (id) => {
	// クリックしたテキストをすべて選択
	const pre1 = $$Id(id)
	if (!pre1) return

	$$oe(pre1, () => {
		document
			.getSelection()
			.setBaseAndExtent(pre1, 0, pre1, pre1.childNodes.length)
		// console.log('pre1.childNodes.length', pre1.childNodes.length);
	})
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// const $$cn = (ss) => document.getElementsByClassName(ss);
// const $$cn1 = (ss) => document.getElementsByClassName(ss)[0];

// const $$tn = (ss) => document.getElementsByTagName(ss);
// const $$tn1 = (ss) => document.getElementsByTagName(ss)[0];

// const $$na = (ss) => document.getElementsByName(ss);
// const $$na1 = (ss) => document.getElementsByName(ss)[0];
// const $$sBq = (btnId, { target, changeClass }, toggle) =>
//   setBtn_q(btnId, { target, changeClass }, toggle);

// const $$sBcn1 = (btnId, { target, changeClass }, toggle) =>
//   setBtn_cn1(btnId, { target, changeClass }, toggle);

// const $$sB = (btnId, { target, changeClass }, toggle) =>
//   setBtn_TargetobjToggle(btnId, { target, changeClass }, toggle);

// const $$sBe_target = (e_target, btnId, { target, changeClass }, toggle) => {
//   setBtn_eTargetobjToggle(e_target, btnId, { target, changeClass }, toggle);
// };

// const $$ = () => {

// }

// setBtn_q = function (
//   btnId,
//   { target, changeClass = 'is-active' },
//   toggle = 'toggle'
// ) {
//   $$q(btnId).addEventListener('click', function (e) {
//     // console.log('e.target:', e.target);
//     $$q(target).classList.toggle(changeClass);
//   });
// };

const $$oeSW = (
	btnId,
	{ trgt, changeClass = 'is-active' },
	toggle = 'toggle',
	stopP = false
) => {
	switch (toggle) {
		case 'add':
			if (stopP === true)
				$$oe(btnId, function (e) {
					e.stopPropagation()
					trgt.classList.add(changeClass)
				})
			else $$oe(btnId, () => trgt.classList.add(changeClass))
			break
		case 'remove':
			if (stopP === true)
				$$oe(btnId, function (e) {
					e.stopPropagation()
					trgt.classList.remove(changeClass)
				})
			else $$oe(btnId, () => trgt.classList.remove(changeClass))
			break
		default:
			if (stopP === true)
				$$oe(btnId, (e) => {
					console.log(
						'e.target',
						e.target
						// e.target.textContent, // 空白文字も含む
						// e.target.innerText == e.target.innerText.trim()
					)
					console.log($$ogA(e.target, 'item'))
					// console.log(e.target.getAttribute('data-item'));

					e.stopPropagation()
					trgt.classList.toggle(changeClass)
				})
			// $$oe(btnId, function (e) {
			//   e.stopPropagation();
			//   trgt.classList.toggle(changeClass);
			// });
			else $$oe(btnId, () => trgt.classList.toggle(changeClass))
			break
	}
}

const $$qoeSW = (
	btnId,
	{ target, changeClass = 'is-active' },
	toggle = 'toggle'
) => {
	const trgt = $$q('target')

	switch (toggle) {
		case 'add':
			$$qe(btnId, () => trgt.classList.add(changeClass))
			break
		case 'remove':
			$$qe(btnId, () => trgt.classList.remove(changeClass))
			break
		default:
			$$qe(btnId, () => trgt.classList.toggle(changeClass))
			break
	}
}

setBtn_cn1 = function (
	btnId,
	{ target, changeClass = 'is-active' },
	toggle = 'toggle'
) {
	$$cn1(btnId).addEventListener('click', function (e) {
		// console.log('e.target:', e.target);
		$$cn1(target).classList.toggle(changeClass)
	})
}

// ///////////////////////////////////////
// btnId: id or class
// targetObj {target, changeClass = 'is-active'}
// toggle
setBtn_TargetobjToggle = function (
	btnId,
	{ target, changeClass = 'is-active' },
	toggle = 'toggle'
) {
	// btnId: id or class
	let btnToggle = $$Id(btnId)
	if (!btnToggle) {
		btnToggle = $$cn1(btnId)
		if (!btnToggle) {
			console.log(`Can't find btnId: id nor class: ${btnToggle}`)
			return
		}
	}

	if (!target) {
		console.log(`Not exist target: ${target}`)
		return
	}

	// target: id or class
	let trgt = $$Id(target)
	if (!trgt) {
		trgt = $$cn1(target)
		if (!trgt) {
			console.log(`Can't find target: id nor class: ${trgt}`)
			return
		}
	}

	switch (toggle) {
		case 'add':
			btnToggle.addEventListener('click', function () {
				trgt.classList.add(changeClass)
			})
			break
		case 'remove':
			btnToggle.addEventListener('click', function () {
				trgt.classList.remove(changeClass)
			})
			break
		default:
			btnToggle.addEventListener('click', function (e) {
				console.log('e.target:', e.target)
				trgt.classList.toggle(changeClass)
			})
			break
	}
}

// function swT(btnToggle, {trgt, changeClass}, toggle) {
//     switch (toggle) {
//     case 'add':
//       $$oeq(btnToggle, () => {
//         trgt.classList.add(changeClass);
//       });
//       break;
//     case 'remove':
//       btnToggle.addEventListener('click', function () {
//         trgt.classList.remove(changeClass);
//       });
//       break;
//     default:
//       btnToggle.addEventListener('click', function (e) {
//         // console.log('e.target:', e.target);
//         trgt.classList.toggle(changeClass);
//       });
//       break;
//   }
// }

setBtn_eTargetobjToggle = function (
	e_target,
	btnId,
	{ target, changeClass = 'is-active' },
	toggle = 'toggle'
) {
	// e_target: id or class
	let e_Target = $$Id(e_target)
	if (!e_Target) {
		e_Target = $$cn1(e_target)
		if (!e_Target) {
			console.log(`Can't find exId: id nor class: ${e_Target}`)
			return
		}
	}
	// btnId: id or class
	let btnToggle = $$Id(btnId)
	if (!btnToggle) {
		btnToggle = $$cn1(btnId)
		if (!btnToggle) {
			console.log(`Can't find btnId: id nor class: ${btnToggle}`)
			return
		}
	}

	if (!target) {
		console.log(`Not exist target: ${target}`)
		return
	}

	// target: id or class
	let trgt = $$Id(target)
	if (!trgt) {
		trgt = $$cn1(target)
		if (!trgt) {
			console.log(`Can't find target: id nor class: ${trgt}`)
			return
		}
	}

	switch (toggle) {
		case 'add':
			btnToggle.addEventListener('click', function () {
				if (e.target === e_Target) {
					trgt.classList.add(changeClass)
				}
			})
			break
		case 'remove':
			btnToggle.addEventListener('click', function () {
				if (e.target === e_Target) {
					trgt.classList.remove(changeClass)
				}
			})
			break
		default:
			btnToggle.addEventListener('click', function (e) {
				console.log('e.target:', e.target)
				console.log('e_Target:', e_Target)
				if (e.target === e_Target) {
					trgt.classList.toggle(changeClass)
				}
			})
			break
	}
}

// switch (n) {
//   case 1:
//     break;
//   case 2:
//     break;
//   case 3:
//     break;
// }
