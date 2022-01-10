import BIMap from '@ruienger/bimap'
import assert from 'assert'

const testObject = {}
const testSymbol = Symbol('test')

describe('BIMap set()', () => {
  it('should return false', () => {
    const res = new BIMap([[undefined, null], [NaN, testSymbol]])
    res.set(undefined, 2)
    res.set(NaN, 2)
    res.set(testObject, 'testObject')
    assert.equal(res.get(undefined) === null, true)
    assert.equal(res.get(NaN) === testSymbol, true)
    assert.equal(res.get(testObject) === 'testObject', true)
  })
  it('should return false', () => {
    const res = new BIMap([[undefined, null], [NaN, testSymbol]])
    res.set(NaN, NaN)
    assert.equal(res.get(NaN) === testSymbol, true)
    res.set(NaN, 2)
    assert.equal(res.get(NaN) === 2, false)
  })
})