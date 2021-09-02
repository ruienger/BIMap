'use strict'
const expect = require('chai').expect;
const BIMap = require('../dist/index').default;

const testObject = {}
const testSymbol = Symbol('test')

/**
 * 需要测试的数据类型有
 * number, string, boolean, symbol, undefined, null, NaN(两个NaN视为相等), object
 */

/* --- has ---*/
describe('BIMap clear()', () => {
  it('should return 0', () => {
    const res = new BIMap([[1, 2]])
    res.clear()
    expect(res.size).to.equal(0)
  })
})

/* --- delete ---*/
describe('BIMap delete()', () => {
  it('should return true', () => {
    const res = new BIMap([[undefined, null]])
    expect(res.delete(undefined)).to.equal(true)
  })
  it('should return true', () => {
    const res = new BIMap([[undefined, null]])
    expect(res.delete(null)).to.equal(true)
  })
  it('should return false', () => {
    const res = new BIMap([[undefined, null]])
    expect(res.delete(false)).to.equal(false)
  })
})

/* --- entries ---*/
describe('BIMap entries()', () => {
  it('should return true', () => {
    const res = new BIMap([[undefined, null]])
    const iterator = res.entries()
    iterator.next()
    expect(iterator.next().done).to.equal(true)
  })
  it('should get undefined', () => {
    const res = new BIMap([[undefined, null]])
    const iterator = res.entries()
    expect(iterator.next().value[0]).to.equal(undefined)
  })
  it('should get null', () => {
    const res = new BIMap([[undefined, null]])
    const iterator = res.entries()
    expect(iterator.next().value[1]).to.equal(null)
  })
})

/* --- get ---*/
describe('BIMap get()', () => {
  it('should return true', () => {
    const res = new BIMap([[undefined, null],[NaN, testSymbol]])
    expect(res.get(undefined) === null).to.equal(true)
    expect(res.get(null) === undefined).to.equal(true)
    expect(res.get(NaN) === testSymbol).to.equal(true)
    expect(isNaN(res.get(testSymbol))).to.equal(true)
  })
  it('should return false', () => {
    const res = new BIMap([[undefined, null],[NaN, testSymbol]])
    expect(res.get(NaN) === undefined).to.equal(false)
    expect(res.get(testSymbol) === Symbol('test')).to.equal(false)
  })
})

/* --- has ---*/
describe('BIMap has()', () => {
  it('should return true', () => {
    const res = new BIMap([[undefined, null],[NaN, testSymbol]])
    expect(res.has(undefined)).to.equal(true)
    expect(res.has(null)).to.equal(true)
    expect(res.has(NaN)).to.equal(true)
    expect(res.has(testSymbol)).to.equal(true)
  })
  it('should return false', () => {
    const res = new BIMap([[undefined, null],[NaN, testSymbol]])
    expect(res.has(Symbol('test'))).to.equal(false)
  })
})

/* --- set ---*/
describe('BIMap set()', () => {
  it('should return false', () => {
    const res = new BIMap([[undefined, null],[NaN, testSymbol]])
    res.set(undefined, 2)
    res.set(NaN, 2)
    res.set(testObject, 'testObject')
    expect(res.get(undefined) === null).to.equal(true)
    expect(res.get(NaN) === testSymbol).to.equal(true)
    expect(res.get(testObject) === 'testObject').to.equal(true)
  })
  it('should return false', () => {
    const res = new BIMap([[undefined, null],[NaN, testSymbol]])
    res.set(NaN, NaN)
    expect(res.get(NaN) === testSymbol).to.equal(true)
    res.set(NaN, 2)
    expect(res.get(NaN) === 2).to.equal(false)
  })
})

/* --- update ---*/
describe('BIMap update()', () => {
  it('should return true', () => {
    const res = new BIMap([[undefined, null],[NaN, testSymbol]])
    res.update(undefined, 2)
    res.update(NaN, 3)
    expect(res.get(undefined) === 2).to.equal(true)
    expect(res.get(NaN) === 3).to.equal(true)
  })
  it('should return false', () => {
    const res = new BIMap([[undefined, null],[NaN, testSymbol]])
    res.update(testObject, 'testObject')
    expect(res.get(testObject) === 'testObject').to.equal(false)
  })
})