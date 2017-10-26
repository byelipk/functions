// Currying is similar to partial application in that each successive curried 
// call partially applies another argument to the original function, until all 
// arguments have been passed.

function partial(fn, ...firstArgs) {
  return function applied(...lastArgs) {
    return fn(...firstArgs, ...lastArgs);
  }
}

function curry(fn,arity = fn.length) {
	return (function nextCurried(prevArgs){
		return function curried(nextArg){
			var args = [ ...prevArgs, nextArg ];

			if (args.length >= arity) {
				return fn( ...args );
			}
			else {
				return nextCurried( args );
			}
		};
	})( [] );
}

function sum(a, b, c) {
  return a + b + c;
}

// Currying

// Currying is a special form of partial application where the arity is reduced to 1, 
// with a chain of successive chained function calls, each which takes one argument. 
// Once all arguments have been specified by these function calls, the original 
// function is executed with all the collected arguments. You can also undo a currying.

var sumOne = curry(sum);
var sumTwo = sumOne(1);
var sumThree = sumTwo(2);

console.log( sumThree(3) )
console.log( curry(sum)(1)(5)(5) )

// Partial application

// Partial Application is a technique for reducing the arity -- expected number of 
// arguments to a function -- by creating a new function where some of the arguments 
// are preset.

var partialOne = partial(sum, 1, 2);
var partialThree = partialOne(3);

console.log( partialThree )

// Why would you choose curry over partial?
//
// Currying would be helpful in situations where you know the function
// you want to invoke but the arguments you want to pass to the function
// are not known yet.

// Why would you choose currying/partial application over invoking functions traditionally?
//
// Both currying and partial application allow you to separate in time
// and space when and where each argument to the function is specified.

// It's easier to compose functions together when we can separate out
// when functions receive each of their arguments.

// Most importantly, currying and partial application allow us to specialize
// generalized functions. This kind of abstraction improves readability and
// maintainability of code.

// What is abstraction?

// Abstraction is about inserting a semantic boundary between two sets of details
// in order to make it easier to reason about each part of a system independently.
