var { partialRight, not } = require("./toolset");

function compose(...fns) {
  return function composed(result) {
    var list = fns.slice();

    while (list.length > 0) {
      result = list.pop()(result);
    }

    return result;
  }
}

function onlyGreaterThanZero(numbers) {
  return numbers.filter(n => n > 0);
}

function onlyLessThanTen(numbers) {
  return numbers.filter(n => n < 10);
}

function onlyEvens(numbers) {
  return numbers.filter(n => n % 2 === 0);
}

function onlyOdds(numbers) {
  return numbers.filter(n => n % 2 === 1);
}

function doubled(numbers) {
  return numbers.map(n => n * 2);
}

function firstTwo(numbers) {
  return numbers.reduce(function reducer(result, number) {
    if (result.length < 2) {
      result.push(number);
    }
    return result;
  }, []);
}

function toString(numbers) {
  return numbers.map(n => n.toString());
}

// The functions get applied right to left and they all have the same arity.
// var theBestNumbersOf = compose(
//   toString,
//   firstTwo,
//   doubled, 
//   onlyEvens, 
//   onlyLessThanTen, 
//   onlyGreaterThanZero
// );

// console.log( theBestNumbersOf( [1,2,3,4,5,6,7,8,9,10] ) );


var filterNumbers = partialRight( compose, onlyGreaterThanZero, onlyLessThanTen );

var theEvens = filterNumbers( onlyEvens );
var theOdds = filterNumbers( onlyOdds );

console.log( theEvens( [1,2,3,4,5,6,7,8,9,10] ) );
console.log( theOdds( [1,2,3,4,5,6,7,8,9,10] ) );