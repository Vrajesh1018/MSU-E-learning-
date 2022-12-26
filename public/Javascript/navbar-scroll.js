// On scroll the color of navbar change

$(document).scroll(function () {
  var $nav = $(".navbar");
  $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
});
