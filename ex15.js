// What is closure?
//
// Closure is the ability of a function to remember lexical state even when
// it's executed in another context.
//
//
// Closure is when a function remembers the variables around it even when
// it's executed elsewhere.
//
// If you reference a variable from inside a function that was declared outside
// the scope of the function, the function will have access to that variable
// for the lifetime of the function.
//
// This is really helpful in functional programming because as we pass functions around
// as values, they will remember variables that were declared elsewhere in the code.

// Where's the closure?
// The inner function closes over the `fn` argument.
// The inner function `one` reliably behaves as a pure function because
// it's impossible for `fn` to get redefined.
function unary(fn) {
  return function one(arg) {
    return fn(arg);
  }
}

// The inner function `comp` reliably behaves as a pure function because
// it's impossible for `fn1` and `fn2` to get redefined.
function composeRight(fn1, fn2) {
  return function comp(...args) {
    return fn2( fn1(...args) );
  }
}

// Is `foo` a pure function?
// I have a high degree of confidence `foo` is a pure function because
// given the same input we get the same output.
// Is `bar` a pure function?
// I have a high degree of confidence `bar` is a pure function
// because `arg1` and `arg2` are never reassigned.
function foo(arg1, arg2) {
  return function bar() {
    return arg1 + arg2; // lazy computation
  }
}

function foo2(x, y) {
  var sum = x + y; // eagar computation
  return function bar() {
    return sum;
  }
}

// Lazy + memoization
// Is this still pure?
// Observationally this is still a pure function, but with a caveat: we
// might consider doing the extra work to compute `sum` a side effect. If
// we consider that a side effect, then this isn't a pure function.
//
function foo2(x, y) {
  var sum;
  return function bar() {
    if (sum === undefined) {
      sum = x + y;
    }
    return sum;
  }
}

// Does this function we're dealing, `x`, with maintain referential transparency?
var x = foo2(2,4);

x(); // 6
x(); // 6