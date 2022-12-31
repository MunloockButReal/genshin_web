$(document).ready(function () {
	let nav = $('.navbar-page');

	nav.html(`    
    <div class="button-div">
    <input style="display: block;" class="BRT-Buttons brt-button-black" type="submit" value="Remove all buttons"
      onclick="document.getElementById('buttonDiv').remove();">
    <form action="/genshin_web/html/banners.html">
      <input class="BRT-Buttons brt-button-black" type="submit" value="Banners" />
    </form>
    <form action="/genshin_web/html/reruns.html">
      <input class="BRT-Buttons brt-button-black" type="submit" value="Reruns" />
    </form>
    <form action="/genshin_web/html/chars_tab.html">
      <input class="BRT-Buttons brt-button-black" type="submit" value="Tables" />
    </form>
    <form action="/genshin_web/index.html">
      <input class="BRT-Buttons brt-button-black" type="submit" value="Main" />
    </form>
    <form action="/genshin_web/html/test.html">
      <input class="BRT-Buttons brt-button-black" type="submit" value="Test page" />
    </form>
    </div>`);
});
