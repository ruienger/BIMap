import { BIMapElement } from './types';
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
    [Symbol.toStringTag]: string;
    /** 迭代器 */
    [Symbol.iterator]: () => Generator<BIMapElement[], void, unknown>;
    /**
     * the size of this bimap
     *
     * 键值对组数
     */
    size: number;
    /**
     * 存储键值对的二维数组
     */
    private mapStore;
    constructor(storeValue?: Array<[BIMapElement, BIMapElement]>);
    /**
     * Clear all keys and values
     *
     * 将所有键值对清空
     */
    clear(): void;
    /**
     * delete the pair of k/v that contains the params, return if deleted
     *
     * 删除参数对应的键值对,不论参数是键还是值
     * @param keyOrVal
     * @returns is successfully deleted
     */
    delete(keyOrVal: BIMapElement): boolean;
    /**
     * return the iterator of bimap, yiled [key, value]
     *
     * 迭代器入口
     * @returns Genetator
     */
    entries(): Generator<BIMapElement[], void, unknown>;
    a(): Generator<number[], void, unknown>;
    /**
     * forEach for BIMap
     *
     * 适用于 BIMap 的 forEach
     * @param callback (key, value, currentBIMap) => BIMapElement
     * @param thisArg
     */
    forEach(callback: (key: BIMapElement, val: BIMapElement, bimap: BIMap) => void, thisArg?: BIMapElement): void;
    /**
     * find a value that match width param keyOrValue then return it,if not,return undefined
     *
     * 藉由 键获取值 或者 值获取键
     * @param keyOrVal
     * @returns ValOrKey
     */
    get(keyOrVal: BIMapElement): void | BIMapElement;
    /**
     * check if the keyOrValue exists
     *
     * 检查是否存在 参数 对应的键值对
     * @param keyOrVal
     * @returns if the keyOrValue exists
     */
    has(keyOrVal: BIMapElement): boolean;
    /**
     * set a new pair of key, value. if key/value has exist already or params duplicated, warn it
     * return the { key, val } if successfully settled, undefined otherwise
     *
     * 设置一对键值对,如果 键 或 值 已经存在则提示使用update;
     * 参数相同不做修改
     * 如果设置成功返回 { key, val },否则 undefined
     * @param key
     * @param val
     * @returns \{ key, val } or undefined
     */
    set(key: BIMapElement, val: BIMapElement): {
        key: BIMapElement;
        val: BIMapElement;
    } | void;
    /**
     * set a new pair of key, value. if key/value has exist already, delete the old pairs and set the new one
     * if params duplicated, warn it
     * return the { key, val } if successfully settled, undefined otherwise
     *
     * 设置一对键值对,如果 键 或 值 已经存在则覆盖;
     * 参数相同不做修改
     * 如果设置成功返回 { key, val },否则 undefined
     * @param key
     * @param val
     * @returns \{ key, val } or undefined
     */
    forceSet(key: BIMapElement, val: BIMapElement): {
        key: BIMapElement;
        val: BIMapElement;
    } | void;
    /**
     * update a new pair of key, value.
     * if key/value has exist already, delete the origin pairs and merge them into a new one
     * but if neither the key nor the value are not found in BIMap,we recommend using set()
     *
     * 根据参数中 键 值 更新 BIMap,
     * 若参数中的键值已存在则以新内容为准,
     * 如果设置成功返回 { key, val },否则 undefined
     * @param key
     * @param val
     * @returns \{ key, val } or undefined
     */
    update(key: BIMapElement, val: BIMapElement): {
        key: BIMapElement;
        val: BIMapElement;
    } | void;
    /**
     * return every value of bimap
     *
     * 返回BIMap中的所有键组成的数组
     * @returns Array of values
     */
    keys(): Array<BIMapElement>;
    /**
     * return every key of bimap
     *
     * 返回BIMap中的所有值组成的数组
     * @returns Array of keys
     */
    values(): Array<BIMapElement>;
    /**
     * 根据参数寻找对应键值对,不论参数是键还是值
     * @param keyOrVal
     * @returns {unFind | Tracer} Symbol 或 Tracer
     */
    private find;
}
