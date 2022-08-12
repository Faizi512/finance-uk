// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
import 'src/application.scss'

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
require("rangeslider.js")

Rails.start()
Turbolinks.start()
ActiveStorage.start()

import "./woco.accordion.min.js"
import WOW from "./wow.js"

$(() => {
  $(".accordion").accordion()
   new WOW().init();
  var valueBubble = '<output class="rangeslider__value-bubble" />';

  function updateValueBubble(e, l, a) {
      e = e || a.position, l = l || a.value;
      var n = $(".rangeslider__value-bubble", a.$range),
          u = e + a.grabPos,
          i = u <= a.handleDimension ? a.handleDimension : u >= a.maxHandlePos ? a.maxHandlePos : u;
      n.length && (n[0].style.left = Math.ceil(i) + "px", n[0].innerHTML = l)
  }
  $('input[type="range"]').rangeslider({
      polyfill: false,
      onInit: function() {
          this.$range.append($(valueBubble)), updateValueBubble(null, "&#163;500", this)
      },
      onSlide: function(e, l) {
          $('input[type="range"]').data().plugin_rangeslider.step = 100
          updateValueBubble(e, "&#163;" + l, this)
      }
  }), $(document).ready(function() {
      $(".formouter ul li").click(function() {
          $(".formouter ul li").removeClass("active"), $(this).addClass("active")
      })
  });
})
