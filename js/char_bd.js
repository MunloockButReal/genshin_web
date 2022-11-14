let characterLinks;

$.ajax({
  url: "../js/chars.json",
  dataType: "json",
  async: false,
  success: function (data) {
    characterLinks = data;
  },
});

$("img").click(function () {
  if (Object.keys(characterLinks).includes($(this).attr("alt"))) {
    window.open(characterLinks[$(this).attr("alt")]);
  }
});
