var { when, not, uncurry, partialRight } = require("./toolset");

function output(msg) {
  console.log(msg);
}

function isShortEnough(str) {
  return str.length <= 5;
}

var isLongEnough = not( isShortEnough );

var printIf = uncurry( partialRight( when, output ) );

printIf(isShortEnough, "nice");
printIf(isLongEnough, "nice");