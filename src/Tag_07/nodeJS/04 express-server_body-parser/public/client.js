$(function () {

  $.get("/heroes", function (heroes) {
    heroes.forEach(function (hero) {
      $("<li></li>")
        .text(hero)
        .appendTo("ul#heroes");
    });
  });

});