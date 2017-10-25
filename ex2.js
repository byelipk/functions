// Is this a pure function?
// Given the same input, will this function always return the same output?

const y = 1;

function foo(x) {
  return x + y;
}

console.log(foo(10));