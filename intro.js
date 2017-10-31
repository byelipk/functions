// What is abstraction?
//
// Abstraction is about taking domain concepts that are tightly wound
// together, teasing them apart, and putting between them a symantic 
// boundary so that we can work on either side of that boundary without
// having to worry about what's happening on the other side. Abstraction is
// not encapsulation. It's about being able to independently reason about
// each piece of the system.


// What is a functon? What is a procedure?

// A procedure is an arbitrary collection of functionality. It may
// accept inputs, it may not. It may or may not have a return value.
// A function definetly has inputs and always has a return value.

function foo(x, y, z, w) {
  console.log(x, y, z, w); // This does not return an output. NOT A FUNCTION.
}

function bar(x = 2, ...args) {
// NOT A FUNCTION because it calls the procedure foo() 
// and we already know foo is not a function, but a procedure.
  return foo(x, 42, ...args); 
}

bar();

bar(3, 8, 11);
bar(...[6, 5]);

function foo2(x, y) {
  // THIS IS A FUNCTION! 
  // It accepts input, performs operations on that input, and returns a value.
  return [x + 1, y - 1]; 
}

var [a,b] = foo2(...[10,9]);

a;
b;

function foo3() {
  // THIS IS NOT A FUNCTION.
  // It does not accept input and does not return output.
  // Moreover, this procedure has side effects. y and x are
  // in the global scope. 
  //
  // It's impossible to predict what this line of code is doing
  // without knowing what x and y are.
  y = 2 * Math.pow(x, 2) + 3;
}

var y;
var x;

x = 0;

foo3();

y;

// AVOID SIDE EFFECTS WHERE POSSIBLE!

