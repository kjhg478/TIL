## Type

- Javascript에는 7가지 내장 타입(null, undefined, boolean, number, string, object, symbol)이 있다.

  - 이들은 typeof 연산자로 타입명을 알아낼 수 있다.
  - 변수는 타입이 없지만 값은 타입이 있고, 타입은 값의 내재된 특성을 정의한다.

- undefined와 undeclared는 자바스크립트 엔진에서 전혀 다르게 취급된다.
  - undefined는 선언된 변수에 할당할 수 있는 값이지만, undeclared는 변수 자체가 선언된 적이 없음을 나타낸다.
  - 그러나 자바스크립트에서 이 두 용어를 섞어버려 에러 메시지(ReferenceError a is not defined) 뿐만 아니라 typeof 반환 값도 모두 undefined로 나타남
  - 그래도 typeof 안전 가드 덕분에 선언되지 않은 변수에 사용하면 쓸 수 있다.

```Javascript
typeof undefined === "undefined"; // true
typeof true === "boolean"; // true
typeof 42 === "number"; // true
typeof "42" === "string"; // true
typeof { life: 42} === "object"; // true

// ES6
typeof Symbol() === "symbol" // true

typeof null === "object" // true

```
