// If programming-style idempotence is about defining a value change operation 
// so that it can only affect state once, immutability is about reducing the
// number of change occurrences from one to zero.

// Value immutability means that when we need to change the state in our program, 
// we must create and track a new value rather than mutate an existing value.

// Here we're in control of how and when our program transitions to a new state:

function addValue(array) {
  return [ ...array, 4 ];
}

function updateLastLogin(user={}) {
  var newUser = Object.assign({}, user);
  newUser.lastLogin = Date.now();
  return newUser;
}

function blackBox(array) {
  array[0] = 'h';
}

console.log( addValue([1,2,3]) );

console.log( updateLastLogin() );

// What if I don't know if a function will mutate my data? Just give it a copy!
var data = [1,2,3];
blackBox(data.slice());
console.log(data);