// This is impure.
function foo() {
  y = 2 * Math.pow(x, 2) + 3;
}

var y;
var x;

// How can we fix that?

// What we've done is enclosed the impurity within the scope of FOO.
// The code that calls this function only has to worry about passing
// in a value for x and it can trust it will receive a new value in return.
function FOO(x) {
  var y;
  bar();
  return y;

  function bar() {
    y = 2 * Math.pow(x, 2) + 3;
  }
}

// We don't care anymore about the x and y in the global scope.
console.log(FOO(10));