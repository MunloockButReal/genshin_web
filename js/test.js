function read(type, rarity) {
	var charData;

	$.ajax({
		url: `/genshin_web/json/${type}_${rarity}.json`,
		dataType: 'json',
		async: false,
		success: function (data) {
			charData = data;
		},
	});

	return charData;
}

var v1max = 6; // Version 1.0 - 1.X
var v2max = 8; // Version 2.0 - 2.X
var v3max = 5; // Version 3.0 - 3.X

// prettier-ignore
var vtb = [ '1.0.1', '1.0.2', '1.1.1', '1.1.2', '1.2.1', '1.2.2', '1.3.1', '1.3.2', '1.3.3', '1.4.1', '1.4.2', '1.5.1', '1.5.2', '1.6.1', '1.6.2',
			'2.0.1', '2.0.2', '2.1.1', '2.1.2', '2.2.1', '2.2.2', '2.3.1', '2.3.2', '2.4.1', '2.4.2', '2.5.1', '2.5.2', '2.6.1', '2.6.2', '2.7.1', '2.7.2', '2.8.1', '2.8.2', 
			'3.0.1', '3.0.2', '3.1.1', '3.1.2', '3.2.1', '3.2.2', '3.3.1', '3.3.2', '3.4.1', '3.4.2', '3.5.1','3.5.2'];
/**
 *
 * @param {*} _type Data Type - 'char' | 'weapon'
 * @param {*} _rarity Rarity 4 | 5
 * @param {*} _bannerType 'main' | anything else will be countet as 'rerun
 * @param {*} _extented extended banner true | false
 * @param {*} _sortType sortType | | | | | | |
 * @param {*} _sortWay sort Way asc | desc
 */
function createTable(_type, _rarity, _bannerType, _extented, _sortType, _sortWay = 'desc') {
	let tableDiv = document.getElementById('rerunTable');
	let table = document.createElement('table');

	tableDiv.innerHTML = '';

	_bannerType == 'main' ? (_extented = true) : 0;
	//HEADER
	let string = THeaderCreate(_type, _bannerType, _extented);

	table.innerHTML += string + '</tr>';

	//Body
	string = THBodyCreate(_type, _bannerType, _extented, _rarity, _sortType, _sortWay);

	table.innerHTML += string;

	tableDiv.appendChild(table);
}

function THeaderCreate(_type, _bannerType, _extented) {
	let string = '<thead><tr><td> Name </td>';

	if (_type == 'weapon' || !_extented) {
		// Weapons banner does not have 1.3.3 version, so we need to slice it
		let index = vtb.indexOf('1.3.3');
		if (index > -1) {
			vtb.splice(index, 1);
		}
	}

	let _vtb = vtb;

	// Removes '.C' from a.b.C and return new list without duplicates

	//
	_vtb = [...new Set(vtb.map((e) => e.slice(0, 3)))];
	// Format a.b or a.b.c
	if (_extented) {
		for (version of _vtb) {
			version == '1.3' && _type == 'char'
				? (string += '<td colspan=' + 3 + '>' + version + '</td>')
				: (string += '<td colspan=' + 2 + '>' + version + '</td>');
		}
	} else {
		for (version of _vtb) {
			string += '<td>' + version + '</td>';
		}
	}

	// Main table. Always big
	if (_bannerType == 'main') {
		string = THeaderCreate(_type, 'rerun', 'true');

		let data = read(_type, 5);
		console.log(data);

		let versionCount = v1max + v2max + v3max + 3;
		// (version * 2)

		let bannersCount = versionCount * 2;

		let UpRowString = '<tr class = "bannerrow">';
		let upRowCellString = '<td rowspan = "2">';
		let upRow = document.createElement('tr');
		upRow.classList.add('bannerrow');

		let upRowCell = document.createElement('td');
		upRowCell.rowSpan = 2;
		upRow.appendChild(upRowCell);

		let bottomRow = document.createElement('tr');
		bottomRow.classList.add('bannerrow');
		let chars = read(_type, 5);

		let temp = [];
		let testarr = [];
		let counter = 0;
		for (let a of chars) {
			for (let i = 0; i < a.version.length; i++) {
				console.log(a, temp, vtb.indexOf(a.version[i]), a.version[i]);
				if (temp.includes(a.version[i])) {
					testarr.push([`top`, a.name, vtb.indexOf(a.version[i]), a.url]);
				} else {
					testarr.push([`bottom`, a.name, vtb.indexOf(a.version[i]), a.url]);
					temp.push(a.version[i]);
				}
				// console.log(testarr[testarr.length - 1]);
			}
		}

		console.log(testarr);
		for (let i = 0; i <= bannersCount; i++) {
			let tdU = document.createElement('td');
			let tdB = document.createElement('td');
			upRow.appendChild(tdU);
			bottomRow.append(tdB);

			let imgU = document.createElement('img');
			let imgD = document.createElement('img');
			imgU.classList.add('char');
			imgD.classList.add('char');
			imgU.height = imgD.height = 128;

			let UpChar = testarr.find((e) => e[2] === i && e[0] === 'top');
			let BottomChar = testarr.find((e) => e[2] === i && e[0] === 'bottom');

			console.log(UpChar, BottomChar);

			if (UpChar != undefined) {
				imgU.src = UpChar[3];
				imgU.alt = UpChar[1];
				tdU.append(imgU);
			}

			imgD.src = BottomChar[3];
			imgD.alt = BottomChar[1];
			tdB.append(imgD);
		}
		string += '<tr>' + upRow.innerHTML + '</tr>';
		string += '<tr>' + bottomRow.innerHTML + '</tr>';
	}
	return string;
}

