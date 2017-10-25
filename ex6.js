// Sometimes we'll have functions that expect things in a certain order
// and the order is inconvenient.

function flip(fn) {
  return function flipped(arg1, arg2, ...args) {
    return fn(arg2, arg1, ...args);
  } 
}

function f(...args) {
  console.log(args);
}

var g = flip(f);

g(1,2,3,4,5);

function reverseArgs(fn) {
  return function reversed(...args) {
    return fn(...args.reverse());
  }
}

var h = reverseArgs(f);

h(1,2,3);

