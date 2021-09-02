# BIMap 双向映射结构

BIMap can use key to get value,also use value to get the key
既可以由键取值，亦可以由值取键

# how-to-use 使用方式

```
    let bimap = new BIMap([
        [k1, v1],
        [k2, v2],
        ...
    ])
```

bimap.size // the size of this bimap bimap的键值对数

## 方法

+ **clear(): undefined**
    > - Clear all keys and values
    > - 清除键值对

+ **delete(keyOrValue): boolean**
    > - delete the pair of k/v that contains the params, return if deleted
    > - 删除包含参数的那对键值对,返回是否删除

+ **entries(): function \*()**
    > - return the generator of bimap, yiled [key, value]
    > - 返回迭代器对象,每组都是 [key, value]

+ **forEach(callback(value, key, bimap), thisArg):undefined**
    > - just like the Array`s forEach, param bimap is the current bimap you use
    > - 就和Array中的forEach一样，其中参数 bimap 是被操作的 bimap

+ **get(keyOrValue): any**
    > - find a value that match width param keyOrValue then return it,if not,return undefined
    > - 找到与参数对应的值返回，没有则返回 undefined
    > - `eg. get(k1) => v1; get(v1) => k1`

+ **has(keyOrValue): boolean**
    > - return if the keyOrValue exists
    > - 返回参数对应的键值是否存在

+ **set(key, value):undefined**
    > - set a new pair of key, value. if key/value has exist already, warn it
    > - 设置一对新的键值,如果已存在键或值,打印警告
    ```- e.g 
        - set(NaN, NaN) => warning!!
        - set(k1, v2) => warning!!
        - set(k3, v3) => ok
    ```

+ **update(key, value):undefined**
    > - update a new pair of key, value. if key/value has exist already, delete the origin pairs and merge them into a new one
    > - 更新一对新的键值,如果已存在键或值,将其原来的键值对删除并合并键值到新的一对上
    ```- e.g 
        - update(NaN, NaN) => warning!!
        - update(k1, v2) => now [k1, v1] and [k2, v2] has been delete, [k1, v2] is the new one
        - update(k1, v3) => ok, now [k1, v2] has been delete, [k1, v3] is the new one
    ```

+ **values(): array**
    > - return every value of bimap
    > - 返回由表中值组成的数组 
    - `eg. [v1, v2]`

+ **keys(): array**
    > - return every key of bimap
    > - 返回由表中键组成的数组 
    - `eg. [k1, k2]`