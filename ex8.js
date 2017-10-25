// Point Free Style

function not(fn) {
  return function negated(...args) {
    return !fn(...args);
  }
}

function isOdd(x) {
  return x % 2 == 1;
}

// No points!
var isEven = not(isOdd);

console.log( isEven(2) );
console.log( isEven(3) );