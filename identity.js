function identity(v) {
  return v;
}

var words = "  john is     home".split(/\s|\b/);

console.log(words);
console.log(words.filter(identity));

