// Given the same input, will this function always return the same output?
// It depends on bar. If bar is a pure function then foo is a pure function.
// No such thing as 100% pure in javascript because it allows mutable values.
// I have a high degree of confidence that given the same input, foo will always
// return the same output.
function foo(bar) {
  return function(x) {
    return bar(x);
  }
}

const result = foo(function(x) {
  return x * 2;
})(6);

console.log(result);