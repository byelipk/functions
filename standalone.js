var { curry, pipe, reduce, map2, compose, filterIn, filterOut } = require('./toolset');

// Curry the functions which will build the pipeline
var exclude = curry( filterOut );
var include = curry( filterIn );
var map = curry( map2 );
var cook = curry( reduce );

// ************ WORKER FUNCTIONS

function sum(acc, num) {
  return acc + num;
}

function double(num) {
  return num * 2;
}

function isOdd(num) {
  return num % 2 === 1;
}

function isEqualToTwo(num) {
  return num === 2;
}

// ************* THE PIPELINE

var pipeline = compose(
  cook( sum )( 0 ),
  map( double ),
  exclude( isEqualToTwo ),
  include( isOdd )
);

console.log(
  pipeline([1,2,3])
)