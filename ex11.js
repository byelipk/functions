function composeRight(fn2, fn1) {
  return function comp(...args) {
    return fn2( fn1(...args) );
  }
}

function increment(x) {
  return x + 1;
}

function double(x) {
  return x * 2;
}

var f = composeRight(increment, double);
var p = composeRight(double, increment);

console.log( f(3) )
console.log( p(3) )