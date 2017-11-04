var { mergeLists, zip, flatMap2, flatMap, flatten, unique, identity, curry, pipe, reduce, not, map2, unary, compose, filterIn, filterOut } = require('./toolset');

// ************ BASIC ************

function double(number) {
  return number * 2;
}

var result = map2(double, [1,2,3]);

console.log(result);

// ************ UNARY ************

// Sometimes we only want the mapper function to take one arg
var result2 = map2( unary(parseInt), ["1", "2", "3"]);

console.log( result2 );

// Sometimes we want to transform a list of functions to a list of their return values!

var fnOne = () => 1
var fnTwo = () => 2
var fnThree = () => 3

console.log( map2((v) => (v()), [fnOne, fnTwo, fnThree] ));

// Sometimes we want to compose functions together and run transformations over the list of composed functions

var plusOne = (v) => v + 1
var plusTwo = (v) => v + 2
var plusThree = (v) => v + 3

var result3 = 
  [plusOne, plusTwo, plusThree]
    .map( fn => compose(fn, double) )
    .map( fn => fn(0) )

console.log( result3 );

// ************ FILTERING ************

var isOdd = v => v % 2 === 1;
var isEven = not( isOdd );

console.log( filterIn( isOdd, [1,2,3] ) );
console.log( filterOut( isOdd, [1,2,3] ) );
console.log( filterIn( isEven, [1,2,3] ) );
console.log( filterOut( isEven, [1,2,3] ) );

// ************ REDUCING ************

function getMax(prev, curr) {
  return Math.max(prev, curr);
}

function getProduct(product, number) {
  return product * number;
}

console.log( reduce(getMax, -Infinity, [ 1,2,3 ]) );
console.log( reduce(getProduct, 1, [ 1,2,3 ]) );

var timesN = curry(getProduct);
var timesOne = timesN(1);

console.log(
  map2( timesOne, [3, 17, 6, 4] )
);

var arrayOfFns = map2( n => timesN(n), [3, 17, 6, 4] );
var pipeReducer = ( composedFn, fn ) => pipe(composedFn, fn);

console.log( reduce(pipeReducer, identity, arrayOfFns)(1) );

var pipeline = pipe( reduce(pipeReducer, identity, arrayOfFns) );

console.log(pipeline(1));

console.log(unique([1,1,2,3]));

console.log( flatten([1, 2, 3, [4, 5, 6]]) );

// *********** FLAT MAPPING ****************

var firstNames = [
  { name: "Jonathan", variations: [ "John", "Jon", "Jonny" ] },
  { name: "Stephanie", variations: [ "Steph", "Stephy" ] },
  { name: "Frederick", variations: [ "Fred", "Freddy" ] }
];

// console.log(
//   flatten( map2( entry => [ entry.name, ...entry.variations ], firstNames ) )
// )

// console.log( 
//   flatMap( entry => [ entry.name, ...entry.variations ], firstNames )
// )

console.log( 
  flatMap2( entry => [ entry.name, ...entry.variations ], firstNames )
)

console.log(
  zip([1,2,3], [4,5,6])
)

console.log(
  mergeLists([1,2,3], [4,5,6,7])
)