## 함수형 자바스크립트의 기본

- 평가 : 코드가 계산(Evaluation)되어 값을 만드는 것
- 일급
  - 값으로 다룰 수 있다.
  - 변수에 담을 수 있다.
  - 함수의 인자로 사용될 수 있다.
  - 함수의 결과로 사용될 수 있다.

```Javascript
    const a = 10;
    const add10 = a => a + 10;
    const r = add10(a);
    console.log(r);
```

- 일급 함수
  - 함수를 값으로 다룰 수 있다.
  - 조합성과 추상화의 도구

```Javascript
    const add5 = a => a + 5;
    console.log(add5);
    console.log(add5(5));

    const fun1 = () => () => 1;
    console.log(fun1());

    const fun2 = fun1();
    console.log(fun2);
    console.log(fun2()')

```

- 고차 함수

  - 함수를 값(인자)으로 다루는 함수

- 함수를 인자로 받아서 실행하는 함수

```Javascript
const apply = f => f(1);
const add2 = a => a + 2;
console.log(apply1(add2));
console.log(apply1(a => a - 1));

  const times = (f, n) => {
    let i = -1;
    while (++i < n) f(i);
  };

  times(console.log, 3);

  times(a => console.log(a + 10), 3);

```

- 함수를 만들어 리턴하는 함수 (클로저를 만들어 리턴하는 함수)

```Javascript
const addMaker = a => a + b;
const add10 = addMaker(10);
console.log(add10(5));
console.log(add10(10));

```
