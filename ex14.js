var luckyLotteryNumbers = [];

for (let i = 0; i < 6; i++) {
  luckyLotteryNumbers = pickNumbers(luckyLotteryNumbers);  
}

console.log(luckyLotteryNumbers);

////////////////////////

function pickNumbers(list) {
  var set = new Set();

  list.forEach(function (n) { set.add(n) });

  set.add(lotteryNum());

  return Array.from(set).sort(sortAscending); 
}

function sortAscending(a, b) {
  return a >= b;
}

function lotteryNum() {
  return (Math.round(Math.random() * 100) % 58) + 1;
}