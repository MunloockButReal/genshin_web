// File reader
/*
var url = "../htmls/chars.json";
var xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.send();

let charData;
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var result = JSON.parse(xhr.responseText);
            charData = result;
        }
    }
};
*/

var charData;
var url = "../htmls/chars.json";
fetch(url).then((response) => 
{ return response.json(); }).then((data) => 
{ charData = data });


/*
function readData() {
let response = fetch(url);

if (response.ok) { // если HTTP-статус в диапазоне 200-299
  // получаем тело ответа (см. про этот метод ниже)
  let charData = response.json();
} else {
  alert("Ошибка HTTP: " + response.status);
}
}*/
// Dynamic table

window.onload = () => {

    loadTableData(charData);
    //sort and color HP
    sortTable(3);
    colorcode("HP");
    //sort and color ATK
    sortTable(4);
    colorcode("ATK");
    // sort and color DEF
    sortTable(5);
    colorcode("DEF");
    //back to default sort on load
    sortTable(3);
    sortTable(0);
};

function loadTableData(charData) {
    const tableBody = document.getElementById("MyTableBody");
    let dataHtml = "";

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
    tableBody.innerHTML = dataHtml;
}
let colorsArray = [
    "#aa0000", "#ae0c00", "#b31800", "#b72400", "#bb3000", "#bf3d00", "#c44900", "#c85500",
    "#cc6100", "#d06d00", "#d57900", "#d98500", "#dd9100", "#e19d00", "#e6a900", "#eab600",
    "#eec200", "#f2ce00", "#f7da00", "#fbe600", "#fff200", "#f2ee00", "#e6e900", "#d9e500",
    "#cce000", "#bfdc00", "#b3d700", "#a6d300", "#99ce00", "#8cca00", "#80c600", "#73c100",
    "#66bd00", "#59b800", "#4db400", "#40af00", "#33ab00", "#26a600", "#1aa200",
];
function colorcode(columnName) {
    var f = document.getElementsByClassName(columnName);
    var min = Math.round(parseInt(f[0].innerHTML) * 0.95);
    var max = Math.round(parseInt(f[f.length - 1].innerHTML) * 1.05);

    step = Math.round(((max - min) / colorsArray.length)); // step for minmax color
    let currentmin = min; // Minimum for color
    let current = 0; // current
    let colorNumber = 0; // Color number from p[]

    for (l = 0; l < f.length; l++) {
        current = f[l].innerHTML;
        if (current < currentmin + step - 1) {
            f[l].style.backgroundColor = colorsArray[colorNumber];
            if (colorNumber > 5) {
                f[l].style.color = "#000000";
            }
        } else {
            colorNumber++;
            currentmin += step;
            f[l].style.backgroundColor = colorsArray[colorNumber];
            if (colorNumber > 5) {
                f[l].style.color = "#000000";
            }
        }
    }
}


function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("MyTableBody");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 0; i < rows.length - 1; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir == "asc") {
                if (x.innerHTML - y.innerHTML > 0) {
                    shouldSwitch = true;
                    break;
                }
                if (isNaN(+x.innerHTML))
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
            } else if (dir == "desc") {
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
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
