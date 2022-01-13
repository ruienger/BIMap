import BIMap from '../../src/index'
import assert from 'assert'

const testSymbol = Symbol('test')

describe('BIMap forceSet', () => {
  it('Forcelly set no matter if the passed params is repeated in BIMap, should be settled', () => {
    const res = new BIMap([[undefined, null], [NaN, testSymbol]])
    res.forceSet(testSymbol, 'testSymbol')
    res.forceSet(NaN, 2)
    assert.equal(res.get(testSymbol), 'testSymbol')
    assert.equal(res.get(NaN), 2)
    res.forceSet(undefined, testSymbol)
    assert.equal(res.has(null), false)
    assert.equal(res.has('testObject'), false)
    assert.equal(res.get(undefined), testSymbol)
  })
})