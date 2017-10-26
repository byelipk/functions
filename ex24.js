var nums = {
  first: [3,5,2,4,9,1,12,3],
  second: [5,7,7,9,10,4,2],
  third: [1,1,3,2]
};

// var filteredNums = filterObj(function(list) {
//   return isOdd(listSum(list));
// }, nums);

// var filteredNumsProducts = mapObj(function(list) {
//   return listProduct(list);
// }, filteredNums);

// var result = reduceObj(function(acc, v) {
//   return acc + v;
// }, 0, filteredNumsProducts);


// 38886

// How would we model a flow of data? A Pipe?

var transducer = pipe( 
  curry(filterObj)(compose(isOdd, listSum)), 
  curry(mapObj)(listProduct), 
  curry(reduceObj)(sum)(0)
);

var result = transducer(nums)

console.log(result);

// ************************************

function mapObj(mapperFn, o) {
  var obj = {};
  var keys = Object.keys(o);
  for (let key of keys) {
    obj[key] = mapperFn(o[key]);
  }
  return obj;
}

function filterObj(predicateFn, o) {
  var obj = {};
  var keys = Object.keys(o);
  for (let key of keys) {
    if (predicateFn(o[key])) {
      obj[key] = o[key];
    }
  }
  return obj;
}

function reduceObj(reducerFn, initialValue, o) {
  var result = initialValue;
  var keys = Object.keys(o);
  for (key of keys) {
    result = reducerFn(result, o[key]);
  }
  return result;
}

// ************************************

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

function binary(fn) {
  return function two(arg1, arg2) {
    return fn(arg1, arg2);
  } 
}

// ************************************

function mult(x, y) { return x * y; }
function sum(x, y) { return x + y; }
function isOdd(x) { return x % 2 === 1; }
function listSum(list) { return list.reduce(sum, 0); }
function listProduct(list) { return list.reduce(mult, 0); }
