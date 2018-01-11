<!DOCTYPE html>
<html>
<head>
	<title>test</title>
	<style type="text/css">
		@charset "UTF-8";
main {
  width: 70%;
  margin: 8rem auto 0;
}

h1 {
  font-weight: 800;
  font-family: "Open Sans", sans-serif;
  color: #46b7d5;
}

.min {
  padding-top: 5px;
  padding-left: 10px;
  color: #cccccc;
}

.max {
  padding-top: 5px;
  padding-right: 10px;
  color: #cccccc;
}

#helper {
  padding-top: 40px;
  color: #46b7d5;
  font-style: italic;
}

output {
  display: inline-block;
  font-size: 2em;
}

/* original css */
.rangeslider,
.rangeslider__fill {
  display: block;
  -moz-box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.3);
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

.rangeslider {
  background: #e6e6e6;
  position: relative;
}

.rangeslider--horizontal {
  height: 20px;
  width: 100%;
}

.rangeslider--vertical {
  width: 20px;
  min-height: 150px;
  max-height: 100%;
}

.rangeslider--disabled {
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);
  opacity: 0.4;
}

.rangeslider__fill {
  background: -webkit-linear-gradient(left, #abe0ed, #46b7d5);
  background: -o-linear-gradient(right, #abe0ed, #46b7d5);
  background: -moz-linear-gradient(right, #abe0ed, #46b7d5);
  background: linear-gradient(to right, #abe0ed, #46b7d5);
  position: absolute;
}

.rangeslider--horizontal .rangeslider__fill {
  top: 0;
  height: 100%;
}

.rangeslider--vertical .rangeslider__fill {
  bottom: 0;
  width: 100%;
}

.rangeslider__handle {
  background: white;
  color: #0085b2;
  font-weight: bold;
  font-size: 18px;
  border: 1px solid #ccc;
  cursor: pointer;
  display: inline-block;
  width: 100px;
  height: 40px;
  line-height: 38px;
  text-align: center;
  position: absolute;
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIwLjAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4xIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g");
  background-size: 100%;
  background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, rgba(255, 255, 255, 0)), color-stop(100%, rgba(0, 0, 0, 0.1)));
  background-image: -moz-linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.1));
  background-image: -webkit-linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.1));
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.1));
  -moz-box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  -moz-border-radius: 22px;
  -webkit-border-radius: 22px;
  border-radius: 22px;
}

.rangeslider__handle:after {
  font-family: FontAwesome;
  content: "";
  color: #cccccc;
}

.rangeslider__handle:before {
  font-family: FontAwesome;
  content: "";
  color: #cccccc;
}

.rangeslider__handle:active {
  background-img: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4xMiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==");
  background-size: 100%;
  background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, rgba(0, 0, 0, 0.1)), color-stop(100%, rgba(0, 0, 0, 0.12)));
  background-image: -moz-linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.12));
  background-image: -webkit-linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.12));
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.12));
}

.rangeslider--horizontal .rangeslider__handle {
  top: -10px;
  touch-action: pan-y;
  -ms-touch-action: pan-y;
}

.rangeslider--vertical .rangeslider__handle {
  left: -10px;
  touch-action: pan-x;
  -ms-touch-action: pan-x;
}

input[type="range"]:focus + .rangeslider .rangeslider__handle {
  -moz-box-shadow: 0 0 8px rgba(255, 0, 255, 0.9);
  -webkit-box-shadow: 0 0 8px rgba(255, 0, 255, 0.9);
  box-shadow: 0 0 8px rgba(255, 0, 255, 0.9);
}
	</style>
	<script type="text/javascript">
		//slider javascript
