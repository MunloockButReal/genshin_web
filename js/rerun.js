function read(rarity) {
	var charData;

	$.ajax({
		url: '/genshin_web/json/rerun' + rarity + '.json',
		dataType: 'json',
		async: false,
		success: function (data) {
			charData = data;
		},
	});

	return charData;
}

window.onload = () => {};

/**
 *
 * @param {string=} field vision, byVersion, byBanner, lastDurationV, lastDurationB /n Anything else(but nothing) will be ignored
 * @param {string=} way desc, anything else will be count as 'asc'
 * @returns sorted array
 */
function sortField(field, way) {
	way === 'desc' ? ((w2 = 1), (w1 = -1)) : ((w1 = 1), (w2 = -1));

	if (field === 'vision') {
		// sort by vision

		return (a, b) => (a[field] > b[field] ? w1 : w2);
	} else if (field === 'byVersion' || field === 'byBanner') {
		//sort by banner or version (first element)
		field = 'version';

		return (a, b) => (a[field][0] < b[field][0] ? w1 : w2);
	} else if (field === 'lastDurationV' || field === 'lastDurationB') {
		// sorting by last element of banner or version
		field = 'version';
		return (a, b) =>
			a[field][a[field].length - 1] < b[field][b[field].length - 1] ? w1 : w2;
	} else if (field === `name`) {
		return (a, b) => (a[field] > b[field] ? w1 : w2);
	}
}
/**
 *
 * @param {string} divID Div where is table will be created
 * @param {number} number Rarity
 * @param {bool} bool Extended or not (true; false)
 * @param {string} field byVersion, version, vision
 * @param {string} way asc or desc
 */
function changeTableSort(divID, number, bool, field, way) {
	loadTableData(divID, read(number).sort(sortField(field, way)), bool);
	addEventsOnChars();
	resizePage();
}

function createVersionHeader(table) {
	bannerrow = document.createElement('tr');
	bannerrow.classList.add('bannerrow');
	brbanners = document.createElement('td');
	brbanners.innerText = 'Banners';
	bannerrow.append(brbanners);
	table.append(bannerrow);
}

function createVersionHeaderMain(table) {
	bannerrow = document.createElement('tr');
	bannerrow.classList.add('bannerrow');
	brbanners = document.createElement('td');
	brbanners.innerText = 'Banners';

	bannerrow.append(brbanners);
	table.append(bannerrow);
}

