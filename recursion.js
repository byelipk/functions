// Recursion is when a function calls iteself until a base condition is met and the call loop unwinds.

function trampoline(fn) {
  return function trampolined(...args) {
      var result = fn( ...args );

      while (typeof result == "function") {
          result = result();
      }

      return result;
  };
}

function sum(num1, num2, ...nums) {
  num1 = num1 + num2;
  if (nums.length === 0) return num1;
  return function sumN() { return sum(num1, ...nums); }
}

var trampolineSum = trampoline(sum);

var xs = [];
for (let i=0; i<20000; i++) {
    xs.push( i );
}

console.log( trampolineSum( ...xs ) );

