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

		loadTableData(
			'rerunTable',
			read(rarity).sort(sortField(sortType, sortWay)),
			bool
		);
		addEventsOnChars();
		resizePage();
	}

	let rarity = $('input[type=radio][name=rarity]:checked').val();
	let bType = $('input[type=radio][name=bType]:checked').val();
	let sortType = $('input[type=radio][name=sortType]:checked').val();
	let sortWay = $('input[type=radio][name=way]:checked').val();

	f_resresh();

	$('input[type=radio]').change(function () {
		rarity = $('input[type=radio][name=rarity]:checked').val();
		bType = $('input[type=radio][name=bType]:checked').val();
		sortType = $('input[type=radio][name=sortType]:checked').val();
		sortWay = $('input[type=radio][name=way]:checked').val();

		f_resresh();
	});
});
