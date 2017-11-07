var { curry, compose  } = require('./toolset');

var words = [ "You", "have", "written", "something", "very", "scary", "interesting" ];


// var step0Result =
//   words
//     .filter(isLongEnough)
//     .filter(isShortEnough);

// console.log( step0Result );

// Transducing is about deriving a composition of mappers, filters, and reducers!

function isLongEnough(str) {
  return str.length >= 5;
}

function isShortEnough(str) {
  return str.length <= 10;
}

function strLowercase(str) {
  return str.toLowerCase();
}

function strUppercase(str) {
  return str.toUpperCase();
}

function strConcat(str1, str2) {
  return str1 + str2;
} 


// STEP 1: Expresss MAP/FILTER as REDUCE



// function strUppercaseReducer(list, str) {
//   return [ ...list, strUppercase(str) ];
// }

// function isLongEnoughReducer(list, str) {
//     if (isLongEnough( str )) return [ ...list, str ];
//     return list;
// }

// function isShortEnoughReducer(list, str) {
//     if (isShortEnough( str )) return [ ...list, str ];
//     return list;
// }


// var step1Result =
//   words
//     .reduce( strUppercaseReducer, [] )
//     .reduce( isLongEnoughReducer, [] )
//     .reduce( isShortEnoughReducer, [] )
//     .reduce( strConcat, "" );

// console.log( step1Result );


// STEP 2: Parameterize the reducers
//
// Since both of our filter reducers (isLongEnoughReducer, isShortEnoughReducer) are
// mostly identical, we can create a filterReducer function that accepts a predicate
// functon. We can do the same for MAP as well.

// function mapReducer(mappingFn) {
//   return function reducer(list, val) {
//     return [ ...list, mappingFn(val) ];
//   }
// }

// function filterReducer(predicateFn) {
//   return function reducer(list, val) {
//     if (predicateFn(val)) {
//       return [ ...list, val ];
//     }
//     return list;
//   }
// }

// var strLowercaseReducer = mapReducer( strLowercase );
// var strUppercaseReducer = mapReducer( strUppercase );
// var isLongEnoughReducer = filterReducer( isLongEnough );
// var isShortEnoughReducer = filterReducer( isShortEnough );

// var step2Result =
//   words
//     .reduce( strUppercaseReducer, [] )
//     .reduce( isLongEnoughReducer, [] )
//     .reduce( isShortEnoughReducer, [] )
//     .reduce( strConcat, "" );

// console.log( step2Result );

// STEP 3: Extract common combination logic
//
// Redefine mapReducer and filterReducer to use the listCombination helper.

// function listCombination(list, val) {
//   return [ ...list, val ];
// }

// function mapReducer(mappingFn) {
//   return function reducer(list, val) {
//     return listCombination(list, mappingFn(val) );
//   }
// }

// function filterReducer(predicateFn) {
//   return function reducer(list, val) {
//     if (predicateFn(val)) {
//       return listCombination(list, val);
//     }
//     return list;
//   }
// }

// var step3Result =
//   words
//     .reduce( strUppercaseReducer, [] )
//     .reduce( isLongEnoughReducer, [] )
//     .reduce( isShortEnoughReducer, [] )
//     .reduce( strConcat, "" );

// console.log( step3Result );

// STEP 4: Parameterize the combination
//

// function listCombination(list, val) {
//   return [ ...list, val ];
// }

// function mapReducer(mappingFn, combineFn) {
//   return function reducer(list, val) {
//     return combineFn(list, mappingFn(val) );
//   }
// }

// function filterReducer(predicateFn, combineFn) {
//   return function reducer(list, val) {
//     if (predicateFn(val)) {
//       return combineFn(list, val);
//     }
//     return list;
//   }
// }

// var strUppercaseReducer = mapReducer( strUppercase, listCombination );
// var isLongEnoughReducer = filterReducer( isLongEnough, listCombination );
// var isShortEnoughReducer = filterReducer( isShortEnough, listCombination );

// var step4Result =
//   words
//     .reduce( strUppercaseReducer, [] )
//     .reduce( isLongEnoughReducer, [] )
//     .reduce( isShortEnoughReducer, [] )
//     .reduce( strConcat, "" );

