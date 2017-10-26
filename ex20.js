function a() { return 1; }
function b() { return 2; }
function c(z) {
  return function() {
    return z;
  }
}

function add(x, y) {
  return x + y;  
}

function add2(fn1, fn2) {
  return add( fn1(), fn2() );
}

function addnIter(...fns) {
  var sum = 0;
  fns.forEach(fn => {
    sum = sum + fn(); 
  });
  return sum;
}

function addnRecr(fn1, fn2, ...fns) {
  var sum = add2(fn1, fn2);
  if (fns.length === 0) return sum;
  return addnRecr(c(sum), ...fns);
}

function addn(fn1, fn2, ...fns) {
  return [ fn1, fn2, ...fns ]
    .map(fn => fn())
    .reduce(function reducer(sum, num) {
      return sum + num;
    }, 0);
}

function onlyUniq(value, index, list) {
  return list.indexOf(value) === index;
}

function onlyEven(value) {
  return value % 2 === 0;
}

function addnUniq(fn1, fn2, ...fns) {
  return [ fn1, fn2, ...fns ]
    .map(fn => fn())
    .filter(onlyUniq)
    .reduce(function reducer(sum, num) {
      return sum + num;
    }, 0);
}

function addnEven(fn1, fn2, ...fns) {
  return [ fn1, fn2, ...fns ]
    .map(fn => fn())
    .filter(onlyEven)
    .reduce(function reducer(sum, num) {
      return sum + num;
    }, 0);
}

function addnFuncs(...nums) {
  return addnIter( ...nums.map(num => c(num)) );
}

console.log( addnIter(c(1), c(2), c(3), c(4), c(5), c(6), c(5), c(1)) );
console.log( addnRecr(c(1), c(2), c(3), c(4), c(5), c(6), c(5), c(1)) );
console.log( addn(c(1), c(2), c(3), c(4), c(5), c(6), c(5), c(1)) );
console.log( addnUniq(c(1), c(2), c(3), c(4), c(5), c(6), c(5), c(1)) );
console.log( addnEven(c(1), c(2), c(3), c(4), c(5), c(6), c(5), c(1)) );
console.log( addnFuncs(1,2,3,4,5) );

