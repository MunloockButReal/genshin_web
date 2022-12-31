let characterLinks;

window.onload = () => {};

function addEventsOnChars() {
	$.ajax({
		url: '/json/chars.json',
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
	let box = document.querySelector(`.reruns`);
	let width = box.offsetWidth;
	let height = box.offsetHeight;
	$('body').css('min-width', width + 25 + 'px');
	$('body').css('min-height', height + 25 + 'px');
	$('.pagewrapper').css('display', 'flex');
	$('.pagewrapper').css('flex-direction', 'column');
	$('body').css('justify-content', 'center');
}
