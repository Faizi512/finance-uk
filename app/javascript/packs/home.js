import Common from "./common.js"
import 'parsleyjs'

class Home extends Common {
  constructor() {
    super();
    var CI = this;
    this.validate("#dealform");
    $(document).scroll(function() {
      var y = $(this).scrollTop();
      if (y > 600) {
        $('.floting-icon').fadeIn();
      } else {
        $('.floting-icon').fadeOut();
      }
    });

    $( ".close-b" ).click(function() {
      $('.modal2').hide();
    })

    $(document).ready(function(){
      var email = CI.getUrlParameter('email')
      $('.pre-pop').val(email)
    })

    $('.partner-text').click(function(){
      $('.modal2').show();
    })

    $('#customCheck1').click(function(){
      CI.ToggleCheckBox()
    })


    $('.source').val(this.getUrlParameter('source') || "MMD")
    $(".optinUrl").val(this.getUrlParameter("tPar[optIn]") || "https://financeinuk.com/")
  }

  ToggleCheckBox(){
    var chk2 = $("input[type='checkbox'][name='partners-input']");
    chk2.prop("checked", !chk2.prop("checked"));
  }
}
export default new Home();
