// Partial application is the idea that we can reduce a function's arity.
// The partial function takes a function and any arguments we are partially
// applying, and returns a function that takes the remaining arguments to 
// be passed to the function. The function partiallyApplied closes over the fn
// and presetArgs so it can access them later no matter where the function
// is called.
function partial(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  }
}

function ajax(url, data) {
  return url + data.id;
}

var getCurrentUser = partial(ajax, "https://api/users/");
var getUserWithId10 = partial(ajax, "https://api/users/", { id: 10 });

console.log( getCurrentUser({ id: 1 }) );
console.log( getCurrentUser({ id: 2 }) );
console.log( getUserWithId10() );


function add(x, y) {
  return x + y;
}

var addOne = partial(add, 1);

// We can't directly pass add into the call to map because
// add doesn't match the arity of the function map expects.
// If we partially apply add, then it works.
console.log( [1,2,3,4,5].map(addOne) );