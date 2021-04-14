// shortJS.js
// import Handlebars from 'handlebars';

// shortBulma.js

// ss: String, not selector
export const Id0 = (id) => {
	return document.getElementById(id)
}
export const Id = (id) => {
	id = id.substring(0, 1) === '#' ? id.substring(1) : id
	return document.getElementById(id)
}

// selector
export const q = (sel) => document.querySelector(sel)
export const qAll = (sel) => document.querySelectorAll(sel)
export const oq = (o, sel) => o.querySelector(sel)
export const oqAll = (o, sel) => o.querySelectorAll(sel)

export const de = (f) => {
	document.addEventListener('DOMContentLoaded', f)
}

export const oe = (o, f, evNa = 'click') => {
	o.addEventListener(evNa, f)
}

export const dqoe = (sel, f) => {
	de(() => qe(sel, f))
}

export const qecL = (sel, selT, cN = 'is-active', mN = 'toggle') => {
	qe(sel, (e) => {
		e.stopPropagation()
		qcL(sel, cN, mN)
		qcL(selT, cN, mN)
	})
}

export const qe = (sel, f, evNa = 'click') => {
	oe(q(sel), f, evNa)
}

export const doe = (o, f) => {
	de(() => oe(o, f))
}

export const qAe = (sel, f, evNa = 'click') => {
	qAll(sel).forEach((o) => oe(o, () => f(o), evNa))
}

export const qAe_ocL = (sel, selTrgt, evNa = 'click') => {
	qAll(sel).forEach((o) => {
		oe(o, () => ocL(q(selTrgt)), evNa)
	})
}

export const qcL = (sel, cN = 'is-active', mN = 'toggle') =>
	q(sel).classList[mN](cN)

export const ocL = (o, cN = 'is-active', mN = 'toggle') => o.classList[mN](cN)

export const qcLm = (
	sel,
	{ selT, cN = 'is-active' },
	mN = 'toggle',
	stopP = true
) => {
	ocLm(q(sel), { trgt: q(selT), cN }, mN, stopP)
}

export const ocLm = (
	o,
	{ trgt, cN = 'is-active' },
	mN = 'toggle',
	stopP = true
) => {
	oe(o, (e) => {
		if (stopP) e.stopPropagation()
		trgt.classList[mN](cN)
	})
}

export const oAcLm = (
	o,
	{ trgts, cN = 'is-active' }, // trgts: array
	mN = 'toggle',
	stopP = true
) => {
	oe(o, (e) => {
		if (stopP) e.stopPropagation()
		trgts.forEach((t) => t.classList[mN](cN))
	})
}

export const DF = () => new DocumentFragment()

export const oes = (o, f) => {
	o.addEventListener('submit', f)
}

export const tC = (id) => {
	return Id(id).content
}

export const tCc = (id, b = true) => {
	return document.importNode(tC(id), b)
}

export const tCco = (o, b = true) => {
	return document.importNode(o, b)
}

export const ogA = (o, ss) => o.getAttribute('data-' + ss)
export const ogD = (o, ss) => o.dataset[ss]
export const qogA = (sel, ss) => q(sel).getAttribute('data-' + ss)
export const qogD = (sel, ss) => q(sel).dataset[ss]

export const na = (ss) => document.getElementsByName(ss) // form radio

export const hbs = (ss, context) => Handlebars.compile(ss)(context)
export const hbP = (ssP, context) => Handlebars.templates[ssP](context)

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const bulmaMenu = (ss, ssT) => {
	// de( () => {... この中で使う } )
	qecL(ss, ssT)
	qe('body', (e) => {
		// bodyをクリックしてメニューを消す
		e.stopPropagation()
		if (q(ss).classList.contains('is-active')) {
			qcL(ss)
			qcL(ssT)
		}
	})
}

export const bulmaTabs = (ssTabs, ssContent) => {
	const tabs = qAll(ssTabs)
	const boxes = qAll(ssContent)

	tabs.forEach((tab) => {
		const target = Id(tab.dataset.target)

		oe(tab, () => {
			bulmaTab(tabs, tab)
			bulmaTabR(boxes, target, 'is-hidden')
		})
	})
}

// bulmaTabs('.tabs li', '#tab-content > div');

export const bulmaTab = (items, target, cN = 'is-active') => {
	items.forEach((item) => {
		if (item === target) {
			ocL(item, cN, 'add')
		} else {
			ocL(item, cN, 'remove')
		}
	})
}

export const bulmaTabR = (items, target, cN = 'is-active') => {
	items.forEach((item) => {
		if (item === target) {
			ocL(item, cN, 'remove')
		} else {
			ocL(item, cN, 'add')
		}
	})
}

export const bulmaModal = (sel, selB, selM) => {
	qcLm(sel, { selT: selM })
	qcLm(selB, { selT: selM })
}

