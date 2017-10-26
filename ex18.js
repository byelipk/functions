"use strict";
// Recursion is when a function calls itself until it reaches a base
// condition, then it stops calling itself.
function sumIter(...nums) {
  var sum = 0;
  for (let i = 0; i < nums.length; i += 1) {
    sum = sum + nums[i];
  }
  return sum;
}



function sumIter2(sum, ...nums) {
  for (let i = 0; i < nums.length; i += 1) {
    sum = sum + nums[i];
  }
  return sum; 
}

// A recursive solution could model the list getting shorter
function sumRecr(...nums) {
  function recurse(sum, list) {
    if (list.length === 0) { return sum }; // the base case
    return recurse(sum + list[0], list.slice(1, list.length));
  }

  return recurse(0, nums);
}

// No inner function needed
function sumRecr2(sum, ...nums) {
  if (nums.length === 0) return sum;
  return sum + sumRecr2(...nums);
}

// Peeking ahead at the tail
function sumRecr3(sum, num=0, ...nums) {
  if (nums.length === 0) return sum + num;
  return sum + sumRecr3(num, ...nums);
}

console.log( sumIter(1,2,3,4,5) );
console.log( sumIter2(1,2,3,4,5) );
console.log( sumRecr(1,2,3,4,5) );
console.log( sumRecr2(1) );
console.log( sumRecr2(1,2,3,4,5) );
console.log( sumRecr3(1,2,3,4,5) );

function mult(...nums) {
  var product = 0;
  for (let i = 0; i < nums.length; i += 1) {
    product = product * nums[i];
  }
  return product;
}

function multRecr(product, num, ...nums) {
  if (num === undefined) return product;
  if (nums.length === 0) return product * num;
  return product * multRecr(num, ...nums);
}

function multTC(product, num, ...nums) {
  if (num === undefined) return product;
  return multTC(product * num, ...nums);
}
console.log( multRecr(1, 2, 4) )
console.log( multTC(1, 2, 4) )