// Data Structures

function transform(list, fn) {
  var result = [];

  list.forEach(item => result.push(fn(item)));

  return result;
}

function exclude(list, test) {
  var result = [];

  list.forEach(item => {
    if (!test(item)) {
      result.push(item);
    }
  });

  return result;
}

function include(list, test) {
  var result = [];

  list.forEach(item => {
    if (test(item)) {
      result.push(item);
    }
  });

  return result;
}

function combine(list, fn, initial) {
  var result = initial;
  list.forEach(item => {
    result = fn(result, item);
  });
  return result;
}

function isOdd(v) { return v % 2 === 1; }

function double(v) { return v * 2; }

function mult(x, y) { return x * y; }

function objectify(obj, num) { 
  if (obj.hasOwnProperty("hello")) {
    obj.hello.push(num);
  }
  else {
    obj.hello = [ num ];
  }

  return obj;
}

function concat(str, curr) {
  if (str === "world") return str;
  else return curr;
}

console.log( transform([1,2,3,4,5], double) );
console.log( exclude([1,2,3,4,5], isOdd) );
console.log( include([1,2,3,4,5], isOdd) );
console.log( combine([1,2,3,4,5], mult, 0) );
console.log( combine([1,2,3,4,5], objectify, {}) );
console.log( combine(["hello", "world", "how", "are", "you"], concat, "") );

// What's an example of composing functions together?

function compose(...fns) {
  return pipe(...fns.reverse());
}

function pipe(...fns) {
  return function piped(...args) {
    var result;
    fns.forEach(function loop(fn) {
      result = fn(...args);
    });
    return result;
  }
}

function toUpper(initial, word) {
  return initial + word.toUpperCase();
}

function takeFirstChar(initial, word) {
  return initial + word.charAt(0);
}

function acronym(str, word) {
  return str + word.charAt(0).toUpperCase();
}

var pipeline = pipe( toUpper, takeFirstChar );
var pipeline2 = pipe( acronym );

console.log( combine( ["Functional", "Light", "Javascript", "Programming"], pipeline, "") );
console.log( combine( ["Functional", "Light", "Javascript", "Programming"], pipeline2, "") );
