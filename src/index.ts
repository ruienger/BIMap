import { BIMapElement } from './types'
import Tracer from './tracer'

/**
 * 代表 未找到对应键值对 的 Symbol
 */
const unFind = Symbol('unFind') // 代表不存在该键值对

/**
 * 判断参数是否为 NaN
 * @param value
 * @returns 是否是 NaN
 */
function isNotANum(value: BIMapElement): boolean {
  return typeof value === 'number' && Number.isNaN(value)
}

/**
 * 向控制台输出信息, webpack 生产模式则跳过
 * @param msg
 */
function log(msg: string): void {
  if (process?.env?.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`%cBIMap: %c${msg}`, 'color: red; background: yellow; font-weight: bold', 'color: blue')
  }
}

/**
 * allows you get value via the key or get key via the value
 *
 * 一种双向映射,即可由键获取值,亦可值获取键
 * @property size --BIMap大小
 * @yields [key, value]
 * @method clear
 * @method delete
 * @method entries
 * @method forEach
 * @method get
 * @method has
 * @method set
 * @method update
 * @method keys
 * @method values
 */
export default class BIMap {
  /** 确保 typeof 返回的是 BIMap */
  public [Symbol.toStringTag] = 'BIMap'

  /** 迭代器 */
  public [Symbol.iterator] = this.entries

  /**
   * the size of this bimap
   *
   * 键值对组数
   */
  public size = 0

  /**
   * 存储键值对的二维数组
   */
  private mapStore: Array<{ key: BIMapElement, val: BIMapElement }> = []

  constructor(storeValue: Array<[BIMapElement, BIMapElement]> = []) {
    storeValue.forEach((map) => {
      this.set(map[0], map[1])
    })
  }

  /**
   * Clear all keys and values
   *
   * 将所有键值对清空
   */
  public clear(): void {
    this.mapStore = []
    this.size = 0
  }

  /**
   * delete the pair of k/v that contains the params, return if deleted
   *
   * 删除参数对应的键值对,不论参数是键还是值
   * @param keyOrVal
   * @returns is successfully deleted
   */
  public delete(keyOrVal: BIMapElement): boolean {
    const res = this.find(keyOrVal)
    if (res === unFind) {
      return false
    }
    this.mapStore.splice((res as Tracer).index, 1)
    this.size--
    return true
  }

  /**
   * return the iterator of bimap, yiled [key, value]
   *
   * 迭代器入口
   * @returns Genetator
   */
  public *entries() {
    for (let index = 0, { size } = this; index < size; index++) {
      yield [this.mapStore[index].key, this.mapStore[index].val]
    }
  }

  public *a() {
    yield [1, 2, 3]
  }
  /**
   * forEach for BIMap
   *
   * 适用于 BIMap 的 forEach
   * @param callback (key, value, currentBIMap) => BIMapElement
   * @param thisArg
   */
  public forEach(callback: (key: BIMapElement, val: BIMapElement, bimap: BIMap) => void, thisArg: BIMapElement = this): void {
    for (const [key, val] of this.entries()) {
      callback.call(thisArg, key, val, this)
    }
  }

  /**
   * find a value that match width param keyOrValue then return it,if not,return undefined
   *
   * 藉由 键获取值 或者 值获取键
   * @param keyOrVal
   * @returns ValOrKey
   */
  public get(keyOrVal: BIMapElement): void | BIMapElement {
    const res = this.find(keyOrVal)
    if (res === unFind) {
      return undefined
    }
    return (res as Tracer).res
  }

  /**
   * check if the keyOrValue exists
   *
   * 检查是否存在 参数 对应的键值对
   * @param keyOrVal
   * @returns if the keyOrValue exists
   */
  public has(keyOrVal: BIMapElement): boolean {
    if (this.find(keyOrVal) !== unFind) return true
    return false
  }

  /**
   * set a new pair of key, value. if key/value has exist already or params duplicated, warn it
   * return the { key, val } if successfully settled, undefined otherwise
   *
   * 设置一对键值对,如果 键 或 值 已经存在则不做修改;
   * 参数相同不做修改
   * 如果设置成功返回 { key, val },否则 undefined
   * @param key
   * @param val
   * @returns \{ key, val } or undefined
   */
  public set(key: BIMapElement, val: BIMapElement): { key: BIMapElement, val: BIMapElement } | void {
    if (this.has(key) || this.has(val)) {
      log(`Duplicate key/value has found. ${String(this.has(key) ? key : val)} has existed`)
      return undefined
    } if (key === val || (isNotANum(key) && isNotANum(val))) {
      log(`Same params ${String(key)} & ${String(val)} not allowed`)
      return undefined
    }
    const item = {
      key,
      val,
    }
    this.mapStore.push(item)
    this.size++
    return item
  }

  /**
   * update a new pair of key, value.
   * if key/value has exist already, delete the origin pairs and merge them into a new one
   * but if neither the key nor the value are not found in BIMap,we recommend using set()
   *
   * 根据参数中 键 值 更新 BIMap,
   * 若参数中的键值已存在则以新内容为准,
   * 若键值都没有在 BIMap 中找到则新增
   * @param key
   * @param val
   * @returns if successfully updated
   */
  public update(key: BIMapElement, val: BIMapElement): { key: BIMapElement, val: BIMapElement } | void {
    if (!this.has(key) && !this.has(val)) {
      log('Neither key nor value are found in BIMap. use method set instead')
      return undefined
    } if (key === val || (isNotANum(key) && isNotANum(val))) {
      log(`Same params ${String(key)} & ${String(val)} not allowed`)
      return undefined
    }
    this.delete(key)
    this.delete(val)
    return this.set(key, val)
  }

  /**
   * return every value of bimap
   *
   * 返回BIMap中的所有键组成的数组
   * @returns Array of values
   */
  public keys(): Array<BIMapElement> {
    return this.mapStore.map((e) => e.key)
  }

  /**
   * return every key of bimap
   *
   * 返回BIMap中的所有值组成的数组
   * @returns Array of keys
   */
  public values(): Array<BIMapElement> {
    return this.mapStore.map((e) => e.val)
  }

  /**
   * 根据参数寻找对应键值对,不论参数是键还是值
   * @param keyOrVal
   * @returns {unFind | Tracer} Symbol 或 Tracer
   */
  private find(keyOrVal: BIMapElement): symbol | Tracer {
    const isNAN: boolean = isNotANum(keyOrVal)
    let i = 0
    for (const [key, val] of this) {
      const tracer = new Tracer(key, val, val, key, i)
      if (isNAN) {
        if (isNotANum(key)) {
          return tracer
        } if (isNotANum(val)) {
          return tracer.exchangeStruct()
        }
      } else if (key === keyOrVal) {
        return tracer
      } else if (val === keyOrVal) {
        return tracer.exchangeStruct()
      }
      i++
    }

    return unFind
  }
}
