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
module.exports.partial = function partial(fn, ...presetArgs) {
  return function partialFn(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  }
}

// Returns function which accepts arguments in reverse order from the original
module.exports.reverseArgs = function reverseArgs(fn) {
  return function reverseFn(...args) {
    return fn(...args.reverse());
  }
}

// Reverses and partially applies function
module.exports.partialRight = function partialRight(fn, ...presetArgs) {
  return partial( reverseArgs(fn), ...presetArgs.reverse() );
}

// More performant
module.exports.partialRight2 = function partialRight(fn,...presetArgs) {
  return function partiallyApplied(...laterArgs) {
      return fn( ...laterArgs, ...presetArgs );
  };
}