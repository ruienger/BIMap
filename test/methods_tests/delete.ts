import BIMap from '@ruienger/bimap'
import assert from 'assert'

describe('BIMap delete', () => {
  it('Deleting an existed key should be successful', () => {
    const res = new BIMap([[undefined, null]])
    assert.equal(res.delete(undefined), true)
  })
  it('Deleting an existed value should be successful', () => {
    const res = new BIMap([[undefined, null]])
    assert.equal(res.delete(null), true)
  })
  it('Deleting an none-existed key/value should be failed', () => {
    const res = new BIMap([[undefined, null]])
    assert.equal(res.delete(false), false)
  })
})