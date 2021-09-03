import { Tracer } from './modules/tracer'

/**
 * 代表 未找到对应键值对 的 Symbol
 */
const unFind: symbol = Symbol('unFind') // 代表不存在该键值对

/**
 * 判断参数是否为 NaN
 * @param value 
 * @returns 是否是 NaN
 */
function isNotANum(value: any): boolean {
  return typeof value === 'number' ? isNaN(value) ? true : false : false;
}

/**
 * 一种双向映射,即可由键获取值,亦可值获取键
 * @property size --BIMap大小
 * @property mode --开发模式
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
export class BIMap {
  /**
   * 键值对组数
   */
  public size: number = 0;

  /**
   * 存储键值对的二维数组
   */
  private mapStore: Array<{ key: any, val: any }> = [];

  /**
   * 模式
   */
  public mode: 'development' | 'production' = 'production';

  [Symbol.iterator] = BIMap.prototype.entries;

  constructor(storeValue: Array<[any, any]> = []) {
    storeValue.forEach(map => {
      this.set(map[0], map[1])
    })
  }

  /**
   * 将所有键值对清空
   */
  public clear(): void {
    this.mapStore = []
    this.size = 0
  }

  /**
   * 删除参数对应的键值对,不论参数是键还是值
   * @param keyOrVal 
   * @returns 是否成功删除
   */
  public delete(keyOrVal: any): boolean {
    const res = this.find(keyOrVal)
    if (res === unFind) {
      return false
    }
    this.mapStore.splice((res as Tracer).index, 1)
    this.size--
    return true
  }

  /**
   * 迭代器入口
   * @returns 迭代器
   */
  public * entries(): Generator<[any, any]> {
    for (let index: number = 0, size = this.size; index < size; index++) {
      yield [this.mapStore[index].key, this.mapStore[index].val]
    }
  }

  /**
   * 适用于 BIMap 的 forEach
   * @param callback 回调函数,接受的参数分别为 键,值,当前 BIMap
   * @param thisArg 
   */
  public forEach(callback: Function, thisArg: any = this): void {
    for (let [key, val] of this) {
      callback.call(thisArg, key, val, this)
    }
  }

  /**
   * 藉由 键获取值 或者 值获取键
   * @param keyOrVal 
   * @returns 搜索结果
   */
  public get(keyOrVal: any): void | any {
    const res = this.find(keyOrVal)
    if (res === unFind) {
      return
    }
    return (res as Tracer).res
  }

  /**
   * 检查是否存在 参数 对应的键值对
   * @param keyOrVal 
   * @returns 键值对是否存在
   */
  public has(keyOrVal: any): boolean {
    if (this.find(keyOrVal) !== unFind)
      return true
    return false
  }

  /**
   * 设置一对键值对,如果 键 或 值 已经存在则不做修改; 
   * 参数相同不做修改
   * @param key 
   * @param val 
   */
  public set(key: any, val: any): void {
    if (this.has(key) || this.has(val)) {
      this.log(`Duplicate key/value has found. ${this.has(key) ? key : val} has existed`)
      return
    } else if (key === val || (isNotANum(key) && isNotANum(val))) {
      this.log(`Same params ${key} & ${val} not allowed`)
      return
    }
    this.mapStore.push({
      key,
      val
    })
    this.size++
  }

  /**
   * 根据参数中 键 值 更新 BIMap, 
   * 若参数中的键值已存在则以新内容为准, 
   * 若键值都没有在 BIMap 中找到则新增
   * @param key 
   * @param val 
   */
  public update(key: any, val: any): void {
    if (!this.has(key) && !this.has(val)) {
      this.log(`Neither key nor value are found in BIMap. use method set instead`)
      return
    } else if (key === val || (isNotANum(key) && isNotANum(val))) {
      this.log(`Same params ${key} & ${val} not allowed`)
      return
    }
    this.delete(key)
    this.delete(val)
    this.set(key, val)
  }

  /**
   * 返回BIMap中的所有键组成的数组
   * @returns 键组成的数组
   */
  public keys(): Array<any> {
    return this.mapStore.map(e => e.key)
  }

  /**
   * 返回BIMap中的所有值组成的数组
   * @returns 值组成的数组
   */
  public values(): Array<any> {
    return this.mapStore.map(e => e.val)
  }

  /**
   * 根据参数寻找对应键值对,不论参数是键还是值
   * @param keyOrVal 
   * @returns {unFind | Tracer} Symbol 或 Tracer
   */
  private find(keyOrVal: any): symbol | Tracer {
    let isNAN: boolean = isNotANum(keyOrVal),
      i: number = 0
    for (let [key, val] of this) {
      const tracer = new Tracer(key, val, val, key, i)
      if (isNAN) {
        if (isNotANum(key)) {
          return tracer
        } else if (isNotANum(val)) {
          return tracer.exchangeStruct()
        }
      } else if (key === keyOrVal) {
        return tracer
      } else if (val === keyOrVal) {
        return tracer.exchangeStruct()
      }
      i++;
    }

    return unFind
  }

  /**
   * 向控制台输出信息, 生产模式则跳过
   * @param msg
   */
  private log(msg: string): void {
    if (this.mode === 'development') {
      console.log('%cBIMap: %c' + msg, 'color: red; background: yellow; font-weight: bold', 'color: blue')
    }
  }

}