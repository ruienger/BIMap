"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tracer_1 = __importDefault(require("./modules/tracer"));
/**
 * 代表 未找到对应键值对 的 Symbol
 */
var unFind = Symbol('unFind'); // 代表不存在该键值对
/**
 * 判断参数是否为 NaN
 * @param value
 * @returns 是否是 NaN
 */
function isNotANum(value) {
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
var BIMap = /** @class */ (function () {
    function BIMap(storeValue) {
        var _this = this;
        if (storeValue === void 0) { storeValue = []; }
        /**
         * 键值对组数
         */
        this.size = 0;
        /**
         * 存储键值对的二维数组
         */
        this.mapStore = [];
        /**
         * 模式
         */
        this.mode = 'production';
        this[_a] = BIMap.prototype.entries;
        storeValue.forEach(function (map) {
            _this.set(map[0], map[1]);
        });
    }
    /**
     * 将所有键值对清空
     */
    BIMap.prototype.clear = function () {
        this.mapStore = [];
        this.size = 0;
    };
    /**
     * 删除参数对应的键值对,不论参数是键还是值
     * @param keyOrVal
     * @returns 是否成功删除
     */
    BIMap.prototype.delete = function (keyOrVal) {
        var res = this.find(keyOrVal);
        if (res === unFind) {
            return false;
        }
        this.mapStore.splice(res.index, 1);
        this.size--;
        return true;
    };
    /**
     * 迭代器入口
     * @returns 迭代器
     */
    BIMap.prototype.entries = function () {
        var index, size;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    index = 0, size = this.size;
                    _b.label = 1;
                case 1:
                    if (!(index < size)) return [3 /*break*/, 4];
                    return [4 /*yield*/, [this.mapStore[index].key, this.mapStore[index].val]];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    index++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    /**
     * 适用于 BIMap 的 forEach
     * @param callback 回调函数,接受的参数分别为 键,值,当前 BIMap
     * @param thisArg
     */
    BIMap.prototype.forEach = function (callback, thisArg) {
        var e_1, _b;
        if (thisArg === void 0) { thisArg = this; }
        try {
            for (var _c = __values(this), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), key = _e[0], val = _e[1];
                callback.call(thisArg, key, val, this);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * 藉由 键获取值 或者 值获取键
     * @param keyOrVal
     * @returns 搜索结果
     */
    BIMap.prototype.get = function (keyOrVal) {
        var res = this.find(keyOrVal);
        if (res === unFind) {
            return;
        }
        return res.res;
    };
    /**
     * 检查是否存在 参数 对应的键值对
     * @param keyOrVal
     * @returns 键值对是否存在
     */
    BIMap.prototype.has = function (keyOrVal) {
        if (this.find(keyOrVal) !== unFind)
            return true;
        return false;
    };
    /**
     * 设置一对键值对,如果 键 或 值 已经存在则不做修改;
     * 参数相同不做修改
     * @param key
     * @param val
     */
    BIMap.prototype.set = function (key, val) {
        if (this.has(key) || this.has(val)) {
            this.log("Duplicate key/value has found. " + (this.has(key) ? key : val) + " has existed");
            return;
        }
        else if (key === val || (isNotANum(key) && isNotANum(val))) {
            this.log("Same params " + key + " & " + val + " not allowed");
            return;
        }
        this.mapStore.push({
            key: key,
            val: val
        });
        this.size++;
    };
    /**
     * 根据参数中 键 值 更新 BIMap,
     * 若参数中的键值已存在则以新内容为准,
     * 若键值都没有在 BIMap 中找到则新增
     * @param key
     * @param val
     */
    BIMap.prototype.update = function (key, val) {
        if (!this.has(key) && !this.has(val)) {
            this.log("Neither key nor value are found in BIMap. use method set instead");
            return;
        }
        else if (key === val || (isNotANum(key) && isNotANum(val))) {
            this.log("Same params " + key + " & " + val + " not allowed");
            return;
        }
        this.delete(key);
        this.delete(val);
        this.set(key, val);
    };
    /**
     * 返回BIMap中的所有键组成的数组
     * @returns 键组成的数组
     */
    BIMap.prototype.keys = function () {
        return this.mapStore.map(function (e) { return e.key; });
    };
    /**
     * 返回BIMap中的所有值组成的数组
     * @returns 值组成的数组
     */
    BIMap.prototype.values = function () {
        return this.mapStore.map(function (e) { return e.val; });
    };
    /**
     * 根据参数寻找对应键值对,不论参数是键还是值
     * @param keyOrVal
     * @returns {unFind | Tracer} Symbol 或 Tracer
     */
    BIMap.prototype.find = function (keyOrVal) {
        var e_2, _b;
        var isNAN = isNotANum(keyOrVal), i = 0;
        try {
            for (var _c = __values(this), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), key = _e[0], val = _e[1];
                var tracer = new tracer_1.default(key, val, val, key, i);
                if (isNAN) {
                    if (isNotANum(key)) {
                        return tracer;
                    }
                    else if (isNotANum(val)) {
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
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return unFind;
    };
    /**
     * 向控制台输出信息, 生产模式则跳过
     * @param msg
     */
    BIMap.prototype.log = function (msg) {
        if (this.mode === 'development') {
            console.log('%cBIMap: %c' + msg, 'color: red; background: yellow; font-weight: bold', 'color: blue');
        }
    };
    return BIMap;
}());
exports.default = BIMap;
_a = Symbol.iterator;
