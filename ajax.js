var { partial, partialRight, compose, pipe } = require("./toolset");

function ajax( url, data, cb ) {
  if (url.match(/orders/)) {
    return cb({id: -1, userId: 100});
  }

  return cb({name: "John"});
}

function output(data) {
  console.log(data);
}

function notify(name) {
  console.log(`Notifying: ${name}`);
}

// Imperative style. 
// ajax("api", {id: 1}, function cb(str) {
//   console.log(str);
// });

// Declarative with points

// var getPerson = partial( ajax, "https://api/v1/users" );
// var getLastOrder = partial( ajax, "https://api/v1/orders/", { id: -1 } );

// getLastOrder(function getOrder(order) {
//   getPerson( {id: order.id}, function getPerson(person) {
//     output(person.name);
//   });
// });

// Declarative no points

var getPerson = partial( ajax, "https://api/v1/users" );
var getLastOrder = partial( ajax, "https://api/v1/orders/", { id: -1 } );

function getProp(name, obj) {
  return obj[name];
}

function setProp(name, obj, val) {
  var o = Object.assign({}, obj);
  o[name] = val;
  return o;
}

// We can write this function in a generalized way by partially applying it.
function extractName(person) {
  return person.name;
}

var takeName = partial( getProp, "name" );      // a function that expects an object with a name property as the only argument
var takeUserId = partial( getProp, "userId" );  // a function that expects an object with the userId property as the only argument

var notifyUser = compose( notify, takeName );   // a function that expects an object with a name property as the only argument

var processUser = partialRight( getPerson, notifyUser ); // a function that expects an object with a userId property as the only argument
var processOrder = compose( processUser, takeUserId );  // a function that expects an object with a userId property as the only argument

getLastOrder( processOrder ); // a function that expects a function as the only argument

