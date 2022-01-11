import BIMap from '@ruienger/bimap'
import assert from 'assert'

const testSymbol = Symbol('test')
const testObject = {}
const testFunction = () => 'fun'

describe('BIMap get', () => {
  it('BIMap should support undefined, number, string, object, symbol, function, null, NaN as element', () => {
    const res = new BIMap([
      [undefined, null],
      [NaN, testSymbol],
      [testFunction, 'fun'],
      [1, testObject]
    ])
    assert.equal(res.get(undefined), null)
    assert.equal(res.get(null), undefined)
    assert.equal(res.get(NaN), testSymbol)
    assert.equal(res.get(testSymbol), NaN)
    // assert.equal(Number.isNaN(res.get(testSymbol)), true)
    assert.equal(res.get(testFunction), 'fun')
    assert.equal(res.get('fun'), testFunction)
    assert.equal(res.get(1), testObject)
    assert.equal(res.get(testObject), 1)
  })
})