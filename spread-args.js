function spreadArgs(fn) {
  return function spreadFn(args) {
    return fn(...args);
  }
}

function foo(x, y) {
  return x + y;
}

function bar(fn) {
  return fn([1,2])
}

console.log(bar(foo))
console.log(bar(spreadArgs(foo)));