// ****************************
// MANAGING FUNCTION INPUTS
// ****************************

// Identity function
function identity(v) {
  return v;
}

// Unary function
function unary(fn) {
  return function onlyOneArg(arg) {
    return fn(arg);
  }
}

// Constant function
function constant(v) {
  return function value() {
    return v;
  }
}

// Spread args function
function spreadArgs(fn) {
  return function spreadFn(args) {
    return fn(...args);
  }
} 

// Gather args function
function gatherArgs(fn) {
  return function gatherFn(...args) {
    return fn(args);
  }
}

// Partial function application
function partial(fn, ...presetArgs) {
  return function partialFn(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  }
}

// Returns function which accepts arguments in reverse order from the original
function reverseArgs(fn) {
  return function reverseFn(...args) {
    return fn(...args.reverse());
  }
}

// Reverses and partially applies function
// function partialRight(fn, ...presetArgs) {
//   return partial( reverseArgs(fn), ...presetArgs.reverse() );
// }

// More performant
function partialRight(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
      return fn( ...laterArgs, ...presetArgs );
  };
}

// Currying unwinds a higher-arity function into a series of unary functions
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
  })([]);
}

// Partial application without an ordering dependency
function partialProps(fn, presetArgsObj) {
  return function partiallyApplied(laterArgsObj) {
      return fn( Object.assign( {}, presetArgsObj, laterArgsObj ) );
  };
}

// Currying without an ordering dependency
function curryProps(fn, arity=1) {
  return (function nextCurried(prevArgsObj){
      return function curried(nextArgObj = {}){
          var [key] = Object.keys( nextArgObj );
          var allArgsObj = Object.assign( {}, prevArgsObj, { [key]: nextArgObj[key] } );

          if (Object.keys( allArgsObj ).length >= arity) {
              return fn( allArgsObj );
          }
          else {
              return nextCurried( allArgsObj );
          }
      };
  })( {} );
}

// Negate predicate functions
function not(predicate) {
  return function negated(...args) {
    return !predicate(...args);
  }
}

function when(predicate, fn) {
  return function conditional(...args) {
    if (predicate(...args)) {
      return fn(...args);
    }
  }
}

function guard(fn) {
  return function guarded(arg) {
    if (arg != null) {
      return fn(arg)
    }

    return arg;
  }
}

function uncurry(fn) {
  return function uncurried(...args){
      var ret = fn;

      for (let arg of args) {
        ret = ret( arg );
      }

      return ret;
  };
}

// ****************************
// COMPOSING FUNCTIONS
// ****************************

function unboundMethod(name, arity=2) {
  return curry(function curried(...args) {
    var obj = args.pop();
    return obj[name]( ...args );
  }, arity);
}

function compose(...fns) {
  return function composed(result) {
    var list = fns.slice();

    while ( list.length > 0 ) {
      result = list.pop()(result);
    }

    return result;
  }
}

function compose2(...fns) {
  return function composed(accumulator) {
    return fns.reduceRight(function reducer(result, fn) {
      return fn( result );
    }, accumulator);
  }
}

function pipe(...fns) {
  return function piped(result){
      var list = fns.slice();

      while (list.length > 0) {
          // take the first function from the list
          // and execute it
          result = list.shift()( result );
      }

      return result;
  };
}

function take(count, list) {
  var result = [];

  if (count < 0) count = 0;
  if (count > list.length) count = list.length;

  for (let i = 0; i < count; i += 1) {
    if (list[i]) {
      result.push(list[i]);
    }
  }

  return result;
}

function map(list, fn) {
  var result = [];

  list.forEach(function mapper(item) {
    result.push(fn(item));
  });

  return result;
}

// Easier to compose with currying when the parameter list goes (fn, list)
function map2(fn, list) {
  var result = [];

  for (let [index, value] of list.entries()) {
    result.push( fn(value, index, list) );
  }

  return result;
}

function filter(list, testFn) {
  var result = [];

  list.forEach(function each(item) {
    if (testFn(item)) {
      result.push(item);
    }
  });

  return result;
} 

function filterIn(predicateFn, list) {
  var result = [];

  for (let [index, value] of list.entries()) {
    if (predicateFn(value, index, list)) {
      result.push(value);
    }
  }

  return result;
}

function filterOut(predicateFn, list) {
  return filterIn( not(predicateFn), list );
}

function reduce(reducerFn, initialValue, list) {
  var startIndex, result;

  if (arguments.length === 3) {
    result = initialValue;
    startIndex = 0;
  }
  else if (list.length > 0) {
    result = list[0];
    startIndex = 1;
  }
  else {
    throw new Error("Must provide initial value to reduce.");
  }

  for (let index = startIndex; index < list.length; index += 1) {
    result = reducerFn( result, list[index], index, list );
  }

  return result;
}

function unique(list) {
  return filterOut( duplicates, list );
}

function flatten(list) {
  return list.reduce(function flattenFn(acc, item) {
    if (Array.isArray(item) === false) {
      acc.push(item);
    }
    else {
      for (let [index, val] of item.entries()) {
        acc.push(val);
      }
    }

    return acc;
  }, []);
}

function flatMap(mapperFn, list) {
  return flatten( map2( mapperFn, list ) );
}

function flatMap2(mapperFn, list) {
  return reduce(function reducer(acc, val) {
    return acc.concat( mapperFn( val ) )
  }, [], list);
}

function zip(list1, list2) {
  var zipped = [];
  
  list1 = list1.slice();
  list2 = list2.slice();

  while (list1.length && list2.length) {
    zipped.push( [list1.shift(), list2.shift()] );
  }

  return zipped;
}

function mergeLists(list1, list2) {
  var merged = [];

  list1 = list1.slice();
  list2 = list2.slice();

  while ( list1.length || list2.length ) {
    if (list1.length) {
      merged.push( list1.shift() )
    }

    if (list2.length) {
      merged.push( list2.shift() )
    }
  }

  return merged;
}

function getProp(name, obj) {
  return obj[name];
}

function setProp(obj, name, val) {
  var o = Object.assign({}, obj);
  o[name] = val;
  return o;
}

function duplicates(value, index, list) {
  return list.indexOf(value) !== index;
}



module.exports = {
  compose,
  compose2,
  pipe,
  partial,
  partialRight,
  partialProps,
  curry,
  uncurry,
  spreadArgs,
  gatherArgs,
  reverseArgs,
  when,
  not,
  curryProps,
  take,
  map,
  map2,
  filter,
  filterIn,
  filterOut,
  reduce,
  flatMap,
  flatMap2,
  zip,
  mergeLists,
  identity,
  unary,
  constant,
  getProp,
  setProp,
  unique,
  flatten,
  unboundMethod,
  guard
}
