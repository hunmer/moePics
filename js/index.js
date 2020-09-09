$(function() {
  var items = $('#countrySelection-items').width();
  var itemSelected = document.getElementsByClassName('countrySelection-item');
  // $("#countrySelection-items").scrollLeft(200).delay(200).animate({
  //   scrollLeft: "-=200"
  // }, 2000, "easeOutQuad");

  $('.countrySelection-item').bind('mousewheel', function(event) {
    if(event.originalEvent.wheelDelta > 0){
        scrollContent("left", 30);
    }else{
        scrollContent("right", -30);
    }
  });

  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    var scrolling = false;
    $(".countrySelection-paddle-right").bind("mouseover", function(event) {
        scrolling = true;
        scrollContent("right", -30);
    }).bind("mouseout", function(event) {
        scrolling = false;
    });

    $(".countrySelection-paddle-left").bind("mouseover", function(event) {
        scrolling = true;
        scrollContent("left", 30);
    }).bind("mouseout", function(event) {
        scrolling = false;
    });
  }

  var g_scroll_left = 0;
   function scrollContent(direction, px = 3) {
    g_scroll_left+=px;
    if(g_scroll_left <= 0){
      g_scroll_left = 0;
    }
    console.log(g_scroll_left);
        $("#countrySelection-items").animate({
            scrollLeft: g_scroll_left+'px'
        }, 1);
    }

});

