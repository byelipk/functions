// Fusion

function add1(v) { return v + 1; }
function mul2(v) { return v * 2; }
function div3(v) { return v / 3; }

var list = [2,5,8,11,14,17,20];

list
.map(add1)
.map(mul2)
.map(div3);

//////////////

function composeRight(fn1, fn2) {
  return function(...args) {
    return fn1( fn2(...args) );
  }
}

// Since all these functions have the same arity, we can compose
// them together with reduce. Composing works right to left. Compose will
// work with reduce because the reduce function passes to arguments to the provided
// callback, and composeRight take 2 arguments.
// Reduce is the swiss army knife.
var result = list.map( [ div3, mul2, add1 ].reduce( composeRight ))

console.log(result);