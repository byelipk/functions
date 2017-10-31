function unary(fn) {
  return function onlyOneArg(arg) {
    return fn(arg);
  }
}

var addOne = unary(function adder(x) {
  return x + 1;
});

console.log(addOne(1));

console.log([1,2,3].map(addOne));
console.log(["1","2","3"].map( parseInt ));
console.log(["1","2","3"].map( unary(parseInt) ));