// So currying unwinds a single higher-arity function into a 
// series of chained unary functions.

function curry(fn, arity=fn.length) {
  return (function next(prevArgs) {
    return function curried(nextArg) {
      var args = [...prevArgs, nextArg];

      if (args.length >= arity) {
        return fn(...args);
      }
      else {
        return next(args);
      }
    }
  })( [] );
}

function addThree(a, b, c) {
  return a + b + c;
}

var curriedAdd = curry(addThree);

var plusOne = curriedAdd(1);
var plusTwo = plusOne(2);
var plusThree = plusTwo(3);

// console.log(plusThree);

function add(x, y) {
  return x + y;
}


// console.log( [1,2,3].map( curry( add )(3) ) );


var data = [ 1,2,3,4,5,6,7,8,9,10 ];

function onlyGreaterThan(list, number) {
  return list.filter(item => item > number);
};

function onlyLessThan(list, number) {
  return list.filter(item => item < number);
};

function onlyEven(list) {
  return list.filter(item => item % 2 === 0);
};


// console.log( onlyEven( onlyLessThan( onlyGreaterThan(data, 0), 11) ) );

console.log( 
  curry(onlyGreaterThan)(data)(4)
)