/**
 * @file
 * This is main script of Go to Comments.
 */
 
function gotocomments_getcookie() {
  var name = "gotocomments-hidden=";
  var ca = document.cookie.split(';');
  for (var i = 0, found = false; !found && i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) != -1) {
      return c.substring(name.length, c.length);
    }
  }
}

(function ($) {
  $(window).load(function () {
    Drupal.settings.gotocomments.comment_count = Drupal.settings.gotocomments.comment_count || {};
    var counter = Drupal.settings.gotocomments.comment_count;
    var height = $("#main footer").position().top;
    var text = (counter == 0) ? 'Эту страницу еще никто не комментировал. Станьте первым!' : 'Присоединяйтесь к обсуждению!';
    var c_class = (counter > 0) ? ' class="gotocomments-positive-counter"' : '';
    $("body").append(
      '<div id="gotocomments-block"><div id="gotocomments-wrapper"><div id="gotocomments-counter"' + c_class
      + '>' + counter + '</div><div id="gotocomments-text">' + text
      + '</div></div><div id="gotocomments-hide"><div id="gotocomments-arrow"></div></div></div>'
    );

    if ($(window).scrollTop() >= height - 1) {
      $('#gotocomments-block').addClass("gotocomments-viewing");
    }

    $(window).scroll(function() {
      if ($(this).scrollTop() >= height - 1) {
        $('#gotocomments-block').addClass("gotocomments-viewing");
      }
      else {
        $('#gotocomments-block').removeClass("gotocomments-viewing");
      }
    });

    $('#gotocomments-wrapper').click(function() {

      //if ($(this).is(':animated'))
      //{
      if ($('#gotocomments-block').hasClass("gotocomments-viewing")) {
        $('body,html').animate({
          scrollTop: 0
        }, 600);
      }
      else {
        $('body,html').animate({
          scrollTop: height
        }, 600);
      }
      //}
    });
    $('#gotocomments-hide').click(function() {
      var value = gotocomments_getcookie();
      date = new Date();
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toGMTString();

      if (value == "true") {
        value = "false";
        $("#gotocomments-block").addClass("gotocomments-hidden");
      }
      else {
        value = "true";
        $("#gotocomments-block").removeClass("gotocomments-hidden");
      }
      document.cookie = "gotocomments-hidden=" + value + expires;
    });/*
     $('#gotocomments-block').mouseenter(function () {
     $(this).fadeTo(165, 1);
     });
     $('#gotocomments-block').mouseleave(function () {
     $(this).fadeTo(165, 0.8);
     });*/

    if (gotocomments_getcookie() == "false") {
      $("#gotocomments-block").addClass("gotocomments-hidden");
    }
  });
})(jQuery);
