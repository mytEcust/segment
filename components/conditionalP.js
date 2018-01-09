'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function(fileName) {
  let chatArr = [];
  const markPath = path.normalize(path.join(__dirname, '/..')) + '/marked';

  fs.readdirSync(markPath).forEach(file => {
    const filePath = markPath + '/' + file;
    const str = fs.readFileSync(filePath, 'utf-8');
    chatArr = chatArr.concat(str.split(''));
  });

  let singleP = fs.readFileSync(
    path.join(__dirname, `../single-probability/singleP.json`),
    'utf-8'
  );

  singleP = JSON.parse(singleP);

  const cpObj = {};

  let i = 0;
  let total = 0;

  //减3是为了最后一个字符后面还有字符 产B油E
  while (i < chatArr.length - 3) {
    total++;
    const chat = chatArr[i];
    const tag = chatArr[i + 1];
    const nextChat = chatArr[i + 2];
    const nextTag = chatArr[i + 3];

    //首字符已存在
    if (cpObj[chat]) {
      //首tag已存在
      if (cpObj[chat][tag]) {
        //后chat已存在
        if (cpObj[chat][tag][nextChat]) {
          //后tag已存在
          if (cpObj[chat][tag][nextChat][nextTag]) {
            cpObj[chat][tag][nextChat][nextTag]++;
          } else {
            cpObj[chat][tag][nextChat][nextTag] = 1;
          }
        } else {
          cpObj[chat][tag][nextChat] = {};
          cpObj[chat][tag][nextChat][nextTag] = 1;
        }
      } else {
        cpObj[chat][tag] = {};
        cpObj[chat][tag][nextChat] = {};
        cpObj[chat][tag][nextChat][nextTag] = 1;
      }
    } else {
      // 初始化
      cpObj[chat] = {};
      cpObj[chat][tag] = {};
      cpObj[chat][tag][nextChat] = {};
      cpObj[chat][tag][nextChat][nextTag] = 1;
    }
    i = i + 2;
  }

  for (let chat in cpObj) {
    for (let tag in cpObj[chat]) {
      for (let nextChat in cpObj[chat][tag]) {
        for (let nextTag in cpObj[chat][tag][nextChat]) {
          cpObj[chat][tag][nextChat][nextTag] =
            cpObj[chat][tag][nextChat][nextTag] / total;
          cpObj[chat][tag][nextChat][nextTag] =
            cpObj[chat][tag][nextChat][nextTag] / singleP[nextChat][nextTag];
        }
      }
    }
  }

  const cpStr = JSON.stringify(cpObj);
  fs.writeFileSync(
    path.join(__dirname, `../probability/conditionalP.json`),
    cpStr
  );
};
