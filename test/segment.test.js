'use strict';

const assert = require('assert');
const segment = require('../index.js').segment;

describe('segment', function() {
  it('should segment correctly', function() {
    assert.equal(segment('挑水回来的和尚和尚未挑水回来的和尚').toString(), '挑水,回来,的,和尚,和,尚未,挑水,回来,的,和尚');
  });
});
