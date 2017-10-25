// Given the same input, will this function always return the same output?
// It depends on what obj is. If it's the same object structure, then I have a
// high degree of confidence.
// If we only look at line 6 to determine if we can trust the code, that will
// bite us in the future. There is no yes or no answer to the question of 
// "is this function pure". The only correct answer is the degree to which we
// are confident we will always get the same output for a given input. 
function getId(obj) {
  return obj.id;
}

// Now my confidence is shattered! 👹
getId({
  id: Math.random()
});