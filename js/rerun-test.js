function read(rarity) {
	var charData;

	$.ajax({
		url: '../js/rerun' + rarity + '.json',
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

		return (a, b) => (a[field][0] < b[field][0] ? w1 : w2);
	} else if (field === 'lastDurationV' || field === 'lastDurationB') {
		// sorting by last element of banner or version

		if (field === 'lastDurationV') {
			field = 'byVersion';
		} else field = 'byBanner';

		return (a, b) =>
			a[field][a[field].length - 1] > b[field][b[field].length - 1] ? w1 : w2;
	} else return 0;
}
/**
 *
 * @param {string} divID Div where is table will be created
 * @param {number} number Rarity
 * @param {bool} bool Extended or not (true; false)
 * @param {string} field byVersion, byBanner, vision
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

var newBannerSystemCounter = [];

function createVersions(ext, mainTable) {
	let v1max = 6;
	let v2max = 8;
	let v3max = 3;
	versionCount = 20;
	// (version * 2)
	bannersCount = versionCount * 2;

	let countB = 0;
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
						str = h + '.' + j + '.';
						newBannerSystemCounter.push(str + 1);
						newBannerSystemCounter.push(str + 2);
						newBannerSystemCounter.push(str + 3);

						vOneColspan.colSpan = 3;
						vOneColspan.innerText = h + '.' + j;
						bannerrow.append(vOneColspan);
					} else {
						str = h + '.' + j + '.';
						newBannerSystemCounter.push(str + 1);
						newBannerSystemCounter.push(str + 2);
						// 1.0 - 1.2 , 1.4 - 1.6
						vOneColspan.colSpan = 2;
						vOneColspan.innerText = h + '.' + j;
						bannerrow.append(vOneColspan);
					}
				} else if (h == 2 && j <= v2max) {
					str = h + '.' + j + '.';
					newBannerSystemCounter.push(str + 1);
					newBannerSystemCounter.push(str + 2);
					// 2.(0-9)
					vTwoColspan = th;
					vTwoColspan.colSpan = 2;
					vTwoColspan.innerText = h + '.' + j;
					bannerrow.append(vTwoColspan);
				} else if (h == 3 && j <= v3max) {
					str = h + '.' + j + '.';
					newBannerSystemCounter.push(str + 1);
					newBannerSystemCounter.push(str + 2);
					// 3.(0-2)
					vThreeColspan = th;
					vThreeColspan.colSpan = 2;
					vThreeColspan.innerText = h + '.' + j;
					bannerrow.append(vThreeColspan);
				}
			} else {
				// Если требуется таблица по версиям

				// 1.(0-6)
				if (h == 1 && j <= v1max) {
					str = h + '.' + j;
					newBannerSystemCounter.push(str);

					vOne = th;
					vOne.innerText = h + '.' + j;
					bannerrow.append(vOne);
				} else if (h == 2 && j <= v2max) {
					str = h + '.' + j;
					newBannerSystemCounter.push(str);
					// 2.(0-8)
					vTwo = th;
					vTwo.innerText = h + '.' + j;
					bannerrow.append(vTwo);
				} else if (h == 3 && j <= v3max) {
					str = h + '.' + j;
					newBannerSystemCounter.push(str);
					// 3.(0-2)
					vThree = th;
					vThree.innerText = h + '.' + j;
					bannerrow.append(vThree);
				}
			}
		}
	}

	if (mainTable) {
		upRow = document.createElement('tr');
		upRow.classList.add('bannerrow');

		upRowCell = document.createElement('td');
		upRowCell.rowSpan = 2;
		upRow.appendChild(upRowCell);

		bottomRow = document.createElement('tr');
		bottomRow.classList.add('bannerrow');

		// bottomRowCell = document.createElement('td');

		for (let i = 0; i <= bannersCount; i++) {
			tdU = document.createElement('td');
			tdB = document.createElement('td');

			upRow.appendChild(tdU);
			bottomRow.append(tdB);

			imgU = document.createElement('img');
			imgD = document.createElement('img');
			imgU.classList.add('char');
			imgD.classList.add('char');
			(imgU.height = 128), (imgD.height = 128);

			// Upper part
			{
				let name;
				// prettier-ignore
				switch (i + 1) {
					case 22: name = 'Eula'; break; 
					case 24: name = 'Shenhe'; break;
					case 25: 
					case 35: name = 'Ganyu'; break;
					case 27: name = 'Raiden'; break;
					case 28: 
					case 36: name = 'Venti'; break;
					case 30: name = 'Xiao'; break;
					case 32: name = 'Klee'; break;
					case 34: name = 'Tighnari'; break;
					case 37: name = 'Albedo'; break;
					case 38: name = 'Yoimiya'; break;
					case 39: name = 'Yae'; break;
					case 40: name = 'Itto'; break;
					case 41: name = 'Ayato'; break
				}

				let link = `../images/characters/${name}.webp`;
				let alt = `${name}`;
				if (`${name}` != 'undefined') {
					imgU.src = link;
					imgU.alt = alt;
					tdU.append(imgU);
				}
			}
			// Bottom part
			{
				let name;
				// prettier-ignore
				switch (i + 1) {
					case 1: case 10: name = 'Venti'; break;
					case 2: case 14: name = 'Klee'; break;
					case 3: case 11: case 20: case 39: case 30: name = 'Tartaglia'; break;
					case 4: case 12: case 25: case 34: name = 'Zhongli'; break;
					case 5: case 22: name = 'Albedo'; break;
					case 6: name = 'Ganyu'; break;
					case 7: case 24: name = 'Xiao'; break;
					case 8: name = 'Keqing'; break;
					case 9: case 21: name = 'Tao'; break;
					case 13: name = 'Eula'; break;
					case 15: case 32: name = 'Kazuha'; break;
					case 16: case 29: name = 'Ayaka' ; break;
					case 17: case 33: name = 'Yoimiya'; break;
					case 18: case 41: name = 'Raiden'; break;
					case 19: case 27: case 35: name = 'Kokomi'; break
					case 23: case 31: name = 'Itto'; break;
					case 26: name = 'Yae'; break;
					case 28: name = 'Ayato'; break;
					case 30: name = 'Yelan'; break;
					case 36: name = 'Cyno'; break;
					case 37: name = 'Nilou'; break;
					case 38: name = 'Nahida'; break
					case 40: name = 'Wanderer'; break
				}

				let link = `../images/characters/${name}.webp`;
				let alt = `${name}`;

				imgD.src = link;
				imgD.alt = alt;

				tdB.append(imgD);
			}
		}

		// bottomRow.appendChild(bottomRowCell);
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
	// if (!ext) {
	// 	console.log(newBannerSystemCounter);
	// 	console.log(newBannerSystemCounter.indexOf('2.3'));
	// 	console.log(
	// 		newBannerSystemCounter.indexOf('2.3') -
	// 			newBannerSystemCounter.indexOf('1.6') -
	// 			1
	// 	);
	// 	console.log(
	// 		newBannerSystemCounter.indexOf('3.2') -
	// 			newBannerSystemCounter.indexOf('2.3') -
	// 			1
	// 	);

	// 	let test =
	// 		newBannerSystemCounter.indexOf('3.2') -
	// 		newBannerSystemCounter.indexOf('3.2') -
	// 		1;
	// 	if (test < 0) {
	// 		test++;
	// 	}
	// 	console.log(test);
	// } else {
	// 	console.log(newBannerSystemCounter);
	// 	console.log(newBannerSystemCounter.indexOf('2.3.1'));
	// 	console.log(
	// 		newBannerSystemCounter.indexOf('2.3.1') -
	// 			newBannerSystemCounter.indexOf('1.6.2') -
	// 			1
	// 	);
	// 	console.log(
	// 		newBannerSystemCounter.indexOf('3.2.2') -
	// 			newBannerSystemCounter.indexOf('2.3.1') -
	// 			1
	// 	);
	// }

	for (let char of charData) {
		let chData;

		// Проверка на bool ext
		ext ? (chData = char.byBanner) : (chData = char.byVersion);

		// Задаётся имя и цвет персонажа для всего ряда
		charVision = document.createElement('tr');
		charVision.classList.add(`${char.vision}`);

		// Имена персов
		charName = document.createElement('td');
		charName.innerText = `${char.name}`;
		charVision.appendChild(charName);
		body.appendChild(charVision);

		// Сколько всего потребуется создавать ячеек

		for (let i = 0; i <= chData.length - 1; i++) {
			// if (chData[charData.length - 1] != '3.3') {
			// 	lastElement = chData.findLast((element) => element);
			// 	console.log('lastElement != 3.3, lastElement = ' + lastElement);

			// 	lastElementNB = newBannerSystemCounter.findLast((element) => element);

			// 	console.log(newBannerSystemCounter.indexOf(lastElementNB));
			// 	console.log(newBannerSystemCounter.indexOf(lastElement));
			// 	console.log(
			// 		newBannerSystemCounter.indexOf(lastElementNB) -
			// 			newBannerSystemCounter.indexOf(lastElement)
			// 	);
			// 	var addc =
			// 		newBannerSystemCounter.indexOf(lastElementNB) -
			// 		newBannerSystemCounter.indexOf(lastElement);
			// } else {
			// 	lastElement = chData.findLast((element) => element);

			// 	console.log('lastElement = 3.3  - true | ' + lastElement);
			// }

			console.log('chData.length = ' + chData.length);
			console.log('chData.length + 1 = ' + (chData.length + 1));
			// console.log(chData[i + 1]);
			// console.log(
			// 	newBannerSystemCounter.indexOf(chData[i + 1]) -
			// 		newBannerSystemCounter.indexOf(chData[i])
			// );

			// if (chData[i] != undefined) {
			if (i <= chData.length) {
				console.log(' ');
				console.log('i = ' + i);
				console.log('chData[i] = ' + chData[i]);
				console.log('CharDataLenght = ' + chData.length);
			}

			// Заполнение "пустыми" ячейками до первого момента баннера персонажа
			if (i == 0) {
				for (let a = 0; a < newBannerSystemCounter.indexOf(chData[0]); a++) {
					var emptyCell = document.createElement('td');
					emptyCell.classList.add('emptycell');
					charVision.append(emptyCell);
				}
			}

			// Промежутки между баннерами персонажа
			// for (let noCharCell = 0; noCharCell <= chData[i + 1]; noCharCell++) {
			let place =
				newBannerSystemCounter.indexOf(chData[i + 1]) -
				newBannerSystemCounter.indexOf(chData[i]) -
				1;

			console.log(newBannerSystemCounter.indexOf(chData[i + 1]));
			console.log(newBannerSystemCounter.indexOf(chData[i]));
			console.log('place = ' + place);

			// console.log('newBannerSystemCounter.indexOf(chData[i + 1])');
			// console.log(newBannerSystemCounter.indexOf(chData[i + 1]));
			// console.log('newBannerSystemCounter.indexOf(chData[i])');
			// console.log(newBannerSystemCounter.indexOf(chData[i]));
			// console.log('place');
			// console.log(place);

			if (place < 0) {
				place = 0;
			}

			console.log('place = ' + place);

			{
				let lastElement = 0;
				let lastElementNB = 0;

				for (let noCharCell = 0; noCharCell <= place; noCharCell++) {
					// if (chData[i] != undefined) {
					let charCell = document.createElement('td');
					// 0  = Баннер персонажа
					if (noCharCell != 0) {
						charCell.classList.add('noCharBanner');
						charCell.innerText = noCharCell;

						paintjob(char.rarity, char.vision, charCell, ext);

						charVision.append(charCell);
					} else if (noCharCell == 0) {
						itIsChar = document.createElement('img');
						itIsChar.classList.add('char');
						itIsChar.src = `${char.url}`;
						itIsChar.alt = `${char.name}`;
						itIsChar.height = 128;

						charCell.appendChild(itIsChar);
						charVision.append(charCell);

						// console.log('addc = ' + addc);
					}
				}

				// }
			}
			// }
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

	{
	}

	createVersions(ext, true); // Генерирует версии в тело
	fillTableBody(body, charData, ext); // Заполняет таблицу
}
