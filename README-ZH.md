# BIMap 双向映射结构

简体中文 | [English](https://github.com/ruienger/BIMap/blob/master/README.md)

📌 BIMap允许你由键取值，亦可以由值取键

❗ ECMAScript 版本: es2015/es6

❗ 支持的模块: commonjs/es6 模块

# 用例

😳 在某些情况下，你需要在一个用户列表中通过用户名获取id或通过id获取用户名，BIMap可以简化您的工作。

```javascript
const userBIMap = new BIMap([
  ['admin', 'id0001'],
  ['tester', 'id0002']
])

userBIMap.get('admin') // id0001
userBIMap.get('id0002') // tester
```

# 注意事项

**不推荐使用 undefined 作为键或值**

BIMap 支持使用 undefined 作为键或值, 但我们不建议你这么做

undefined 可能会导致一些不可预料的事发生

```javascript
const badBIMap = new BIMap([undefined, 1])

badBIMap.get() // 1
badBIMap.update() // [undefined, 1] = updated => [undefined, undefined]
```


# 安装并使用

```bash
npm i @ruienger/bimap
```

```javascript
const BIMap = require('@ruienger/bimap');
import BIMap from '@ruienger/bimap';
```

# 构造函数

```javascript
let bimap = new BIMap([ [k1, v1], [k2, v2], ... ])
```

构造函数参数结构于Map一致: `Array<[any, any]>`

## 属性

```javascript
bimap.size // bimap 键值对个数
```

~~bimap.mode~~ *已弃用*

现在 mode 取自 `process.env.NODE_ENV`

## 方法

### clear(): void

清除键值对

---

### delete(keyOrValue: any): boolean

删除包含参数的那对键值对,返回是否删除

```javascript
bimap.delete(otherKeyOrValue) // false

bimap.delete(k1) // true
```

---

### entries(): Genenator<[any, any]>

返回迭代器对象,yiled [key, value]

该方法同时生成了属于BIMap的迭代器

```javascript
const gen = bimap.entries()

gen.next() // { value: [k1, v1], done: false }

gen.next() // { value: undefined, done: true}
```

---

### forEach(callback: Function, thisArg: unknown): void

callback(value: any, key: any, BIMap: BIMap): unknown

就和Array中的forEach一样，其中参数 bimap 是被操作的 bimap

```javascript
bimap.forEach((key, value, bimap) => {
  // 代码...
}, this)
```

---

### get(keyOrValue: any): any

找到与参数对应的值返回，没有则返回 undefined

```javascript
bimap.get(k1) // v1;

bimap.get(v1) // k1
```

---

### has(keyOrValue: any): boolean

返回参数对应的键值是否存在

```javascript
bimap.has(otherKeyOrValue) // false

bimap.has(v1) // true
```

---

### set(key: any, value: any): void

设置一对新的键值,如果已存在键或值/参数重复,打印警告

成功则返回 `{ key, val }`, 否则返回 undefined

```javascript
bimap.set(NaN, NaN) // 警告!!
// BIMap 把两个 NaN 当做同一变量

bimap.set(k1, v2) // 警告!! k1 已存在

bimap.set(k3, v3) // ok, return { key: k3, val: v3 }
```

---

### update(key: any, value: any): void

更新一对新的键值

如果已存在键或值,将其原来的键值对删除并合并键值到新的一对上

若键值都不存在于BIMap则推荐使用set

成功则返回 `{ key, val }`, 否则返回 undefined

```javascript
bimap.update(NaN, NaN) // 警告!!

bimap.update(k1, v2)
// 现在 [k1, v1]、[k2, v2] 被删除
// [k1, v2] 作为替换
// returns { key: k1, value: v2 }

bimap.update(k1, v3) // ok
// 现在 [k1, v2] 被删除
// [k1, v3] 作为替换
// returns { key: k1, value: v3 }

bimap.update(k4, v4) // 警告!! 应使用set方法
```

---

### values(): Array\<any>

返回由BIMap中值组成的数组

```javascript
bimap.values() // [v1, v2]
```

---

### keys(): Array\<any>

返回由表中键组成的数组

```javascript
bimap.keys() // [k1, k2]
```

## 作者

🧑 ko no wa da xi da! [ruienger](https://github.com/ruienger)
