## 제너레이터와 이터레이터

- 제너레이터 : 이터레이자 이터러블을 생성하는 함수
- 제너레이터 메서드
  - next() : yield 표현을 통해 yield된 값을 반환
  - return() : 주어진 값을 반환하고 생성기 종료
  - throw() : 생성기로 에러를 throw 한다.

```Javascript
  function* gen() {
    yield 1;
    if (false) yield 2;
    yield 3;
  }

  let iter = gen();
  console.log(iter[Symbol.iterator]() == iter);
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());

  for (const a of gen()) log(a);
  console.clear();

```

- odds

```Javascript
  function* infinity(i = 0) {
    while (true) yield i++;
  }

  function* limit(l, iter) {
    for (const a of iter) {
      yield a;
      if (a == l) return;
    }
  }

  function* odds(l) {
    for (const a of limit(l, infinity(1))) {
      if (a % 2) yield a;
    }
  }

  let iter2 = odds(10);
  console.log(iter2.next());
  console.log(iter2.next());
  console.log(iter2.next());
  console.log(iter2.next());
  console.log(iter2.next());
  console.log(iter2.next());
  console.log(iter2.next());

  for (const a of odds(40)) console.log(a);

  console.clear();

```

- for of, 전개 연산자, 구조 분해, 나머지 연산자

```Javascript
  console.log(...odds(10));
  console.log([...odds(10), ...odds(20)]);

  const [head, ...tail] = odds(5);
  console.log(head);
  console.log(tail);

  const [a, b, ...rest] = odds(10);
  console.log(a);
  console.log(b);
  console.log(rest);

```
