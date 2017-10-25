function sum(x, y) {
  return x + y;
}

function mult(x, y) {
  return x * y;
}

function pipe2(fn1, fn2) {
  return function piped(arg1, arg2, arg3) {
    return fn2(
      fn1(arg1, arg2),
      arg3
    );
  };
}

var multAndSum = pipe2(mult, sum);

console.log( multAndSum(1, 2, 3) );