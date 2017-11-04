function partialThis(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn.apply(this, [...presetArgs, ...laterArgs]);
  }
}

function composeChainedMethods(...fns) {
  return function composed(accumulator) {
    return fns.reduceRight(function reducer(result, fn) {
      return fn.call(result);
    }, accumulator);
  }
}

function sum(acc, num) {
  return acc + num;
}

function double(acc, num) {
  return acc * num;
}

function isOdd(num) {
  return num % 2 === 1;
}

var result = composeChainedMethods(
  partialThis( Array.prototype.reduce, sum, 0 ),
  partialThis( Array.prototype.map, double ),
  partialThis( Array.prototype.filter, isOdd )
)
( [1,1,1,1,1] );   

console.log(result);