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
export default class BIMap {
    /**
     * 键值对组数
     */
    size: number;
    /**
     * 存储键值对的二维数组
     */
    private mapStore;
    /**
     * 模式
     */
    mode: 'development' | 'production';
    [Symbol.iterator]: () => Generator<[any, any]>;
    constructor(storeValue?: Array<[any, any]>);
    /**
     * 将所有键值对清空
     */
    clear(): void;
    /**
     * 删除参数对应的键值对,不论参数是键还是值
     * @param keyOrVal
     * @returns 是否成功删除
     */
    delete(keyOrVal: any): boolean;
    /**
     * 迭代器入口
     * @returns 迭代器
     */
    entries(): Generator<[any, any]>;
    /**
     * 适用于 BIMap 的 forEach
     * @param callback 回调函数,接受的参数分别为 键,值,当前 BIMap
     * @param thisArg
     */
    forEach(callback: Function, thisArg?: any): void;
    /**
     * 藉由 键获取值 或者 值获取键
     * @param keyOrVal
     * @returns 搜索结果
     */
    get(keyOrVal: any): void | any;
    /**
     * 检查是否存在 参数 对应的键值对
     * @param keyOrVal
     * @returns 键值对是否存在
     */
    has(keyOrVal: any): boolean;
    /**
     * 设置一对键值对,如果 键 或 值 已经存在则不做修改;
     * 参数相同不做修改
     * @param key
     * @param val
     */
    set(key: any, val: any): void;
    /**
     * 根据参数中 键 值 更新 BIMap,
     * 若参数中的键值已存在则以新内容为准
     * @param key
     * @param val
     */
    update(key: any, val: any): void;
    /**
     * 返回BIMap中的所有键组成的数组
     * @returns 键组成的数组
     */
    keys(): Array<any>;
    /**
     * 返回BIMap中的所有值组成的数组
     * @returns 值组成的数组
     */
    values(): Array<any>;
    /**
     * 根据参数寻找对应键值对,不论参数是键还是值
     * @param keyOrVal
     * @returns {unFind | Tracer} Symbol 或 Tracer
     */
    private find;
    /**
     * 向控制台输出信息, 生产模式则跳过
     * @param msg
     */
    private log;
}