// ~~ Animation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  need CSS 'jump ...'
export const jump = (sel) => {
	qAe(
		sel,
		(o) => {
			ocL(o, 'jump', 'toggle')
			// ocL(o, 'jump', 'add')
		},
		'mousedown'
	)

	qAe(
		sel,
		(o) => {
			// ocL(o, 'jump', 'toggle')
			ocL(o, 'jump', 'remove')
		},
		'animationend'
	)

	qAe(
		sel,
		(o) => {
			ocL(o, 'jump', 'remove')
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
export const codeS = (id) => {
	const pre1 = Id(id)
	if (!pre1) return

	oe(pre1, () => {
		document
			.getSelection()
			.setBaseAndExtent(pre1, 0, pre1, pre1.childNodes.length)
		// console.log('pre1.childNodes.length', pre1.childNodes.length);
	})
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// export const cn = (ss) => document.getElementsByClassName(ss);
// export const cn1 = (ss) => document.getElementsByClassName(ss)[0];

// export const tn = (ss) => document.getElementsByTagName(ss);
// export const tn1 = (ss) => document.getElementsByTagName(ss)[0];

// export const na = (ss) => document.getElementsByName(ss);
// export const na1 = (ss) => document.getElementsByName(ss)[0];
// export const sBq = (btnId, { target, changeClass }, toggle) =>
//   setBtn_q(btnId, { target, changeClass }, toggle);

// export const sBcn1 = (btnId, { target, changeClass }, toggle) =>
//   setBtn_cn1(btnId, { target, changeClass }, toggle);

// export const sB = (btnId, { target, changeClass }, toggle) =>
//   setBtn_TargetobjToggle(btnId, { target, changeClass }, toggle);

// export const sBe_target = (e_target, btnId, { target, changeClass }, toggle) => {
//   setBtn_eTargetobjToggle(e_target, btnId, { target, changeClass }, toggle);
// };

// export const  = () => {

// }

// setBtn_q = function (
//   btnId,
//   { target, changeClass = 'is-active' },
//   toggle = 'toggle'
// ) {
//   q(btnId).addEventListener('click', function (e) {
//     // console.log('e.target:', e.target);
//     q(target).classList.toggle(changeClass);
//   });
// };

export const oeSW = (
	btnId,
	{ trgt, changeClass = 'is-active' },
	toggle = 'toggle',
	stopP = false
) => {
	switch (toggle) {
		case 'add':
			if (stopP === true)
				oe(btnId, function (e) {
					e.stopPropagation()
					trgt.classList.add(changeClass)
				})
			else oe(btnId, () => trgt.classList.add(changeClass))
			break
		case 'remove':
			if (stopP === true)
				oe(btnId, function (e) {
					e.stopPropagation()
					trgt.classList.remove(changeClass)
				})
			else oe(btnId, () => trgt.classList.remove(changeClass))
			break
		default:
			if (stopP === true)
				oe(btnId, (e) => {
					console.log(
						'e.target',
						e.target
						// e.target.textContent, // 空白文字も含む
						// e.target.innerText == e.target.innerText.trim()
					)
					console.log(ogA(e.target, 'item'))
					// console.log(e.target.getAttribute('data-item'));

					e.stopPropagation()
					trgt.classList.toggle(changeClass)
				})
			// oe(btnId, function (e) {
			//   e.stopPropagation();
			//   trgt.classList.toggle(changeClass);
			// });
			else oe(btnId, () => trgt.classList.toggle(changeClass))
			break
	}
}

export const qoeSW = (
	btnId,
	{ target, changeClass = 'is-active' },
	toggle = 'toggle'
) => {
	const trgt = q('target')

	switch (toggle) {
		case 'add':
			qe(btnId, () => trgt.classList.add(changeClass))
			break
		case 'remove':
			qe(btnId, () => trgt.classList.remove(changeClass))
			break
		default:
			qe(btnId, () => trgt.classList.toggle(changeClass))
			break
	}
}

// shortHbs.js

// ~~ Handlebars ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const hFn = (html) => Handlebars.compile(html)
export const tFn = (Ttag) => Handlebars.compile(Ttag.innerHTML)
export const qtFn = (ht) => {
	return Handlebars.compile(q(ht).innerHTML)
}

export const hFnC = (html, context) => Handlebars.compile(html)(context)
export const hFnT = (html, v, trgt) =>
	(trgt.innerHTML = Handlebars.compile(html)(v))
export const hFnqT = (html, v, trgt) =>
	(q(trgt).innerHTML = Handlebars.compile(html)(v))

export const qtFnqT = (ht, v, trgt) => {
	// console.log("qtFnqT -> qtFn(ht)(v)", qtFn(ht)(v))
	q(trgt).innerHTML = qtFn(ht)(v)
}
// qtFnqT
// document.querySelector(trgt).innerHTML = Handlebars.compile(document.querySelector(ht).innerHTML)(v);
export const d_qFnT = (ht, v, trgt) => {
	de(() => {
		qtFnqT(ht, v, trgt)
	})
}

export const tPre = (handlebars) => Handlebars.templates[handlebars]

export const tPreqT = (handlebars, v, trgt) =>
	(q(trgt).innerHTML = tPre(handlebars)(v))
export const d_qPreT = (handlebars, v, trgt) => {
	de(() => {
		tPreqT(handlebars, v, trgt)
	})
}

export const preFnqT = (preFn, v, trgt) => (q(trgt).innerHTML = preFn(v))

export const rPar = (na, html) => Handlebars.registerPartial(na, html)
export const d_rPar = (na, html) => {
	de(() => {
		rPar(na, html)
	})
}

export const rParFn = (na, fn) => Handlebars.registerPartial(na, fn)
export const d_rParFn = (na, fn) => {
	de(() => {
		rParFn(na, fn)
	})
}

export const rHS = (na, html) =>
	Handlebars.registerHelper('print_person', () => {
		return new Handlebars.SafeString(html)
	})

export const d_rH = (na, html) => {
	de(() => {
		rH(na, html)
	})
}
