function bar(x) {
  var y = 5, z;
  foo();
  return z;

  function foo() {
    y++;
    z = x * y;
  }
}

function baz(x, y) {
  y += 1;
  return x * y;
}


// foo(20);
// console.log(z);

// foo(25);
// console.log(z);

console.log(bar(20));
console.log(bar(25));

console.log(bar(20, 5));
console.log(bar(25, 6));