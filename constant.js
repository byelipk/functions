function constant(v) {
  return function value() {
    return v;
  }
}

var ONE = constant(1);

console.log(ONE());