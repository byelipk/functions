function compose(...fns) {
  return pipe(...fns.reverse());
}

function pipe(...fns) {
  return function piped(result) {
    fns.forEach(function loop(fn) {
      result = fn(result);
    });
    return result;
  }
}

function increment(x) { return x + 1; }
function decrement(x) { return x - 1; }
function double(x) { return x * 2; }
function half(x) { return x / 2; }

var f = compose(decrement, double, increment, half); // right to left
var p = pipe(half, increment, double, decrement); // left right right

console.log( f(3) )
console.log( p(3) )