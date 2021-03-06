import { BIMapElement } from './types'

/**
 * 键值对描述类
 */
export default class Tracer {
  key: BIMapElement

  val: BIMapElement

  res: BIMapElement

  tar: BIMapElement

  index: number

  /**
   *
   * @param key 键值对的键
   * @param val 键值对的值
   * @param res 键值对的搜索结果
   * @param tar 键值对的搜索源
   * @param index 键值对的索引
   */
  constructor(key: BIMapElement, val: BIMapElement, res: BIMapElement, tar: BIMapElement, index: number) {
    this.key = key
    this.val = val
    this.res = res
    this.tar = tar
    this.index = index
  }

  /**
   * 将 Tracer 表示搜索结果，搜索源的内容交换
   * @returns Tracer
   */
  exchangeStruct(): Tracer {
    const { res } = this
    this.res = this.tar
    this.tar = res

    return this
  }
}
