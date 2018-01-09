'use strict';

const mark = require('./components/mark.js');
const singleP = require('./components/singleP.js');
const conditionalP = require('./components/conditionalP.js');
const segment = require('./components/segment.js');

function training() {
  mark('pku_training');
  mark('msr_training');
  singleP();
  conditionalP();
  console.info('训练完成');
}

console.info(segment('那个老汉奸杀了我们两个兄弟'));

module.exports = {
  training,
  segment
};