// console.log( step4Result );


// STEP 5: Curry our reducer functions
//
// It's more convenient to have a function that takes only one argument

// function listCombination(list, val) {
//   return [ ...list, val ];
// }

// function mapReducer(mappingFn, combineFn) {
//   return function reducer(list, val) {
//     return combineFn(list, mappingFn(val) );
//   }
// }

// function filterReducer(predicateFn, combineFn) {
//   return function reducer(list, val) {
//     if (predicateFn(val)) {
//       return combineFn(list, val);
//     }
//     return list;
//   }
// }

// var curriedMapReducer = curry( mapReducer );
// var curriedFilterReducer = curry( filterReducer );

// var strUppercaseReducer = curriedMapReducer( strUppercase )( listCombination );
// var isLongEnoughReducer = curriedFilterReducer( isLongEnough )( listCombination );
// var isShortEnoughReducer = curriedFilterReducer( isShortEnough)( listCombination );

// var step5Result =
//   words
//     .reduce( strUppercaseReducer, [] )
//     .reduce( isLongEnoughReducer, [] )
//     .reduce( isShortEnoughReducer, [] )
//     .reduce( strConcat, "" );

// console.log( step5Result );

// STEP 6: Realize that because the curried functions have the same shape, we can think of
// each reducer as a transformation function in it's own right.

// function listCombination(list, val) {
//   return [ ...list, val ];
// }

// function mapReducer(mappingFn, combineFn) {
//   return function reducer(list, val) {
//     return combineFn(list, mappingFn(val) );
//   }
// }

// function filterReducer(predicateFn, combineFn) {
//   return function reducer(list, val) {
//     if (predicateFn(val)) {
//       return combineFn(list, val);
//     }
//     return list;
//   }
// }

// var curriedMapReducer = curry( mapReducer );
// var curriedFilterReducer = curry( filterReducer );

// var strUppercaseReducer = curriedMapReducer( strUppercase );
// var isLongEnoughReducer = curriedFilterReducer( isLongEnough );
// var isShortEnoughReducer = curriedFilterReducer( isShortEnough);

// var upperLongAndShortEnoughReducer = 
//   strUppercaseReducer( 
//     isLongEnoughReducer ( 
//       isShortEnoughReducer( listCombination ) ) );

// var step6Result =
//   words
//     .reduce( upperLongAndShortEnoughReducer, [] )
//     .reduce( strConcat, "" );

// console.log( step6Result );

// STEP 7: We can express that composition declaratively!

// Impure implementation for performance benefits
function listCombination(list, val) {
  list.push(val);
  return list;
}

function mapReducer(mappingFn, combineFn) {
  return function reducer(list, val) {
    return combineFn(list, mappingFn(val) );
  }
}

function filterReducer(predicateFn, combineFn) {
  return function reducer(list, val) {
    if (predicateFn(val)) {
      return combineFn(list, val);
    }
    return list;
  }
}

var curriedMapReducer = curry( mapReducer );
var curriedFilterReducer = curry( filterReducer );

var strUppercaseReducer = curriedMapReducer( strUppercase );
var isLongEnoughReducer = curriedFilterReducer( isLongEnough );
var isShortEnoughReducer = curriedFilterReducer( isShortEnough );

// A composed function expecting a combination function to make a reducer: transducer
// When composing a transducer, you want to list the operations in the desired order of execution.
// This is because the combineFn abstration reverses the effective applied order of operations
// under the hood.
var transducer = compose(
  strUppercaseReducer,
  isLongEnoughReducer,
  isShortEnoughReducer
);

// Providing a combination function to a transducer produces a composed reducer.
var composedReducer = transducer( listCombination );

var step7Result =
  words
    .reduce( composedReducer, [] )
    .reduce( strConcat, "" );

console.log( step7Result );

// BONUS

// Let's look at strConcat and listCombination

// function strConcat(str1, str2) {
//   return str1 + str2;
// } 

// function listCombination(list, val) {
//   list.push(val);
//   return list;
// }

// Aren't these functions essentially doing the same thing? Conceptually, they are
// combining two values into 1.

var micDropReducer = transducer( strConcat );

var step8Result = words.reduce( micDropReducer, "" );

console.log( step8Result );