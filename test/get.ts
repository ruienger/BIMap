import BIMap from '@ruienger/bimap'
import assert from 'assert'

const testSymbol = Symbol('test')

describe('BIMap get()', () => {
  it('should return true', () => {
    const res = new BIMap([[undefined, null], [NaN, testSymbol]])
    assert.deepEqual(res.get(undefined) === null, true)
    assert.deepEqual(res.get(null) === undefined, true)
    assert.deepEqual(res.get(NaN) === testSymbol, true)
    assert.deepEqual(Number.isNaN(res.get(testSymbol)), true)
  })
  it('should return false', () => {
    const res = new BIMap([[undefined, null], [NaN, testSymbol]])
    assert.deepEqual(res.get(NaN) === undefined, false)
    assert.deepEqual(res.get(testSymbol) === Symbol('test'), false)
  })
})