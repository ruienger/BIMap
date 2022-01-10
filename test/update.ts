import BIMap from '@ruienger/bimap'
import assert from 'assert'

const testSymbol = Symbol('test')
const testObject = {}

describe('BIMap update()', () => {
  it('should return true', () => {
    const res = new BIMap([[undefined, null], [NaN, testSymbol]])
    res.update(undefined, 2)
    res.update(NaN, 3)
    assert.equal(res.get(undefined) === 2, true)
    assert.equal(res.get(NaN) === 3, true)
  })
  it('should return false', () => {
    const res = new BIMap([[undefined, null], [NaN, testSymbol]])
    res.update(testObject, 'testObject')
    assert.equal(res.get(testObject) === 'testObject', false)
  })
})