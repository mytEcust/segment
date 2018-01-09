const fs = require('fs');
const path = require('path');

// module.exports = function() {
const msrTraining = fs.readFileSync(
  path.join(__dirname, './training/22.utf8'),
  'utf-8'
);
const chatArr = msrTraining.split('');
const markedArr = [];

// 词头B，词中M，词尾E和单子成词S
let i = 1;
while (i < chatArr.length) {
  if (chatArr[i] === ' ') {
    i++;
    continue;
  }
  markedArr.push(chatArr[i]);
  //最后一个词
  if (i === chatArr.length - 1) {
    if (chatArr[i - 1] === ' ') {
      markedArr.push('S');
    } else {
      markedArr.push('E');
    }
  } else {
    if (chatArr[i - 1] === ' ' && chatArr[i + 1] === ' ') {
      markedArr.push('S');
    } else if (chatArr[i - 1] === ' ' && chatArr[i + 1] !== ' ') {
      markedArr.push('B');
    } else if (chatArr[i - 1] !== ' ' && chatArr[i + 1] !== ' ') {
      markedArr.push('M');
    } else {
      markedArr.push('E');
    }
  }
  i++;
}

console.info(markedArr);
// };
//
