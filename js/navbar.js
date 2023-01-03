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

	$('#navbarID a').click(function () {
		for (el of nav.children().children()) {
			if ($(this).text() === $(el).children().text()) {
				$('#navbarID li.active').removeClass('active');
				$(el).addClass('active');
				break;
			}
		}

		let href = $(this).attr('href');
		// console.log(href);
		let link = '#';
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
	});
});
