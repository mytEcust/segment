'use strict';

function checkLogicalCombination(i, j) {
  // if ((i == 'B' || i == 'M') && (j == 'M' || j == 'E')) return true;
  // if ((i == 'E' || i == 'S') && (j == 'B' || j == 'S')) return true;
  // else return false;
  // EM,SM,EE,SE,BB,MB,MM,MS
  if (i === 'E' && (j === 'M' || j === 'E')) return false;
  if (i === 'S' && (j === 'M' || j === 'E')) return false;
  if (i === 'M' && (j !== 'E')) return false;
  if (i === 'B' && (j === 'B' || j === 'S')) return false;
  return true;
}

function getTag(value) {
  switch (value) {
    case 0:
      return 'B';
    case 1:
      return 'M';
    case 2:
      return 'E';
    case 3:
      return 'S';
    default:
      return false;
  }
}

function getInt(tag) {
  switch (tag) {
    case 'B':
      return 0;
    case 'M':
      return 1;
    case 'E':
      return 2;
    case 'S':
      return 3;
    default:
      return 3;
  }
}

module.exports = {
  checkLogicalCombination,
  getTag,
  getInt,
};
