import { getCookie, setCookie } from './mn-cookie.js';

if (getCookie('selectedPage') === null) {
	setCookie('selectedPage', 'Main', 60);
}
console.log(getCookie('href'));
$(document).ready(function () {
	let nav = $('.navbar-page');

	nav.html(`
  <ul id="navbarID">
	<li><a onclick="document.getElementById('navbarID').remove();">Remove all buttons</a></li>
	<li><a href="#banners.html">Banners</a></li>
	<li><a href="#reruns.html">Reruns</a></li>
	<li><a href="#chars_tab.html">Tables</a></li>
	<li class='active'><a href="#index.html">Main</a></li>
	<li><a href="#ntsh.html"></a></li>
  </ul>
  `);

	//   let page = getCookie()
	let text = '#navbarID li:contains(' + getCookie('selectedPage') + ')';
	console.log($(text).children().text());
	buildPage('#navbarID li:contains(' + getCookie('selectedPage') + ')');
	$('#navbarID li').click(function () {
		if ($(this).children().attr('href') != undefined) {
			setCookie('selectedPage', $(this).children().text(), 60);
		}

		// let href = $(_this).attr('href');
		// console.log(href);

		buildPage(this);
		console.log(getCookie('selectedPage'));
	});
});

function buildPage(_this) {
	$('#navbarID li.active').removeClass('active');
	$(_this).addClass('active');
	let href = $(_this).children().attr('href');
	let link = '';
	switch (href) {
		case '#banners.html':
			// console.log('banners');
			link = '/genshin_web/html/banners.html';
			break;
		case '#reruns.html':
			// console.log('reruns');
			link = '/genshin_web/html/reruns.html';
			break;
		case '#chars_tab.html':
			// console.log('char-tabs');
			link = '/genshin_web/html/chars_tab.html';
			break;
		case '#index.html':
			// console.log('index');
			link = '/genshin_web/html/test.html';
			break;
		case '#ntsh.html':
			// console.log('this is testHTML');
			link = '/genshin_web/html/test.html';
			break;
		default:
			return 0;
	}

	$('#content').load(link);
	setTimeout(() => {
		$('.non-active').removeClass('non-active');
		try {
			resizePage();
		} catch (e) {}
	}, 200);
}
