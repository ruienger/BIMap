import BIMap from '@ruienger/bimap'
import assert from 'assert'

describe('BIMap delete()', () => {
  it('should return true', () => {
    const res = new BIMap([[undefined, null]])
    assert.equal(res.delete(undefined), true)
  })
  it('should return true', () => {
    const res = new BIMap([[undefined, null]])
    assert.equal(res.delete(null), true)
  })
  it('should return false', () => {
    const res = new BIMap([[undefined, null]])
    assert.equal(res.delete(false), false)
  })
})