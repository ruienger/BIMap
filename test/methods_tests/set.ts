import BIMap from '@ruienger/bimap'
import assert from 'assert'

const testObject = {}
const testSymbol = Symbol('test')

describe('BIMap set', () => {
  it('When no params in set is repeated in BIMap, should be settled', () => {
    const res = new BIMap([[undefined, null], [NaN, testSymbol]])
    res.set(testObject, 'testObject')
    assert.equal(res.get(testObject), 'testObject')
  })
  it('When some of passed params are repeated in BIMap, should just return undefined', () => {
    const res = new BIMap([[undefined, null], [NaN, testSymbol]])
    res.set(NaN, NaN)
    assert.equal(res.get(NaN), testSymbol)
    res.set(NaN, 2)
    assert.equal(res.get(NaN), testSymbol)
  })
})