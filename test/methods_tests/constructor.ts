import BIMap from '../../src/index'
import assert from 'assert'

describe('BIMap constructor', () => {
  it('Repeated parmas not allowed', () => {
    const res = new BIMap([[1, 2], [2, 3]])
    assert.equal(res.get(2), 1)
  })
  it('BIMap treated NaN as a constant', () => {
    const res = new BIMap([[NaN, NaN]])
    assert.equal(res.size, 0)
  })
})