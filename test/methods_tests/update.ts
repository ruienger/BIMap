import BIMap from '@ruienger/bimap'
import assert from 'assert'

const testSymbol = Symbol('test')
const testObject = {}

describe('BIMap update', () => {
  it('In normal cases, should be updated', () => {
    const res = new BIMap([[undefined, null], [NaN, testSymbol]])
    res.update(undefined, 2)
    res.update(NaN, 3)
    assert.equal(res.get(undefined), 2)
    assert.equal(res.get(NaN), 3)
  })
  it('If the passed parmas dont exist in current BIMap, should not update it', () => {
    const res = new BIMap([[undefined, null], [NaN, testSymbol]])
    assert.equal(res.update(testObject, 'testObject'), undefined)
  })
})