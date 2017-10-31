var { partial } = require('./toolset');

function partialRight(fn, ...presetArgs) {
  return partial( reverseArgs(fn), ...presetArgs.reverse());
}

function reverseArgs(fn) {
  return function reverseFn(...args) {
    return fn(...args.reverse());
  }
}

function ajax(url, data) {
  return url + data.id;
}

var reversedAjax = reverseArgs(ajax);
var getUserWithId10 = partial(reversedAjax, { id: 10 });

console.log( getUserWithId10("https://api/users/") );

var getUserWithId190 = partialRight(ajax, { id: 190 })

console.log( getUserWithId190("https://api/users/") );