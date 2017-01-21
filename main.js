(function() {
  function incrementDimension(dimensionString) {
    var numericalDimensionAsString = dimensionString.slice(0, -2)
    var numericalDimension = parseInt( numericalDimensionAsString )
    numericalDimension++;
    return numericalDimension + "px";
  }

  function createOffset(dimension, position) {
    var numericalDimensionAsString = dimension.slice(0, -2);
    var numericalDimension = parseInt( numericalDimensionAsString );
    var offset = numericalDimension / 2;
    var value = position - offset;
    return value + "px";
  }

  function rippleReachedLimit( dimensionAsString ) {
    var numericalDimensionAsString = dimensionAsString.slice(0, -2);
    var numericalDimension = parseInt( numericalDimensionAsString );
    if (numericalDimension > (window.innerWidth * 2) ) {
      return true;
    } else {
      return false;
    }
  }

  function createRipple(event) {
    var ripple = document.createElement("div");
    ripple.style.top = event.clientY + "px";
    ripple.style.left = event.clientX + "px";
    ripple.style.width = "0px";
    ripple.style.height = "0px";
    ripple.className = "ripple";
    document.body.appendChild( ripple );

    var rippleAnimatorId = setInterval(function() {
      ripple.style.width = incrementDimension( ripple.style.width )
      ripple.style.height = incrementDimension( ripple.style.height )
      ripple.style.left = createOffset( ripple.style.width, event.clientX )
      ripple.style.top = createOffset( ripple.style.width, event.clientY )
      if ( rippleReachedLimit( ripple.style.width ) ) {
        document.body.removeChild(ripple)
        clearInterval( rippleAnimatorId )
      }
    }, 5);
  }

  document.addEventListener("DOMContentLoaded", function() {
    document.body.onclick = function(event) {
      var i = 0
      var rippleAnimatorId = setInterval(function() {
        createRipple(event);
        i++;
        if (i === 3) {
          clearInterval( rippleAnimatorId )
        }
      }, 1000);
    }
  })
})()