/*! rangeslider.js - v2.0.2 | (c) 2015 @andreruffert | MIT license | https://github.com/andreruffert/rangeslider.js */
! function(a) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function(a) {
  "use strict";

  function b() {
    var a = document.createElement("input");
    return a.setAttribute("type", "range"), "text" !== a.type
  }

  function c(a, b) {
    var c = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function() {
      return a.apply(null, c)
    }, b)
  }

  function d(a, b) {
    return b = b || 100,
      function() {
        if (!a.debouncing) {
          var c = Array.prototype.slice.apply(arguments);
          a.lastReturnVal = a.apply(window, c), a.debouncing = !0
        }
        return clearTimeout(a.debounceTimeout), a.debounceTimeout = setTimeout(function() {
          a.debouncing = !1
        }, b), a.lastReturnVal
      }
  }

  function e(a) {
    return a && (0 === a.offsetWidth || 0 === a.offsetHeight || a.open === !1)
  }

  function f(a) {
    for (var b = [], c = a.parentNode; e(c);) b.push(c), c = c.parentNode;
    return b
  }

  function g(a, b) {
    function c(a) {
      "undefined" != typeof a.open && (a.open = a.open ? !1 : !0)
    }
    var d = f(a),
      e = d.length,
      g = [],
      h = a[b];
    if (e) {
      for (var i = 0; e > i; i++) g[i] = d[i].style.cssText, d[i].style.display = "block", d[i].style.height = "0", d[i].style.overflow = "hidden", d[i].style.visibility = "hidden", c(d[i]);
      h = a[b];
      for (var j = 0; e > j; j++) d[j].style.cssText = g[j], c(d[j])
    }
    return h
  }

  function h(a, b) {
    var c = parseFloat(a);
    return Number.isNaN(c) ? b : c
  }

  function i(a) {
    return a.charAt(0).toUpperCase() + a.substr(1)
  }

  function j(b, e) {
    if (this.$window = a(window), this.$document = a(document), this.$element = a(b), this.options = a.extend({}, n, e), this.polyfill = this.options.polyfill, this.orientation = this.$element[0].getAttribute("data-orientation") || this.options.orientation, this.onInit = this.options.onInit, this.onSlide = this.options.onSlide, this.onSlideEnd = this.options.onSlideEnd, this.DIMENSION = o.orientation[this.orientation].dimension, this.DIRECTION = o.orientation[this.orientation].direction, this.DIRECTION_STYLE = o.orientation[this.orientation].directionStyle, this.COORDINATE = o.orientation[this.orientation].coordinate, this.polyfill && m) return !1;
    this.identifier = "js-" + k + "-" + l++, this.startEvent = this.options.startEvent.join("." + this.identifier + " ") + "." + this.identifier, this.moveEvent = this.options.moveEvent.join("." + this.identifier + " ") + "." + this.identifier, this.endEvent = this.options.endEvent.join("." + this.identifier + " ") + "." + this.identifier, this.toFixed = (this.step + "").replace(".", "").length - 1, this.$fill = a('<div class="' + this.options.fillClass + '" />'), this.$handle = a('<div class="' + this.options.handleClass + '" />'), this.$range = a('<div class="' + this.options.rangeClass + " " + this.options[this.orientation + "Class"] + '" id="' + this.identifier + '" />').insertAfter(this.$element).prepend(this.$fill, this.$handle), this.$element.css({
      position: "absolute",
      width: "1px",
      height: "1px",
      overflow: "hidden",
      opacity: "0"
    }), this.handleDown = a.proxy(this.handleDown, this), this.handleMove = a.proxy(this.handleMove, this), this.handleEnd = a.proxy(this.handleEnd, this), this.init();
    var f = this;
    this.$window.on("resize." + this.identifier, d(function() {
      c(function() {
        f.update()
      }, 300)
    }, 20)), this.$document.on(this.startEvent, "#" + this.identifier + ":not(." + this.options.disabledClass + ")", this.handleDown), this.$element.on("change." + this.identifier, function(a, b) {
      if (!b || b.origin !== f.identifier) {
        var c = a.target.value,
          d = f.getPositionFromValue(c);
        f.setPosition(d)
      }
    })
  }
  Number.isNaN = Number.isNaN || function(a) {
    return "number" == typeof a && a !== a
  };
  var k = "rangeslider",
    l = 0,
    m = b(),
    n = {
      polyfill: !0,
      orientation: "horizontal",
      rangeClass: "rangeslider",
      disabledClass: "rangeslider--disabled",
      horizontalClass: "rangeslider--horizontal",
      verticalClass: "rangeslider--vertical",
      fillClass: "rangeslider__fill",
      handleClass: "rangeslider__handle",
      startEvent: ["mousedown", "touchstart", "pointerdown"],
      moveEvent: ["mousemove", "touchmove", "pointermove"],
      endEvent: ["mouseup", "touchend", "pointerup"]
    },
    o = {
      orientation: {
        horizontal: {
          dimension: "width",
          direction: "left",
          directionStyle: "left",
          coordinate: "x"
        },
        vertical: {
          dimension: "height",
          direction: "top",
          directionStyle: "bottom",
          coordinate: "y"
        }
      }
    };
  j.prototype.init = function() {
    this.update(!0, !1), this.$element[0].value = this.value, this.onInit && "function" == typeof this.onInit && this.onInit()
  }, j.prototype.update = function(a, b) {
    a = a || !1, a && (this.min = h(this.$element[0].getAttribute("min"), 0), this.max = h(this.$element[0].getAttribute("max"), 100), this.value = h(this.$element[0].value, this.min + (this.max - this.min) / 2), this.step = h(this.$element[0].getAttribute("step"), 1)), this.handleDimension = g(this.$handle[0], "offset" + i(this.DIMENSION)), this.rangeDimension = g(this.$range[0], "offset" + i(this.DIMENSION)), this.maxHandlePos = this.rangeDimension - this.handleDimension, this.grabPos = this.handleDimension / 2, this.position = this.getPositionFromValue(this.value), this.$element[0].disabled ? this.$range.addClass(this.options.disabledClass) : this.$range.removeClass(this.options.disabledClass), this.setPosition(this.position, b)
  }, j.prototype.handleDown = function(a) {
    if (a.preventDefault(), this.$document.on(this.moveEvent, this.handleMove), this.$document.on(this.endEvent, this.handleEnd), !((" " + a.target.className + " ").replace(/[\n\t]/g, " ").indexOf(this.options.handleClass) > -1)) {
      var b = this.getRelativePosition(a),
        c = this.$range[0].getBoundingClientRect()[this.DIRECTION],
        d = this.getPositionFromNode(this.$handle[0]) - c,
        e = "vertical" === this.orientation ? this.maxHandlePos - (b - this.grabPos) : b - this.grabPos;
      this.setPosition(e), b >= d && b < d + this.handleDimension && (this.grabPos = b - d)
    }
  }, j.prototype.handleMove = function(a) {
    a.preventDefault();
    var b = this.getRelativePosition(a),
      c = "vertical" === this.orientation ? this.maxHandlePos - (b - this.grabPos) : b - this.grabPos;
    this.setPosition(c)
  }, j.prototype.handleEnd = function(a) {
    a.preventDefault(), this.$document.off(this.moveEvent, this.handleMove), this.$document.off(this.endEvent, this.handleEnd), this.$element.trigger("change", {
      origin: this.identifier
    }), this.onSlideEnd && "function" == typeof this.onSlideEnd && this.onSlideEnd(this.position, this.value)
  }, j.prototype.cap = function(a, b, c) {
    return b > a ? b : a > c ? c : a
  }, j.prototype.setPosition = function(a, b) {
    var c, d;
    void 0 === b && (b = !0), c = this.getValueFromPosition(this.cap(a, 0, this.maxHandlePos)), d = this.getPositionFromValue(c), this.$fill[0].style[this.DIMENSION] = d + this.grabPos + "px", this.$handle[0].style[this.DIRECTION_STYLE] = d + "px", this.setValue(c), this.position = d, this.value = c, b && this.onSlide && "function" == typeof this.onSlide && this.onSlide(d, c)
  }, j.prototype.getPositionFromNode = function(a) {
    for (var b = 0; null !== a;) b += a.offsetLeft, a = a.offsetParent;
    return b
  }, j.prototype.getRelativePosition = function(a) {
    var b = i(this.COORDINATE),
      c = this.$range[0].getBoundingClientRect()[this.DIRECTION],
      d = 0;
    return "undefined" != typeof a["page" + b] ? d = a["client" + b] : "undefined" != typeof a.originalEvent["client" + b] ? d = a.originalEvent["client" + b] : a.originalEvent.touches && a.originalEvent.touches[0] && "undefined" != typeof a.originalEvent.touches[0]["client" + b] ? d = a.originalEvent.touches[0]["client" + b] : a.currentPoint && "undefined" != typeof a.currentPoint[this.COORDINATE] && (d = a.currentPoint[this.COORDINATE]), d - c
  }, j.prototype.getPositionFromValue = function(a) {
    var b, c;
    return b = (a - this.min) / (this.max - this.min), c = Number.isNaN(b) ? 0 : b * this.maxHandlePos
  }, j.prototype.getValueFromPosition = function(a) {
    var b, c;
    return b = a / (this.maxHandlePos || 1), c = this.step * Math.round(b * (this.max - this.min) / this.step) + this.min, Number(c.toFixed(this.toFixed))
  }, j.prototype.setValue = function(a) {
    a !== this.value && this.$element.val(a).trigger("input", {
      origin: this.identifier
    })
  }, j.prototype.destroy = function() {
    this.$document.off("." + this.identifier), this.$window.off("." + this.identifier), this.$element.off("." + this.identifier).removeAttr("style").removeData("plugin_" + k), this.$range && this.$range.length && this.$range[0].parentNode.removeChild(this.$range[0])
  }, a.fn[k] = function(b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return this.each(function() {
      var d = a(this),
        e = d.data("plugin_" + k);
      e || d.data("plugin_" + k, e = new j(this, b)), "string" == typeof b && e[b].apply(e, c)
    })
  }
});

