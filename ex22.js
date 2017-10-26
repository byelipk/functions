function add1(v) { return v + 1; }
function mul2(v) { return v * 2; }
function div3(v) { return v / 3; }
function sum(x, y) { return x + y; }
function isOdd(x) { return x % 2 === 1; }

var list = [2,5,8,11,14,17,20];

// Pay attention to the arity of the reducer functions that mapReducer and
// filterReducer return. We can use those functions with [].reduce()
// function mapReducer(mappingFn) {
//   return function reducer(list, v) {
//     return listCombination(list, mappingFn(v));
//   };
// }

// function filterReducer(predicateFn) {
//   return function reducer(list, v) {
//     if (predicateFn(v)) {
//       return listCombination(list, v);
//     }
//     return list;
//   }
// }

// Curried mapReducer and filterReducer
var mapReducer = curry(function mapReducer(mappingFn, combineFn) {
  return function reducer(list, v) {
    return combineFn(list, mappingFn(v));
  }
});

var filterReducer = curry(function filterReducer(predicateFn, combineFn) {
  return function reducer(list, v) {
    if (predicateFn(v)) {
      return combineFn(list, v);
    }
    return list;
  }
});

// Common list behavior. The shape of listCombination is the same as the shape
// of the reducers inside mapReducer and filterReducer.
function listCombination(list, v) {
  list.push(v);
  return list;
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

function compose(...fns) {
  return pipe(...fns.reverse());
}

function pipe(...fns) {
  return function piped(result) {
    fns.forEach(function loop(fn) {
      result = fn(result);
    });
    return result;
  }
}

// Using curry allows us to parameterize the kind of list combinations we
// want to apply to our data.
// var result = list
//   .reduce(mapReducer(add1)(listCombination), [])
//   .reduce(filterReducer(isOdd)(listCombination), [])
//   .reduce(sum, 0)

// Things just got real. The transducer is waiting for a combiner function.
var transducer = compose( mapReducer(add1), filterReducer(isOdd) );

// var result = list
// .reduce(transducer(listCombination), [])
// .reduce(sum)

// Wow.
var result = list.reduce( transducer(sum), 0 );


console.log(result);