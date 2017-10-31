function gatherArgs(fn) {
  return function gatherFn(...args) {
    return fn(args);
  }
}

function foo(x) {
  return x.concat(10);
}

function bar(fn) {
  return fn(1,2);
}

function combineFirstTwo([v1, v2]) {
  return v1 + v2;
}

console.log( [1,2,3,4,5].reduce(gatherArgs(combineFirstTwo)) );

console.log( bar(gatherArgs(foo)) )
