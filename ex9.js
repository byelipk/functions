
var output = console.log.bind(console);
var printIf = when(output);
var isLongEnough = not(isShortEnough);

function isShortEnough(str) {
  return str.length <= 5;
}

// function output(txt) {
//   console.log(txt);
// }

// function printIf(predicate) {
//   return function(msg) {
//     if (predicate(msg)) {
//       output(msg);
//     }
//   }
// }

// function isLongEnough(str) {
//   return !isShortEnough(str);
// }

function not(fn) {
  return function negated(...args) {
    return !fn(...args);
  }
}

function when(fn) {
  return function (predicate) {
    return function (...args) {
      if (predicate(...args)) {
        return fn(...args);
      }
    }
  }
}

var msg1 = "hello";
var msg2 = msg1 + " World";

printIf(isShortEnough)(msg1);
printIf(isLongEnough)(msg2);
