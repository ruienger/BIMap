"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const bimap_1 = __importDefault(require("@ruienger/bimap"));
/** ************************************************
 *
 *    BIMap 测试
 *    BIMap 需要测试的参数类型包括
 *    undefined null number string
 *    NaN Symbol Object Array Function
 *
 * *************************************************
 */
const bimap = new bimap_1.default();
const getBimap = () => new bimap_1.default();
const CLEAR = 'clear';
describe('BIMap', () => {
    describe(CLEAR, () => {
        it('清空BIMap', () => {
            bimap.set(1, 2);
            bimap.clear();
            assert_1.default.deepEqual(getBimap(), bimap);
        });
    });
    // describe('constructor', () => {
    //   it('传参不合规定时新建空BIMap', () => {
    //     assert.deepEqual()
    //   })
    // })
});
