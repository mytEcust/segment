'use strict';

const fs = require('fs');
const path = require('path');
const util = require('../util/util.js');

const checkLogicalCombination = util.checkLogicalCombination;
const getTag = util.getTag;
const getInt = util.getInt;

const defaultP = 0;
const defaultConP = 0.000001;

module.exports = function(str) {
  let singleP = fs.readFileSync(
    path.join(__dirname, `../probability/singleP.json`),
    'utf-8'
  );
  let conP = fs.readFileSync(
    path.join(__dirname, `../probability/conditionalP.json`),
    'utf-8'
  );

  singleP = JSON.parse(singleP);
  conP = JSON.parse(conP);

  class GNode {
    constructor(MaxPos = defaultP, CurTag, PreTag) {
      //最高概率
      this.MaxPos = MaxPos;
      //当前标签
      this.CurTag = CurTag;
      //前一个字的标签
      this.PreTag = PreTag;
    }
  }

  //遍历独立概率
  const strArr = str.split('');
  const strNode = [];
  let graph = [];

  for (let i = 0; i < strArr.length; i++) {
    graph.push([]);
    for (let j = 0; j < 4; j++) {
      graph[i].push(new GNode());
    }
  }

  // 初始化状态矩阵
  for (let j = 0; j < 4; j++) {
    graph[0][j].CurTag = getTag(j);
    if (j === 0 || j === 3) {
      try {
        graph[0][j].MaxPos = singleP[strArr[0]][graph[0][j].CurTag] || defaultP;
      } catch (e) {
        graph[0][j].MaxPos = defaultP;
      }
    } else {
      graph[0][j].MaxPos = defaultP;
    }
  }

  // 动态规划过程
  for (let i = 1; i < strArr.length; i++) {
    for (let j = 0; j < 4; j++) {
      graph[i][j].CurTag = getTag(j);

      let sec_key_sb = {
        chat: strArr[i],
        tag: graph[i][j].CurTag
      };
      for (let n = 0; n < 4; n++) {
        if (
          !checkLogicalCombination(graph[i - 1][n].CurTag, graph[i][j].CurTag)
        ) {
          continue;
        }
        let pri_key_sb = {
          chat: strArr[i - 1],
          tag: graph[i - 1][n].CurTag
        };

        let _pos;
        try {
          _pos =
            conP[pri_key_sb.chat][pri_key_sb.tag][sec_key_sb.chat][
              sec_key_sb.tag
            ] || defaultConP;
        } catch (e) {
          _pos = defaultConP;
        }

        _pos *= graph[i - 1][n].MaxPos;
        

        if (_pos >= graph[i][j].MaxPos) {

          graph[i][j].MaxPos = _pos;
          graph[i][j].PreTag = graph[i - 1][n].CurTag;
        }
      }
    }
  }

  // 筛选最优解
  let m = 0;
  let _maxpos = 0;
  const resultlist = [];

  for (let j = 0; j < 4; j++) {
    const tag = graph[strArr.length - 1][j].CurTag;
    if (tag === 'B' || tag === 'M') {
      continue;
    }
    if (graph[strArr.length - 1][j].MaxPos >= _maxpos) {
      _maxpos = graph[strArr.length - 1][j].MaxPos;
      m = j;
    }
  }

  let chararr = [];
  chararr.length = strArr.length * 2;
  for (
    let i = strArr.length - 1, j = chararr.length - 1;
    i >= 0 && j > 0;
    i--, j -= 2
  ) {
      chararr[j] = graph[i][m].CurTag;
      chararr[j - 1] = strArr[i];
      m = getInt(graph[i][m].PreTag);

  }

  let phrase='';

  for (let i = 0; i < chararr.length; i += 2) {
    if (chararr[i + 1] === 'E' || chararr[i + 1] === 'S') {
      phrase+=chararr[i];
      resultlist.push(phrase);
      phrase='';
    }else {
      phrase+=chararr[i];
    }
  }

  return resultlist;
};
