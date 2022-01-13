import BIMap from '../../src/index'
import assert from 'assert'

describe('BIMap entries', () => {
  it('Genetation should be successfully done', () => {
    const res = new BIMap([[undefined, null]])
    const iterator = res.entries()
    iterator.next()
    assert.equal(iterator.next().done, true)
  })
  it('Generation shoudld return the current [key, vlaue]', () => {
    const res = new BIMap([[undefined, null]])
    const iterator = res.entries()
    const { value = [] } = iterator.next()
    assert.equal(value[0], undefined)
    assert.equal(value[1], undefined)
  })
  it('FOr a empty BIMap, generation should done in the every first time', () => {
    const res = new BIMap()
    const iterator = res.entries()
    assert.equal(iterator.next().done, true)
  })
})