var vtb = [];
function createVersions(ext, mainTable) {
	let verToBanner = [];
	let v1max = 6;
	let v2max = 8;
	let v3max = 4;
	versionCount = v1max + v2max + v3max + 3;
	// (version * 2)
	bannersCount = versionCount * 2;

	for (let h = 1; h < 4; h++) {
		// Генерирует подверсию (.0 ... .8)

		for (let j = 0; j < 9; j++) {
			// Если требуется таблица по баннерам
			let th = document.createElement('th');
			if (ext) {
				// 1.0-1.6
				if (h == 1 && j <= v1max) {
					vOneColspan = th;
					// 1.3
					if (h == 1 && j == 3) {
						vOneColspan.colSpan = 3;
						vOneColspan.innerText = h + '.' + j;
						bannerrow.append(vOneColspan);

						verToBanner.push(h + '.' + j + '.' + 1);
						verToBanner.push(h + '.' + j + '.' + 2);
						verToBanner.push(h + '.' + j + '.' + 3);
					} else {
						// 1.0 - 1.2 , 1.4 - 1.6
						vOneColspan.colSpan = 2;
						vOneColspan.innerText = h + '.' + j;
						bannerrow.append(vOneColspan);

						verToBanner.push(h + '.' + j + '.' + 1);
						verToBanner.push(h + '.' + j + '.' + 2);
					}
				} else if (h == 2 && j <= v2max) {
					// 2.(0-9)
					vTwoColspan = th;
					vTwoColspan.colSpan = 2;
					vTwoColspan.innerText = h + '.' + j;
					bannerrow.append(vTwoColspan);

					verToBanner.push(h + '.' + j + '.' + 1);
					verToBanner.push(h + '.' + j + '.' + 2);
				} else if (h == 3 && j <= v3max) {
					// 3.(0-2)
					vThreeColspan = th;
					vThreeColspan.colSpan = 2;
					vThreeColspan.innerText = h + '.' + j;
					bannerrow.append(vThreeColspan);

					verToBanner.push(h + '.' + j + '.' + 1);
					verToBanner.push(h + '.' + j + '.' + 2);
				}
			} else {
				// Если требуется таблица по версиям

				// 1.(0-6)
				if (h == 1 && j <= v1max) {
					vOne = th;
					vOne.innerText = h + '.' + j;
					bannerrow.append(vOne);

					verToBanner.push(h + '.' + j);
				} else if (h == 2 && j <= v2max) {
					// 2.(0-8)
					vTwo = th;
					vTwo.innerText = h + '.' + j;
					bannerrow.append(vTwo);

					verToBanner.push(h + '.' + j);
				} else if (h == 3 && j <= v3max) {
					// 3.(0-2)
					vThree = th;
					vThree.innerText = h + '.' + j;
					bannerrow.append(vThree);

					verToBanner.push(h + '.' + j);
				}
			}
		}
	}
	vtb = verToBanner;

	if (mainTable) {
		upRow = document.createElement('tr');
		upRow.classList.add('bannerrow');

		upRowCell = document.createElement('td');
		upRowCell.rowSpan = 2;
		upRow.appendChild(upRowCell);

		bottomRow = document.createElement('tr');
		bottomRow.classList.add('bannerrow');

		let chars = read(5);
		let maxrc = 0;
		for (c of chars) {
			if (c.version.length > maxrc) {
				maxrc = c.version.length;
			}
		}

		let temp2 = [];
		let testarr = [];
		// for (let a of c
		for (let i = 0; i < maxrc; i++) {
			for (let a of chars) {
				if (a.version[i] != undefined) {
					if (temp2.includes(a.version[i])) {
						testarr.push([`top`, a.name, vtb.indexOf(a.version[i])]);
					} else {
						testarr.push([`bottom`, a.name, vtb.indexOf(a.version[i])]);
						temp2.push(a.version[i]);
					}
				}
			}
		}

		for (let i = 0; i <= bannersCount; i++) {
			tdU = document.createElement('td');
			tdB = document.createElement('td');
			upRow.appendChild(tdU);
			bottomRow.append(tdB);

			imgU = document.createElement('img');
			imgD = document.createElement('img');
			imgU.classList.add('char');
			imgD.classList.add('char');
			// (imgU.height = 128), (imgD.height = 128);
			imgU.height = imgD.height = 128;

			for (let ch of testarr) {
				row = ch[0];
				charName = ch[1];
				count = ch[2];
				if (count == i) {
					let link = `/genshin_web/images/characters/${charName}.webp`;
					let alt = `${charName}`;
					if (`${charName}` != 'undefined') {
						if (row === `top`) {
							imgU.src = link;
							imgU.alt = alt;
							tdU.append(imgU);
						} else {
							imgD.src = link;
							imgD.alt = alt;
							tdB.append(imgD);
						}
					}
				}
			}
		}

		head.appendChild(upRow);
		head.appendChild(bottomRow);
	}
}

function createHeadBody(table) {
	head = document.createElement('thead');
	body = document.createElement('tbody');
	table.append(head);
	table.append(body);
}

function createTable(from) {
	table = document.createElement('table');
	table.classList.add('reruns');
	from.appendChild(table);
}

