if (
	getCookie('rrdRarity') === null ||
	getCookie('rrdVB') === null ||
	getCookie('rrdSortType') === null ||
	getCookie('rrdWay') === null
) {
	setCookie('rrdRarity', 5, 60);
	setCookie('rrdVB', 'byBanner', 60);
	setCookie('rrdSortType', 'versort', 60);
	setCookie('rrdWay', 'desc', 60);
}

$(document).ready(function () {
	function f_resresh() {
		// extended banner or not
		let bool;
		if (bType === 'byBanner') {
			bool = false;
		} else if (bType === 'byVersion') {
			bool = true;
		}

		if (sortType === 'LastSeen') {
			sortType = 'lastDurationV';
		}

		if (sortType === 'versort') {
			sortType = 'byVersion';
		}

		loadTableData(
			'rerunTable',
			read(rarity).sort(sortField(sortType, sortWay)),
			bool
		);
		addEventsOnChars();
		resizePage();
	}

	let rarity = getCookie('rrdRarity');
	let bType = getCookie('rrdVB');
	let sortType = getCookie('rrdSortType');
	let sortWay = getCookie('rrdWay');

	$(`#r${rarity}ID`).prop('checked', true);
	$(`#${bType}ID`).prop('checked', true);
	$(`#${sortType}ID`).prop('checked', true);
	$(`#${sortWay}ID`).prop('checked', true);
	f_resresh();

	$('input[type=radio]').change(function () {
		id = $(this).parent().parent().parent().attr('id');
		switch (id) {
			case 'rarity-button':
				rarity = $('input[type=radio][name=rarity]:checked').val();
				setCookie('rrdRarity', rarity, 60);
				break;
			case 'BV-button':
				bType = $('input[type=radio][name=bType]:checked').val();
				setCookie('rrdVB', bType, 60);
				break;
			case 'sortType-button':
				sortType = $('input[type=radio][name=sortType]:checked').val();
				setCookie('rrdSortType', sortType, 60);
				break;
			case 'way-button':
				sortWay = $('input[type=radio][name=way]:checked').val();
				setCookie('rrdWay', sortWay, 60);
				break;
			default:
				console.log('Some error...');
				break;
		}

		f_resresh();
	});
});
