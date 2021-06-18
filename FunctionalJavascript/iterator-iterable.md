## 이터러블 / 이터레이터 프로토콜

- ES6에서 추가되었음
- [Symbol.iterator] : object를 반환하는, agruments 없는 function iterator protocol을 따른다.
- next() : 2개의 속성들을 가진 object를 반환하는 arguments 없는 함수

  - done (boolean) : iterator가 마지막 반복작업을 마쳤을 경우 true, 만약 iterator에 return값이 있다면 value의 값으로 지정
    iterator의 작업이 남아있을 경우 false
  - value : iterator로부터 반환되는 모든 자바스크립트 값이며 done이 true일 경우 생략 및 undefined

- 이터러블 : 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값
- 이터레이터 : { value, done } 객체를 리턴하는 next() 를 가진 값
- 이터러블/이터레이터 프로토콜 : 이터러블을 for...of, 전개 연산자 등과 함꼐 동작하도록 한 규약

```Javascript
  const iterable = {
    [Symbol.iterator]() {
      let i = 3;
      return {
        next() {
          return i == 0 ? {done: true} : {value: i--, done: false};
        },
        [Symbol.iterator]() {
          return this;
        }
      }
    }
  };
  let iterator = iterable[Symbol.iterator]();
  iterator.next();
  iterator.next();
  // log(iterator.next());
  // log(iterator.next());
  // log(iterator.next());
  for (const a of iterator) console.log(a);

  // const arr2 = [1, 2, 3];
  // let iter2 = arr2[Symbol.iterator]();
  // iter2.next();
  // log(iter2[Symbol.iterator]() == iter2);
  // for (const a of iter2)
  // console.log(a);

  for (const a of document.querySelectorAll('*')) console.log(a);
  const all = document.querySelectorAll('*');
  let iter3 = all[Symbol.iterator]();
  log(iter3.next());
  log(iter3.next());
  log(iter3.next());

```

- 사용자 정의 이터러블

```Javascript
  const iterable = {
    [Symbol.iterator]() {
      let i = 3;
      return {
        next() {
          return i == 0 ? {done: true} : {value: i--, done: false};
        },
        [Symbol.iterator]() {
          return this;
        }
      }
    }
  };
  let iterator = iterable[Symbol.iterator]();
  iterator.next();
  iterator.next();
  // log(iterator.next());
  // log(iterator.next());
  // log(iterator.next());
  for (const a of iterator) console.log(a);

  // const arr2 = [1, 2, 3];
  // let iter2 = arr2[Symbol.iterator]();
  // iter2.next();
  // log(iter2[Symbol.iterator]() == iter2);
  // for (const a of iter2) console.log(a);

  for (const a of document.querySelectorAll('*')) console.log(a);
  const all = document.querySelectorAll('*');
  let iter3 = all[Symbol.iterator]();
  log(iter3.next());
  log(iter3.next());
  log(iter3.next());

  // 전개 연산자
  console.clear();
  const a = [1, 2];
  // a[Symbol.iterator] = null;
  console.log([...a, ...arr, ...set, ...map.keys()]);

```
