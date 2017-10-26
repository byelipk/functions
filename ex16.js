// Generalized function
function add(x, y) {
  return x + y;
}

function sub(x, y) {
  return x - y;
}

function mul(x, y) {
  return x * y;
}

function div(x, y) {
  return x / y;
}

function work(a, b, c) {
  return `${a} ${b} ${c}`;
}

// What is partial application?
// How is partial application different from currying?
//
// Partial application and currying are two different techniques for
// specializing a generalized function.
//
// Partial application takes some of the arguments now, and the rest of
// them later.
//
// Currying is like partial application, but it only takes one argument
// at a time.
function partial(fn, ...firstArgs) {
  return function applied(...lastArgs) {
    return fn(...firstArgs, ...lastArgs);
  }
}

// Specialized function
var addTo10 = partial(add, 10);
var subFrom10 = partial(sub, 10);
var printABPlus = partial(work, 'a', 'b');

console.log( addTo10(1) )
console.log( subFrom10(1) )
console.log( printABPlus('d') )