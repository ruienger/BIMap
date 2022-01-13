import BIMap from '../../src/index'
import assert from 'assert'

const testSymbol = Symbol('test')

describe('BIMap has', () => {
  it('BIMap retruns if the element is existed', () => {
    const res = new BIMap([[undefined, null], [NaN, testSymbol]])
    assert.equal(res.has(undefined), true)
    assert.equal(res.has(null), true)
    assert.equal(res.has(NaN), true)
    assert.equal(res.has(testSymbol), true)
    assert.equal(res.has(Symbol('test')), false)
  })
})