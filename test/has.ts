import BIMap from '@ruienger/bimap'
import assert from 'assert'

const testSymbol = Symbol('test')

describe('BIMap has()', () => {
  it('should return true', () => {
    const res = new BIMap([[undefined, null], [NaN, testSymbol]])
    assert.equal(res.has(undefined), true)
    assert.equal(res.has(null), true)
    assert.equal(res.has(NaN), true)
    assert.equal(res.has(testSymbol), true)
  })
  it('should return false', () => {
    const res = new BIMap([[undefined, null], [NaN, testSymbol]])
    assert.equal(res.has(Symbol('test')), false)
  })
})