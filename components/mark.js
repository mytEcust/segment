'use strict';

const fs = require('fs');
const path = require('path');

module.exports = fileName => {
  const trainingStr = fs.readFileSync(
    path.join(__dirname, `../training/${fileName}.utf8`),
    'utf-8'
  );
  const chatArr = trainingStr.split('');
  const markedArr = [];

  // 词头B，词中M，词尾E和单子成词S
  let i = 0;
  while (i < chatArr.length) {
    if (chatArr[i] === '\n') {
      chatArr[i] = ' ';
    }
    if (chatArr[i] === ' ') {
      i++;
      continue;
    }
    markedArr.push(chatArr[i]);
    // 最后一个词
    if (i === chatArr.length - 1) {
      if (chatArr[i - 1] === ' ') {
        markedArr.push('S');
      } else {
        markedArr.push('E');
      }
    } else if (i === 0) {
      // 第一个字
      if (chatArr[1] === ' ') {
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

  const markedStr = markedArr.join('');

  fs.writeFileSync(
    path.join(__dirname, `../marked/${fileName}.utf8`),
    markedStr
  );
};
