"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const tracer_1 = __importDefault(require("./tracer"));
/**
 * 代表 未找到对应键值对 的 Symbol
 */
const unFind = Symbol('unFind'); // 代表不存在该键值对
/**
 * 判断参数是否为 NaN
 * @param value
 * @returns 是否是 NaN
 */
function isNotANum(value) {
    return typeof value === 'number' && Number.isNaN(value);
}
/**
 * 判断两个参数是否一致，NaN当做一种变量，不一致则log
 * @param target
 * @param source
 * @returns 是否一致
 */
function isTheSame(target, source) {
    if (target === source || (isNotANum(target) && isNotANum(source))) {
        log(`Same params ${String(target)} & ${String(source)} not allowed`);
        return true;
    }
    return false;
}
/**
 * 向控制台输出信息, webpack 生产模式则跳过
 * @param msg
 */
function log(msg) {
    var _c;
    if (((_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.NODE_ENV) === 'development') {
        // eslint-disable-next-line no-console
        console.log(`%cBIMap: %c${msg}`, 'color: red; background: yellow; font-weight: bold', 'color: blue');
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
class BIMap {
    constructor(storeValue = []) {
        /** 确保 typeof 返回的是 BIMap */
        this[_a] = 'BIMap';
        /** 迭代器 */
        this[_b] = this.entries;
        /**
         * the size of this bimap
         *
         * 键值对组数
         */
        this.size = 0;
        /**
         * 存储键值对的二维数组
         */
        this.mapStore = [];
        storeValue.forEach((map) => {
            this.set(map[0], map[1]);
        });
    }
    /**
     * Clear all keys and values
     *
     * 将所有键值对清空
     */
    clear() {
        this.mapStore = [];
        this.size = 0;
    }
    /**
     * delete the pair of k/v that contains the params, return if deleted
     *
     * 删除参数对应的键值对,不论参数是键还是值
     * @param keyOrVal
     * @returns is successfully deleted
     */
    delete(keyOrVal) {
        const res = this.find(keyOrVal);
        if (res === unFind) {
            return false;
        }
        this.mapStore.splice(res.index, 1);
        this.size--;
        return true;
    }
    /**
     * return the iterator of bimap, yiled [key, value]
     *
     * 迭代器入口
     * @returns Genetator
     */
    *entries() {
        for (let index = 0, { size } = this; index < size; index++) {
            yield [this.mapStore[index].key, this.mapStore[index].val];
        }
    }
    *a() {
        yield [1, 2, 3];
    }
    /**
     * forEach for BIMap
     *
     * 适用于 BIMap 的 forEach
     * @param callback (key, value, currentBIMap) => BIMapElement
     * @param thisArg
     */
    forEach(callback, thisArg = this) {
        for (const [key, val] of this.entries()) {
            callback.call(thisArg, key, val, this);
        }
    }
    /**
     * find a value that match width param keyOrValue then return it,if not,return undefined
     *
     * 藉由 键获取值 或者 值获取键
     * @param keyOrVal
     * @returns ValOrKey
     */
    get(keyOrVal) {
        const res = this.find(keyOrVal);
        if (res === unFind) {
            return undefined;
        }
        return res.res;
    }
    /**
     * check if the keyOrValue exists
     *
     * 检查是否存在 参数 对应的键值对
     * @param keyOrVal
     * @returns if the keyOrValue exists
     */
    has(keyOrVal) {
        if (this.find(keyOrVal) !== unFind)
            return true;
        return false;
    }
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
    set(key, val) {
        if (this.has(key) || this.has(val)) {
            return undefined;
        }
        if (isTheSame(key, val)) {
            return undefined;
        }
        const item = {
            key,
            val,
        };
        this.mapStore.push(item);
        this.size++;
        return item;
    }
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
    forceSet(key, val) {
        if (isTheSame(key, val)) {
            return undefined;
        }
        this.delete(key);
        this.delete(val);
        const item = {
            key,
            val,
        };
        this.mapStore.push(item);
        this.size++;
        return item;
    }
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
    update(key, val) {
        if (!this.has(key) && !this.has(val)) {
            log('Neither key nor value are found in BIMap. use method set instead');
            return undefined;
        }
        if (isTheSame(key, val)) {
            return undefined;
        }
        this.delete(key);
        this.delete(val);
        return this.set(key, val);
    }
    /**
     * return every value of bimap
     *
     * 返回BIMap中的所有键组成的数组
     * @returns Array of values
     */
    keys() {
        return this.mapStore.map((e) => e.key);
    }
    /**
     * return every key of bimap
     *
     * 返回BIMap中的所有值组成的数组
     * @returns Array of keys
     */
    values() {
        return this.mapStore.map((e) => e.val);
    }
    /**
     * 根据参数寻找对应键值对,不论参数是键还是值
     * @param keyOrVal
     * @returns {unFind | Tracer} Symbol 或 Tracer
     */
    find(keyOrVal) {
        const isNAN = isNotANum(keyOrVal);
        let i = 0;
        for (const [key, val] of this) {
            const tracer = new tracer_1.default(key, val, val, key, i);
            if (isNAN) {
                if (isNotANum(key)) {
                    return tracer;
                }
                if (isNotANum(val)) {
                    return tracer.exchangeStruct();
                }
            }
            else if (key === keyOrVal) {
                return tracer;
            }
            else if (val === keyOrVal) {
                return tracer.exchangeStruct();
            }
            i++;
        }
        return unFind;
    }
}
exports.default = BIMap;
_a = Symbol.toStringTag, _b = Symbol.iterator;
