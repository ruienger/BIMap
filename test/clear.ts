import BIMap from '@ruienger/bimap'
import assert from 'assert'

describe('BIMap clear()', () => {
  it('should clear BIMap', () => {
    const res = new BIMap([[1, 2]])
    res.clear()
    assert.deepEqual(res.size, 0)
  })
})