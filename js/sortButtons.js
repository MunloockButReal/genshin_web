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

$(function () {
	function f_resresh() {
		// extended banner or not
		let bool;

		bType == 'byBanner' ? (bool = false) : 0;
		bType == 'byVersion' ? (bool = true) : 0;

		sortType == 'LastSeen' ? (sortType = 'lastDurationV') : 0;
		sortType == 'versort' ? (sortType = 'byVersion') : 0;

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
		if ($(this).attr('name') == 'sortType')
			id = $(this).parent().parent().parent().parent().attr('id');
		else id = $(this).parent().parent().parent().attr('id');
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
