var { partialRight, partial, curry, not, when, reverseArgs } = require('./toolset');

var alphaRegEx = new RegExp(/^[\w]+$/);
var wordRegEx = new RegExp(/\s|\b/);

function onlyAlpha(word) { return alphaRegEx.test(word); }

function words(string) {
  return String(string)
    .toLowerCase()
    .split(wordRegEx)
    .filter(onlyAlpha);
}

function unique(list) {
  var result = new Set();

  list.forEach(function each(item) {
    result.add(item);
  });

  return Array.from(result);
}

var testString = "What a nice nice nice day day for today nice    ";

// We can compose these two functions together because `words` returns
// an array and `unique` takes an array as it's only argument.
// console.log( unique( words( testString ) ) );

function compose2(fn2, fn1) {
  return function composed(...args) {
    return fn2( fn1( ...args ) );
  } 
}

var uniqueWords = compose2( unique, words );

// console.log( uniqueWords( testString ) );

function compose(...fns) {
  return function composed(result) {
    var list = fns.slice();

    while (list.length > 0) {
      result = list.pop()(result);
    }

    return result;
  }
}

function take(list, count) {
  if (count > list.length) {
    count = list.length;
  }

  if (count < 0) {
    count = 0;
  }

  var result = [];

  for (let i = 0; i < count; i += 1) {
    result.push(list[i]);
  }

  return result;
}

// This predicate function operates at the level of abstraction
// of the list.
function thereIsWorkToDo(list) {
  return list.length > 0;
}

function thereIsNoWorkToDo(list) {
  return list.length === 0;
}

function takeShortWords(list) {
  var result = [];

  list.forEach(function each(item) {
    if (item.length < 4) {
      result.push(item);
    }
  });

  return result;
}

function takeLongWords(list) {
  var result = [];

  list.forEach(function each(item) {
    if (item.length > 3) {
      result.push(item);
    }
  });

  return result;
}

function findNiceWord(list) {
  var result = [];

  list.forEach(function each(item) {
    if (item === "nice") {
      result.push(item);
    }
  });

  return result;
}

function sayItThreeTimes(list) {
  return [ list[0], list[0], list[0] ];
}

function turnItIntoASentence(list) {
  return list.join(" ");
}

// We can compose functions together as long as the output of one function
// can be passed as the input to the next function in the chain. This composition
// shifts the readers focus towards a more declarative style of coding - we
// focus on WHAT to do not HOW to do it.
var pipeline = compose( 
  turnItIntoASentence,
  sayItThreeTimes,
  findNiceWord,
  when( 
    not( thereIsNoWorkToDo ), 
    partialRight( take, 4 ) 
  ), 
  unique, 
  words 
);

console.log( pipeline( testString ) );

// var filterWords = partialRight(compose, unique, words);

// console.log(filterWords(takeShortWords)(testString))
// console.log(filterWords(takeLongWords)(testString))

var pipe = reverseArgs( compose );

var filterWords = partial( pipe, words, unique );

console.log(filterWords(takeShortWords)(testString))