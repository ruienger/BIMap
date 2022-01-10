import BIMap from '@ruienger/bimap'
import assert from 'assert'

describe('BIMap entries()', () => {
  it('should return true', () => {
    const res = new BIMap([[undefined, null]])
    const iterator = res.entries()
    iterator.next()
    assert.equal(iterator.next().done, true)
  })
  it('should get undefined', () => {
    const res = new BIMap([[undefined, null]])
    const iterator = res.entries()
    assert.equal((iterator.next() as IteratorResult<[undefined, null]>).value[0], undefined)
  })
  it('should get null', () => {
    const res = new BIMap([[undefined, null]])
    const iterator = res.entries()
    assert.equal((iterator.next() as IteratorResult<[undefined, null]>).value[1], null)
  })
})