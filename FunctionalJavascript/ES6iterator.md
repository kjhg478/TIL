## ES6에서의 순회

- for i++
- for of

```Javascript
    const list = [1, 2, 3];
    for (var i = 0; i < list.length; i++) {

    }
    const str = 'abc';
    for (var i = 0; i < str.length; i++) {

    }
    for (const a of list) {

    }
    for (const b of str) {

    }

```

- Array

```Javascript
    const arr = [1, 2, 3];
    let iter1 = arr[Symbol.iterator]();
    for (const a of iter1)

```

- Set

```Javascript
    const set = new Set([1, 2, 3]);
    for (const a of set)

```

- Map

```Javascript
      const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
    for (const a of map.keys())
    for (const a of map.values())
    for (const a of map.entries())
    console.clear();

```
