# BIMap 双向映射结构

BIMap can use key to get value,also use value to get the key
既可以由键取值，亦可以由值取键

const { BIMap } = require('@ruienger/bimap') // 导入

# BIMap类

`let bimap = new BIMap([ [k1, v1], [k2, v2], ... ])`

构造函数参数结构: `Array<[any, any]>`

## 属性

`bimap.size // the size of this bimap bimap的键值对数`

`bimap.mode // 仅在值为development时打印警告`

## 方法

### clear(): void

Clear all keys and values

清除键值对

---

### delete(keyOrValue: any): boolean

delete the pair of k/v that contains the params, return if deleted

删除包含参数的那对键值对,返回是否删除

`bimap.delete(otherKeyOrValue) => false`

`bimap.delete(k1) => true`

---

### entries(): Genenator<[any, any]>

return the generator of bimap, yiled [key, value]

返回迭代器对象,yiled [key, value]

this method is called by BIMap.[Symbol.iterator] too

该方法同时生成了属于BIMap的迭代器

`const gen = bimap.entries()`

`gen.next() => { value: [k1, v1], done: false }`

`gen.next() => { value: undefined, done: true}`

---

### forEach(callback: Function, thisArg: unknown): void

callback(value: any, key: any, BIMap: BIMap): unknown

just like the Array`s forEach, param bimap is the current bimap you use

就和Array中的forEach一样，其中参数 bimap 是被操作的 bimap

`bimap.forEach((key, value, bimap) => {//code here}, this)`

---

### get(keyOrValue: any): any

find a value that match width param keyOrValue then return it,if not,return undefined

找到与参数对应的值返回，没有则返回 undefined

`bimap.get(k1) => v1; `

`bimap.get(v1) => k1`

---

### has(keyOrValue: any): boolean

return if the keyOrValue exists

返回参数对应的键值是否存在

`bimap.has(otherKeyOrValue) => false`

`bimap.has(v1) => true`

---

### set(key: any, value: any): void

set a new pair of key, value. if key/value has exist already or params duplicated, warn it

设置一对新的键值,如果已存在键或值/参数重复,打印警告

`bimap.set(NaN, NaN) => warning!! BIMap treat NaN as the same variable`

`bimap.set(k1, v2) => warning!! k1 has exists`

`bimap.set(k3, v3) => ok`

---

### update(key: any, value: any): void

update a new pair of key, value. if key/value has exist already, delete the origin pairs and merge them into a new one,but if neither the key nor the value are not found in BIMap,we recommend using set()

更新一对新的键值,如果已存在键或值,将其原来的键值对删除并合并键值到新的一对上,若键值都不存在于BIMap则推荐使用set

`bimap.update(NaN, NaN) => warning!!`

`bimap.update(k1, v2) => now [k1, v1] and [k2, v2] has been delete, [k1, v2] is the new one`

`bimap.update(k1, v3) => ok, now [k1, v2] has been delete, [k1, v3] is the new one`

`bimap.update(k4, v4) => warning!! use set instead`

---

### values(): Array\<any>

return every value of bimap

返回由BIMap中值组成的数组

`bimap.values() => [v1, v2]`

---

### keys(): Array\<any>

return every key of bimap

返回由表中键组成的数组

`bimap.keys() => [k1, k2]`