//custom slider javascript
var $element = $('input[type="range"]');
var $handle;

$element
  .rangeslider({
    polyfill: false,
    onInit: function() {
      $handle = $('.rangeslider__handle', this.$range);
      updateHandle($handle[0], this.value);
    }
  })
  .on('input', function() {
    updateHandle($handle[0], this.value);
  });

function updateHandle(el, val) {
  el.textContent = " " + "$" + val + " ";
}

$(document).ready(function(){
  
  //when slider changes, hide start message
$("input").on("change", function() {
  $("#helper").fadeOut("slow");
});

//promo-box
$("#js-promo-box").hide();
$("#promo-link").on("click", function(){
  $("#js-promo-box").slideToggle();
  return false;
});
  
});
	</script>
</head>
<body>
	<meta name="viewport" content="width=device-width, initial-scale=1">

		<!-- font awesome -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/fonts/FontAwesome.otf">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/fonts/fontawesome-webfont.eot">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/fonts/fontawesome-webfont.svg">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/fonts/fontawesome-webfont.ttf">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/fonts/fontawesome-webfont.woff">


		<main>
		<input type="range" value="6500" step="25" min="1000" max="12600">

		<div class="range">
		  <small class="min pull-left">Min</small>
		  <small class="max pull-right">Max</small>
		</div>

		  <p id="helper" class="slideRight text-center"><small>Slide to get started &#x2192</small></p>
  
</main>
</body>
</html>