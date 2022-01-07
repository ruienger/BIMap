import assert from 'assert'
import BIMap from '@ruienger/bimap'

/** ************************************************
 * 
 *    BIMap 测试
 *    BIMap 需要测试的参数类型包括
 *    undefined null number string
 *    NaN Symbol Object Array Function
 * 
 * *************************************************
 */

const bimap = new BIMap()
const getBimap = () => new BIMap()

const CLEAR = 'clear'

describe('BIMap', () => {
  describe(CLEAR, () => {
    it('清空BIMap', () => {
      bimap.set(1, 2)
      bimap.clear()
      assert.deepEqual(getBimap(), bimap)
    })
  })
  // describe('constructor', () => {
  //   it('传参不合规定时新建空BIMap', () => {
  //     assert.deepEqual()
  //   })
  // })
})