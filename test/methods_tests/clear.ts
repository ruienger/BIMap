import BIMap from '@ruienger/bimap'
import assert from 'assert'

describe('BIMap clear', () => {
  it('None empty bimap should clear itself', () => {
    const res = new BIMap([[1, 2]])
    res.clear()
    assert.equal(res.size, 0)
  })
  it('Empty bimap should be empty', () => {
    const res = new BIMap()
    res.clear()
    assert.equal(res.size, 0)
  })
})