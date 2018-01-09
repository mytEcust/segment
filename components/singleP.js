'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function() {
  let chatArr = [];
  const markPath = path.normalize(path.join(__dirname, '/..')) + '/marked';

  fs.readdirSync(markPath).forEach(file => {
    const filePath = markPath + '/' + file;
    const str = fs.readFileSync(filePath, 'utf-8');
    chatArr = chatArr.concat(str.split(''));
  });

  const singlePObj = {};

  let i = 0;
  let total = 0;

  while (i < chatArr.length) {
    total++;
    const chat = chatArr[i];
    const tag = chatArr[i + 1];

    //字符已存在
    if (singlePObj[chat]) {
      //tag已存在
      if (singlePObj[chat][tag]) {
        singlePObj[chat][tag]++;
      } else {
        singlePObj[chat][tag] = 1;
      }
    } else {
      // 初始化
      singlePObj[chat] = {};
      singlePObj[chat][tag] = 1;
    }
    i = i + 2;
  }

  for (let chat in singlePObj) {
    for (let tag in singlePObj[chat]) {
      singlePObj[chat][tag] = singlePObj[chat][tag] / total;
    }
  }

  const singlePStr = JSON.stringify(singlePObj);
  fs.writeFileSync(
    path.join(__dirname, '../probability/singleP.json'),
    singlePStr
  );
};
