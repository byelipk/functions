// What's the spread like?

function spreadArgs(fn) {
  return function spread(args) {
    return fn(...args)
  }
}

function gatherArgs(fn) {
  return function gather(...args) {
    return fn(args);
  }
}

function f(x, y, z, w) {
  console.log(x + y + z + w);
}

function z(args) {
  console.log(args);
}

var g = spreadArgs(f);
var q = gatherArgs(z);

g([1,2,3,4]);
q(1,2,3,4);