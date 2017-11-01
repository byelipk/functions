// ****************************
// MANAGING FUNCTION INPUTS
// ****************************

// Identity function
function identity(v) {
  return v;
}

// Unary function
function unary(fn) {
  function onlyOneArg(arg) {
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

function compose(...fns) {
  return function composed(result) {
    var list = fns.slice();

    while ( list.length > 0 ) {
      result = list.pop()(result);
    }

    return result;
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

function filter(list, testFn) {
  var result = [];

  list.forEach(function each(item) {
    if (testFn(item)) {
      result.push(item);
    }
  });

  return result;
} 

function reduce(list, reducerFn, defaultValue) {
  var result = defaultValue;

  list.forEach(function each(item, index) {
    result = reducerFn(result, item, index, list);
  });

  return result;
}

function getProp(name, obj) {
  return obj[name];
}

function setProp(obj, name, val) {
  var o = Object.assign({}, obj);
  o[name] = val;
  return o;
}



module.exports = {
  compose,
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
  filter,
  identity,
  unary,
  constant,
  getProp,
  setProp
}