import {$} from 'react-jquery-plugin';


const toggleSidebar = () => {

    var body = $("#body");
    var shadowClass = $(".mobile-sticky-body-overlay");


    if ($(window).width() < 768) {

        shadowClass.addClass("active");
        $("body").css("overflow", "hidden");

        $("body")
          .addClass("sidebar-toggle")
          .removeClass("sidebar-minified-out")
          .addClass("sidebar-minified");

        // if (window.isMinified === false) {
        //   body
        //     .removeClass("sidebar-collapse sidebar-minified-out")
        //     .addClass("sidebar-minified");
        //   window.isMinified = true;
        //   window.isCollapsed = false;
        // } else {
        //   body.removeClass("sidebar-minified");
        //   body.addClass("sidebar-minified-out");
        //   window.isMinified = false;
        // }

        $(".mobile-sticky-body-overlay").on("click", function(e) {
          console.log(2)
          $(this).removeClass("active");
          $("#body").removeClass("sidebar-minified").addClass("sidebar-minified-out");
          $("body").css("overflow", "auto");
        });
    }

    
  };


export { toggleSidebar };