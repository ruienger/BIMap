# BIMap 双向映射结构

[![Automaticlly Code Build](https://github.com/ruienger/BIMap/actions/workflows/main.yml/badge.svg)](https://github.com/ruienger/BIMap/actions/workflows/main.yml)

[简体中文](https://github.com/ruienger/BIMap/blob/master/README-ZH.md) | English

📌 BIMap allows you get value via the key or get key via the value

❗ ECMAScript version: es2015/es6

❗ module supported: commonjs/es6 module

# Usage Example

😳 In some cases, you need to **get id via username** or **get username via id** in a userlist, BIMap can simplify your work.

```javascript
const userBIMap = new BIMap([
  ['admin', 'id0001'],
  ['tester', 'id0002']
])

userBIMap.get('admin') // id0001
userBIMap.get('id0002') // tester

const repeatedUserBIMap = new BIMap([
  ['admin', 'id0001'], ['fakeAdmin', 'id0001']
]) // only ['admin', 'id0001'] been settled, if key/value repeated, bimap will pass it

repeatedBIMap.get(admin) // id0001
repeatedBIMap.has(fakeAdmin) // false

```

# Attention

**Using undefined as a key or value is not recommend**

BIMap support using undefined as a key or value, but we dont recommend you to do so

undefined may cause something that is unexpected

**BIMap treat NaN as the same variable**

```javascript
const badBIMap = new BIMap([undefined, 1])

badBIMap.get() // 1
badBIMap.update() // [undefined, 1] = updated => [undefined, undefined]

// BIMap will treat NaN as a constant
const NaNBIMap = new BIMap([
  [NaN, NaN], [NaN, 2]
]) // only [NaN, 2] been settled, if key === val, bimap will pass it

NaNBIMap.get(NaN) // 2

```

# Install & Use

```bash
npm i @ruienger/bimap
```

```javascript
const BIMap = require('@ruienger/bimap'); // or
import BIMap from '@ruienger/bimap';
```

# Constructor

```javascript
let bimap = new BIMap([[k1, v1], [k2, v2]])
```

the param is familiar with Map\`s `Array<[any, any]>`

## Properties

```javascript
bimap.size // the size of this bimap
```

~~bimap.mode~~ *deprecated*

now,mode is equal to `process.env.NODE_ENV`

## Methods

### clear(): void

Clear all keys and values

---

### delete(keyOrValue: any): boolean

delete the pair of k/v that contains the params, return if successfully deleted

```javascript
bimap.delete(otherKeyOrValue) // false

bimap.delete(k1) // true
```

---

### entries(): Genenator<[any, any]>

return the generator of bimap, yiled [key, value]

this method is called by BIMap.[Symbol.iterator] too

```javascript
const gen = bimap.entries()

gen.next() // { value: [k1, v1], done: false }

gen.next() // { value: undefined, done: true}
```

---

### forEach(callback: Function, thisArg: unknown): void

callback(value: any, key: any, BIMap: BIMap): unknown

just like the Array`s forEach, param bimap is the current bimap you use

```javascript
bimap.forEach((key, value, bimap) => {
  //code here
}, this)
```

---

### get(keyOrValue: any): any | void

find a value that match with keyOrValue then return it,if not found,return undefined

```javascript
bimap.get(k1) // v1;

bimap.get(v1) // k1
```

---

### has(keyOrValue: any): boolean

return if the keyOrValue exists

```javascript
bimap.has(otherKeyOrValue) // false

bimap.has(v1) // true
```

---

### set(key: any, value: any): void | \{ key, value }

set a new pair of key, value. if key/value has exist already or params duplicated, warn it

return the `{ key, value }` you set or undefined if failed

```javascript
bimap.set(NaN, NaN) // warning!!
// BIMap treat NaN as the same variable

bimap.set(k1, v2) // warning!! k1 has exists

bimap.set(k3, v3) // ok, return { key: k3, val: v3 }
```

---

### forceSet(key: any, value: any): void | \{ key, value }void

**we dont recommend u use this method unless you know excatly what u doing**

set a new pair of key, value. if key/value has exist already, delete the old pairs and set a new one

if params duplicated, warn it

return the `{ key, value }` you set or undefined if failed

```javascript
bimap.set(k4, v4)
bimap.set(k5, v5)

bimap.forceSet(k4, v5) // now [k4, v4], [k5, v5] has been deleted, [k4, v5] is the new one
```

---

### update(key: any, value: any): void | \{ key, value }void

update a new pair of key, value.

if key/value has exist already, delete the origin pairs and merge them into a new one

but if neither the key nor the value are not found in BIMap,we recommend using set()

return the `{ key, value }` you updated or undefined if failed

```javascript
bimap.update(NaN, NaN) // warning!!

bimap.update(k1, v2)
// now [k1, v1] and [k2, v2] has been deleted
// [k1, v2] is the new one
// returns { key: k1, value: v2 }

bimap.update(k1, v3) // ok
// now [k1, v2] has been deleted
// [k1, v3] is the new one
// returns { key: k1, value: v3 }

bimap.update(k4, v4) // warning!! use set() instead
```

---

### values(): Array\<any>

return every value of bimap

```javascript
bimap.values() // [v1, v2]
```

---

### keys(): Array\<any>

return every key of bimap

```javascript
bimap.keys() // [k1, k2]
```

## Authors

🧑 [ruienger](https://github.com/ruienger)
