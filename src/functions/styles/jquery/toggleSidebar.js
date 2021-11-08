import {$} from 'react-jquery-plugin';


const toggleSidebar = () => {

    var body = $("#body");
    var shadowClass = $(".mobile-sticky-body-overlay");


    if ($(window).width() < 768) {

      if (
        body.hasClass("sidebar-fixed") ||
        body.hasClass("sidebar-static")
      ) {
        $(this)
          .addClass("sidebar-toggle")
          .removeClass("sidebar-offcanvas-toggle");
        if (window.isMinified === false) {
          body
            .removeClass("sidebar-collapse sidebar-minified-out")
            .addClass("sidebar-minified");
          window.isMinified = true;
          window.isCollapsed = false;
        } else {
          body.removeClass("sidebar-minified");
          body.addClass("sidebar-minified-out");
          window.isMinified = false;
        }
      }
      
        shadowClass.addClass("active");
        $("body").css("overflow", "hidden");

      $(".mobile-sticky-body-overlay").on("click", function(e) {
        $(this).removeClass("active");
        $("#body").removeClass("sidebar-minified").addClass("sidebar-minified-out");
        $("body").css("overflow", "auto");
      });
    }

    if (
      body.hasClass("sidebar-fixed-offcanvas") ||
      body.hasClass("sidebar-static-offcanvas")
    ) {
      $(this)
        .addClass("sidebar-offcanvas-toggle")
        .removeClass("sidebar-toggle");
      if (window.isCollapsed === false) {
        body.addClass("sidebar-collapse");
        window.isCollapsed = true;
        window.isMinified = false;
      } else {
        body.removeClass("sidebar-collapse");
        body.addClass("sidebar-collapse-out");
        setTimeout(function () {
          body.removeClass("sidebar-collapse-out");
        }, 300);
        window.isCollapsed = false;
      }
    }

    if (
      body.hasClass("sidebar-fixed") ||
      body.hasClass("sidebar-static")
    ) {
      $(this)
        .addClass("sidebar-toggle")
        .removeClass("sidebar-offcanvas-toggle");
      if (window.isMinified === false) {
        body
          .removeClass("sidebar-collapse sidebar-minified-out")
          .addClass("sidebar-minified");
        window.isMinified = true;
        window.isCollapsed = false;
      } else {
        body.removeClass("sidebar-minified");
        body.addClass("sidebar-minified-out");
        window.isMinified = false;
      }
    }
  };


export { toggleSidebar };