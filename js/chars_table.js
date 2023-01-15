// File reader

var charData;

$.ajax({
	url: '/genshin_web/json/chars_table.json',
	dataType: 'json',
	async: false,
	success: function (data) {
		charData = data;
	},
});

$(function () {
	load_Table_Data(charData); // Dynamic table
	sortTable(3); //sort and color HP
	colorcode('HP');
	sortTable(4); //sort and color ATK
	colorcode('ATK');
	sortTable(5); // sort and color DEF
	colorcode('DEF');
	sortTable(3); //back to default sort on load
	sortTable(0);
});

function load_Table_Data(char_Data) {
	const tableBody = document.getElementById('MyTableBody');
	dataHtml = '';
	for (let char of char_Data) {
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

function colorcode(columnName) {
	var f = document.body.getElementsByClassName(columnName);

	var min = parseInt(f[0].innerHTML);
	var max = parseInt(f[f.length - 1].innerHTML);

	let currentmin = min;
	let current = 0;

	// Background color generation
	var rainbow = new Rainbow();
	rainbow.setSpectrum('darkred', 'orange', 'green');
	rainbow.setNumberRange(0, f.length);

	step = Math.round((max - min) / f.length);

	for (l = 0; l < f.length; l++) {
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
	let x = (y = shouldSwitch = switchcount = 0);
	var table = document.getElementById('MyTableBody');
	switching = true;
	let dir = 'asc';
	while (switching) {
		switching = false;
		let rows = table.getElementsByTagName('TR');
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
