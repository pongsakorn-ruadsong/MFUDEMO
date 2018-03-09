<%@include file="top.jsp" %>

<script type="text/javascript">
	$(document).ready(function() {
		eventShow();
	// 	reset();
	// 	animateText();
	// 	animateBlobs();

	// 	$(function() {
	// 	  var numberOfStars = 20;
		  
	// 	  for (var i = 0; i < numberOfStars; i++) {
	// 	    $('.congrats').append('<div class="blob fa fa-star ' + i + '"></div>');
	// 	  } 
	// 	  animateText();
	// 	  animateBlobs();
	// 	});

	// 	$('.congrats').click(function() {
	// 	  reset();
	// 	  animateText();
	// 	  animateBlobs();
	// 	});
	});
</script>
<style type="text/css">
$color-violet: #492684;
$color-purple: #bea4ff;
$color-yellow: #feb535;
$color-red: #ff6e83;
$color-cyan: #58cafe;
$animation-duration: 1.2s;

/* debug */
$debug-animation-count: infinite; // infinite | 1

.cannon__path {
	// border-left: 2px dashed #fff; // uncomment to have a behind the scenes look
}

/* Cannon */
.cannon {
	height: 21vh;
	width: 1px;
	position: relative;
	transform-origin: 50% 100%;
	animation: cannon-explosion $animation-duration cubic-bezier(0.18, 0.89, 0.32, 1.28) both;
	animation-iteration-count: $debug-animation-count;
}	
	/* Paths */
	.path {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		transform-origin: 50% 100%;
		padding-bottom: 30%;
		display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
	}
	
	/* Confettis */
	.confetti {
		flex: 0 1 auto;
		animation-duration: $animation-duration;
		animation-timing-function: ease-out;
		animation-fill-mode: both;
		animation-iteration-count: $debug-animation-count;
		
		&:nth-child(even) {
			animation-name: confetti-rotate-l;

			@keyframes confetti-rotate-l {
				0% {
					transform: rotate(0) scaleY(1);
				} 50% {
					transform: rotate(2turn) scaleY(1.5);
				} 100% {
					transform: rotate(2.05turn) scaleY(1);
				}
			}
		}

		.nth-child(odd) {
			animation-name: confetti-rotate-r;

			@keyframes confetti-rotate-r {
				0% {
					transform: rotate(0) scaleY(1);
				} 50% {
					transform: rotate(-2turn) scaleY(1.5);
				} 100% {
					transform: rotate(-2.05turn) scaleY(1);
				}
			}
		}
		/* Colors */
		color-1 {
			background-color: $color-yellow;
		}
		
		color-2 {
			background-color: $color-purple;
		}
		
		color-3 {
			background-color: $color-red;
		}
		
		color-4 {
			background-color: $color-cyan;
		}
	}
@keyframes cannon-explosion {
		0% {
			transform: scale(0);
		}
		80% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

/* Demo styles */

.party-popper {
	position: absolute;
	left: 50%;
	bottom: 5vh;
	font-size: 2em;
	transform: translateX(-50%) rotate(-45deg);
}

.cannon {
	position: absolute;
	bottom: 5vh;
	left: 50%;
}

.ribbon {
	height: 1em;
	width: .5em;
	border-radius: .1em;
}
		
.flake {
	height: .5em;
	width: .5em;
	border-radius: 50%;
}
.deg45{
	transform: rotate(45deg);
}
.deg90{

}
.deg135{

}
.deg180{

}
.deg225{

}
.confetti {
    flex: 0 1 auto;
    animation-duration: $animation-duration;
    animation-timing-function: ease-out;
    animation-fill-mode: both;
    animation-iteration-count: $debug-animation-count;
    animation-name: confetti-rotate;

  }

  @keyframes confetti-rotate {
        0% {
          transform: rotate(0) scaleY(1);
        } 50% {
          transform: rotate(2turn) scaleY(1.5);
        } 100% {
          transform: rotate(2.05turn) scaleY(1);
        }
      }

      .nth-child(odd) {
      animation-name: confetti-rotate-r;
 }
      @keyframes confetti-rotate-r {
        0% {
          transform: rotate(0) scaleY(1);
        } 50% {
          transform: rotate(-2turn) scaleY(1.5);
        } 100% {
          transform: rotate(-2.05turn) scaleY(1);
        }
      }

</style>

<div class="container" style="margin-top: 10%;">

<!-- <canvas id="confeti" class="active" width="100%" height="100vh"></canvas> -->

<div class="party-popper"></div>
<div class="cannon">
	<div class="cannon__path cannon path deg45">
		<div class="cannon__confetti cannon__confetti flake cannon__confetti color-3"></div>
		<div class="cannon__confetti cannon__confetti ribbon cannon__confetti color-1"></div>
		<div class="cannon__confetti cannon__confetti ribbon cannon__confetti color-2"></div>
		<div class="cannon__confetti cannon__confetti flake cannon__confetti color-1"></div>
		<div class="cannon__confetti-spacer"></div>
	</div>
	<div class="cannon__path cannon path ">
		<div class="cannon__confetti cannon__confetti ribbon cannon__confetti color-2"></div>
		<div class="cannon__confetti cannon__confetti flake cannon__confetti color-2"></div>
		<div class="cannon__confetti cannon__confetti flake cannon__confetti color-3"></div>
		<div class="cannon__confetti cannon__confetti ribbon cannon__confetti color-1"></div>
		<div class="cannon__confetti cannon__confetti flake cannon__confetti color-4"></div>
		<div class="cannon__confetti-spacer"></div>
	</div>
	<div class="cannon__path cannon path ">
		<div class="cannon__confetti cannon__confetti ribbon cannon__confetti color-1"></div>
		<div class="cannon__confetti cannon__confetti ribbon cannon__confetti color-4"></div>
		<div class="cannon__confetti cannon__confetti ribbon cannon__confetti color-2"></div>
		<div class="cannon__confetti cannon__confetti flake cannon__confetti color-3"></div>
		<div class="cannon__confetti-spacer"></div>
	</div>
	<div class="cannon__path cannon path ">
		<div class="cannon__confetti cannon__confetti flake cannon__confetti color-3"></div>
		<div class="cannon__confetti cannon__confetti ribbon cannon__confetti color-1"></div>
		<div class="cannon__confetti cannon__confetti ribbon cannon__confetti color-4"></div>
		<div class="cannon__confetti cannon__confetti flake cannon__confetti color-3"></div>
		<div class="cannon__confetti cannon__confetti ribbon cannon__confetti color-2"></div>
		<div class="cannon__confetti-spacer"></div>
	</div>
	<div class="cannon__path cannon path ">
		<div class="cannon__confetti cannon__confetti ribbon cannon__confetti color-2"></div>
		<div class="cannon__confetti cannon__confetti flake cannon__confetti color-3"></div>
		<div class="cannon__confetti cannon__confetti flake cannon__confetti color-4"></div>
		<div class="cannon__confetti cannon__confetti ribbon cannon__confetti color-1"></div>
		<div class="cannon__confetti-spacer"></div>
	</div>
</div>




</div>
<%@include file="bottom.jsp" %>


<!-- <input type="text" mozactionhint="next"> -->