function paintjob(number, charVision, cell, ext) {
	let color = '#000';
	// prettier-ignore
	switch (charVision) {
		case 'pyro': 	color = '#bf2818'; break;
		case 'hydro': 	color = '#0b4dda'; break;
		case 'geo':		color = '#b68d07'; break;
		case 'electro':	color = '#9336b0'; break;
		case 'dendro':	color = '#51810e'; break;
		case 'cryo':	color = '#4878a8'; break;
		case 'anemo':	color = '#26a684'; break;
		default: break;
	}

	cell.style.backgroundColor = color;

	let colorT = tinycolor(color);

	if (number == 4) {
		darkenMult = 2.7 * 1.5;
	} else if (number == 5) {
		darkenMult = 2.7;
	}

	if (!ext) {
		darkenMult *= 1.4;
	}
	cell.style.backgroundColor = tinycolor(colorT)
		.darken(cell.innerText * darkenMult)
		.toString();

	// prettier-ignore
	cell.style.color = tinycolor.mostReadable(cell.style.backgroundColor, ['000','fff',]);
}
function fillTableBody(body, charData, ext) {
	for (let char of charData) {
		let chDataNew = [];
		// Проверка на bool ext
		//

		chData = char.version;
		// Задаётся имя и цвет персонажа для всего ряда
		charVision = document.createElement('tr');
		charVision.classList.add(`${char.vision}`);

		// Имена персов
		charName = document.createElement('td');
		charName.innerText = `${char.name}`;
		charVision.appendChild(charName);
		body.appendChild(charVision);

		// Сколько всего потребуется создавать ячеек
		if (!ext) {
			for (let n = 0; n < chData.length; n++) {
				chDataNew.push(chData[n].slice(0, -2));
			}
			chData = chDataNew;
		}
		for (let i = 0; i <= chData.length; i++) {
			if (chData[i] != undefined) {
				// Заполнение "пустыми" ячейками до первого момента баннера персонажа
				if (i == 0) {
					for (let a = 0; a < vtb.indexOf(chData[0]); a++) {
						var emptyCell = document.createElement('td');
						emptyCell.classList.add('emptycell');
						charVision.append(emptyCell);
					}
				}
				let dif = vtb.indexOf(chData[i + 1]) - vtb.indexOf(chData[i]);

				let difLast =
					vtb.indexOf(vtb[vtb.length - 1]) -
					vtb.indexOf(chData[chData.length - 1]);

				if (chData[i + 1] == undefined) {
					dif = difLast + 1;
				}

				// Промежутки между баннерами персонажа

				for (let noCharCell = 0; noCharCell < dif; noCharCell++) {
					if (chData[i] != undefined) {
						let charCell = document.createElement('td');
						// 0  = Баннер персонажа

						if (noCharCell != 0) {
							charCell.classList.add('noCharBanner');
							charCell.innerText = noCharCell;

							paintjob(char.rarity, char.vision, charCell, ext);

							charVision.append(charCell);
						} else {
							itIsChar = document.createElement('img');
							itIsChar.classList.add('char');
							itIsChar.src = `${char.url}`;
							itIsChar.alt = `${char.name}`;
							itIsChar.height = 128;

							charCell.appendChild(itIsChar);
							charVision.append(charCell);
						}
					}
				}
			}
		}
	}
}

function loadTableData(divForTableId, charData, ext) {
	// Get rerunTable as tableBody
	const tableDiv = document.getElementById(divForTableId);

	try {
		while (tableDiv.firstChild) {
			tableDiv.removeChild(tableDiv.firstChild);
		}
	} catch (error) {
		console.log(error);
	}

	createTable(tableDiv); // Таблица
	createHeadBody(table); // Голова и тело таблицы

	createVersionHeader(head); // Генерирует хедер Banners
	createVersions(ext, false); // Генерирует версии в тело
	fillTableBody(body, charData, ext); // Заполняет таблицу
}

function loadTableDataMain(divForTableId, charData, ext) {
	// mainCharactersTable
	// Get rerunTable as tableBody
	const tableDiv = document.getElementById(divForTableId);
	changeTableSort('rerunTable', 4, false, 'vision', 'desc');

	try {
		while (tableDiv.firstChild) {
			tableDiv.removeChild(tableDiv.firstChild);
			tableDiv.removeChild('head');
		}
	} catch (error) {
		console.log(error);
	}

	createTable(tableDiv); // Таблица
	createHeadBody(table); // Голова и тело таблицы

	createVersionHeaderMain(head); // Генерирует хедер Banners
	createVersions(ext, true); // Генерирует версии в тело
	fillTableBody(body, charData, ext); // Заполняет таблицу
}
