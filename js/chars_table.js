// File reader
charData = '';

$.ajax({
	url: '/genshin_web/json/chars_table.json',
	dataType: 'json',
	async: false,
	success: function (data) {
		charData = data;
	},
});

$(document).ready(function () {
	// Dynamic table
	loadTableData(charData);
	//sort and color HP
	sortTable(3);
	colorcode('HP');
	//sort and color ATK
	sortTable(4);
	colorcode('ATK');
	// sort and color DEF
	sortTable(5);
	colorcode('DEF');
	//back to default sort on load
	sortTable(3);
	sortTable(0);
});

function loadTableData(charData) {
	const tableBody = document.getElementById('MyTableBody');
	let dataHtml = '';
	for (let char of charData) {
		dataHtml += ` <tr>
                        <td class="version">${char.version}</td>
                        <td class="Rarity">${char.Rarity}</td>
                        <td class="Name">${char.name}</td>
                        <td class="HP">${char.HP}</td>
                        <td class="ATK">${char.ATK}</td>
                        <td class="DEF">${char.DEF}</td>
                        <td class="Abil">${char.Abil}</td>
                        </tr>
                        `;
	}
	tableBody.innerHTML += dataHtml;
}

async function colorcode(columnName) {
	var f = document.body.getElementsByClassName(columnName);

	var min = parseInt(f[0].innerHTML);
	var max = parseInt(f[f.length - 1].innerHTML);

	let currentmin = min;
	let current = 0;

	// Background color generation
	var rainbow = new Rainbow();
	rainbow.setSpectrum('darkred', 'orange', 'green');
	rainbow.setNumberRange(0, f.length);

	var hex = [];
	for (let i = 0; i <= f.length; i++) {
		hex.push('#' + 1);
	}
	//
	step = Math.round((max - min) / f.length);

	for (l = 0; l < f.length; l++) {
		hex = '#' + rainbow.colourAt(l);
		current = f[l].innerHTML;

		if (current < currentmin + step) {
			f[l].style.backgroundColor = '#' + rainbow.colourAt(l);
			f[l].style.color = tinycolor.mostReadable(rainbow.colourAt(l), [
				'white',
				'black',
			]);
		} else {
			currentmin += step;
			f[l].style.backgroundColor = '#' + rainbow.colourAt(l);
			f[l].style.color = tinycolor.mostReadable(rainbow.colourAt(l + 1), [
				'white',
				'black',
			]);
		}
	}
}

function sortTable(n) {
	var table,
		rows,
		switching,
		i,
		x,
		y,
		shouldSwitch,
		dir,
		switchcount = 0;
	table = document.getElementById('MyTableBody');
	switching = true;
	dir = 'asc';
	while (switching) {
		switching = false;
		rows = table.getElementsByTagName('TR');
		for (i = 0; i < rows.length - 1; i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName('TD')[n];
			y = rows[i + 1].getElementsByTagName('TD')[n];

			if (dir == 'asc') {
				if (x.innerHTML - y.innerHTML > 0) {
					shouldSwitch = true;
					break;
				}
				if (isNaN(+x.innerHTML))
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
			} else if (dir == 'desc') {
				if (x.innerHTML - y.innerHTML < 0) {
					shouldSwitch = true;
					break;
				}

				if (isNaN(+x.innerHTML))
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			switchcount++;
		} else {
			if (switchcount == 0 && dir == 'asc') {
				dir = 'desc';
				switching = true;
			}
		}
	}
}
