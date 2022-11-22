let characterLinks;

window.onload = () => {};

function addEventsOnChars() {
	$.ajax({
		url: '../js/chars.json',
		dataType: 'json',
		async: false,
		success: function (data) {
			characterLinks = data;
		},
	});

	$('img').click(function () {
		window.open(characterLinks[$(this).attr('alt')]);
	});
}
