function addEventsOnChars() {
	let characterLinks;
	$.ajax({
		url: '/genshin_web/json/chars.json',
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

function resizePage() {
	try {
		width = $('.reruns').width();
		height = $('.reruns').height();
		if (width === undefined || height === undefined) {
			width = 600;
			height = 0;
		}
	} catch (error) {}
	$('body').css('min-width', width + 25 + 'px');
	$('body').css('min-height', height + 25 + 'px');
	$('.pagewrapper').css('display', 'flex');
	$('.pagewrapper').css('flex-direction', 'column');
	$('body').css('justify-content', 'center');
}
