// unary function
function increment(x) {
  return sum(x, 1);
}

// binary
function sum(x, y) {
  return x + y;
}

// Stick to unary and binary functions. No n-ary functions.

function unary(fn) {
  return function one(arg) {
    return fn(arg);
  }
}

function binary(fn) {
  return function two(arg1, arg2) {
    return fn(arg1, arg2);
  }
}

// variadic function
function f(...args) {
  console.log(args);
}

var sum = binary(function(x, y) {
  return x + y;
});

var addOne = unary(function(n) { 
  return sum(1, n);
});

var g = unary(f);
var h = binary(f);

console.log( sum(1, 2) );
console.log( addOne(2) );

g(1,2,3,4,5);
h(1,2,3,4,5);