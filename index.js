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

training();
console.info(segment('挑水回来的和尚和尚未挑水回来的和尚'));

module.exports = {
  training,
  segment,
};