function THBodyCreate(_type, _bannerType, _extented, _rarity, _sortType, _sortWay) {
	let string = '<tbody>';
	let data = read(_type, _rarity).sort(sortField(_sortType, _sortWay));

	let _vtb = vtb;

	if (_bannerType == 'main') string += THBodyCreate(_type, 'rerun', true, 4);
	if (_bannerType == 'rerun') {
		for (let i = 0; i < data.length; i++) {
			!_extented
				? ((data[i].version = data[i].version.map((e) => e.slice(0, 3))),
				  (_vtb = [...new Set(vtb.map((e) => e.slice(0, 3)))]))
				: 0;

			string += '<tr class=' + data[i].type + '><td class = "charName">' + data[i].name + '</td>';

			let a = data[i].version.map((e) => (e = _vtb.indexOf(e)));

			for (let j = 0; j < _vtb.indexOf(data[i].version[0]); j++) {
				string += '<td class="emptycell"></td>';
			}

			for (let j = 0; j < a.length; j++) {
				for (let k = 0; k < (a[j + 1] - a[j] || _vtb.length - a[j]); k++) {
					let bgColor = colorJob(_extented, k, _rarity, data[i].type)['backgroundColor'];
					let color = colorJob(_extented, k, _rarity, data[i].type)['color'];
					k == 0
						? (string += `<td class="char"><img class="char" height="128" src="${data[i].url}" alt="${data[i].name}"></td>`)
						: // '<td class="char"' +
						  // '<img class="char" src ="' +
						  // data[i].url +
						  // '"height = 80px; width = 80px>' +
						  // '</td>')
						  (string += `<td class="noCharBanner" style="background-color: ${bgColor}; color: ${color}"> ${k} </td>`);
				}
			}
			string += '</tr>';

			let dif = _vtb.indexOf(data[i + 1]) - _vtb.indexOf(data[i]);

			console.log({ dif });
			data[i].difMax = 0;
			data[i].difMin = _vtb.indexOf(data[i].version[1]) - _vtb.indexOf(data[i].version[0]);

			let difLast = _vtb.indexOf(_vtb[_vtb.length - 1]) - _vtb.indexOf(data[data.length - 1]);
			console.log(_vtb.indexOf(_vtb[_vtb.length - 1]), _vtb.indexOf(data[data.length - 1]));
			if (data[i].version.length === 1) {
				data[i].difMin = data[i].difMax = difLast;
			} else {
				dif > data[i].difMax ? (data[i].difMax = dif - 1) : 0;
				difLast > data[i].difMax ? (data[i].difMax = difLast) : 0;
				dif <= data[i].difMin && dif > 0 ? (data[i].difMin = dif - 1) : 0;
			}

			console.log(data[i].name, data[i].difMax, data[i].difMin);
			data[i] = data[i];
		}
	}
	return string;
}

function colorJob(_extented, number, rarity, charVision) {
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
	default: color = '#a4a4a4'; break 
	}

	let returnArray = {};

	let colorT = tinycolor(color);
	let darkenMult = 2.7;
	if (rarity == 4) {
		darkenMult = 2.7 * 1.5;
	} else if (rarity == 5) {
		darkenMult = 2.7;
	}

	if (!_extented) {
		darkenMult *= 1.4;
	}

	returnArray['backgroundColor'] = tinycolor(colorT)
		.darken(number * darkenMult)
		.toRgbString();

	// prettier-ignore
	returnArray['color'] = tinycolor.mostReadable(returnArray['backgroundColor'], ['000','fff',]).toRgbString();

	return returnArray;
}

/**
 * Sorts an array of objects by the specified field, in the specified order (ascending or descending).
 * If the specified field doesn't match any of the predefined cases, the function logs an error message and uses the default sorting function.
 *
 * @param {string} field - The name of the field to sort by.
 * @param {string} way - The sort order ('asc' for ascending, 'desc' for descending).
 * @returns {function} A function to use as the sort callback for Array.prototype.sort().
 */
function sortField(field, way) {
	// Set up the sort direction based on the specified order
	way === 'desc' ? ((w2 = 1), (w1 = -1)) : ((w1 = 1), (w2 = -1));

	// Sort the array based on the specified field
	switch (field) {
		case 'vision':
		case 'name':
		case 'difMin':
		case 'difMax':
			// Sort by the specified field (vision, name, difMin, or difMax)
			return (a, b) => (a[field] > b[field] ? w1 : w2);

		case 'byVersion':
		case 'byBanner':
			// Sort by the first element of the version array (byVersion) or the banner array (byBanner)
			field = 'version';
			return (a, b) => (a[field][0] < b[field][0] ? w1 : w2);

		case 'lastDurationV':
		case 'lastDurationB':
			// Sort by the last element of the version array (lastDurationV) or the banner array (lastDurationB)
			field = 'version';
			return (a, b) => (a[field][a[field].length - 1] < b[field][b[field].length - 1] ? w1 : w2);

		case 'count':
			// Sort by the length of the version array
			field = 'version';
			return (a, b) => (a[field].length > b[field].length ? w1 : w2);

		default:
			// If the specified field doesn't match any of the above cases, log an error message and use the default sorting function
			console.log('Some non existed sort type');
			return (a, b) => (a > b ? w1 : w2);
	}
}

$(function () {
	createTable('char', 4, 'rerun', true, 'difMin', 'asc');
});
