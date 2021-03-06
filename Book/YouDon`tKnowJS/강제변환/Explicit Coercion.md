## 명시적 강제변환 (Explicit Coercion)

- 명시적 강제변환은 분명하고 확실한 타입변환이다.

### 명시적 강제변환: 문자열 <-> 숫자

```Javascript
let a = 42;
let b = String(a);
let c = "3.14";
let d = Number(c);
b; // "42"
d; // 3.14
```

- ToString 추상 연산 로직에 따라 String()은 값을 받아 원시 문자열로 강제변환
- ToNumber 추상 연산 로직에 따라 어떤 값이든 원시 숫자 값으로 강제변환

```Javascript
let a = 42;
let b = a.toString();
let c = "3.14";
let d = +c;
b; // "42"
d; // 3.14
```

- a.toString() 호출은 겉보기엔 명시적이지만, 몇 가지 암시적인 요소가 감춰져 있다.

  - 원시 값 42에는 toString() 메서드가 없으므로 엔진은 toString()을 사용할 수 있게 자동으로 42를 객체 래퍼로 박싱한다.
  - 명시적으로, 암시적인 작동

- +c의 +는 단항 연산자(피연산자(연산에 참여하는 변수나 상수)가 하나뿐인 연산자)다.
  - 단항 연산자 +는 피연산자 c를 숫자로, 명시적 강제변환 한다.
  ```Javascript
  let c = "3.14";
  let d = 5+ +c;
  d; // 8.14
  ```

### 명시적 강제변환: 숫자 형태의 문자열 파싱

```Javascript
let a = "42";
let b = "42px";

Number(a); // 42
parseInt(a); // 42
Number(b); // NaN
parseInt(b); // 42

```

- 문자열로부터 숫자 값의 파싱은 비 숫자형 문자를 허용한다.
- 즉, 좌 -> 우 방향으로 파싱하다가 숫자 같지 않은 문자를 만나면 즉시 멈춘다. 반면, 강제변환은 비 숫자형 문자를 허용하지 않기 때문에 NaN을 낸다.
- 파싱은 강제변환의 대안이 될 수 없다. 목적 자체가 다르기 때문
  - 우측에 비 숫자형 문자가 있을지 확실하지 않거나 별로 상관없다면 문자열을 숫자로 파싱한다.
  - 반드시 숫자여야만 하고 "42px"같은 값을 되돌려야 한다면 문자열을 숫자로 강제변환 한다.

### parseInt()는 문자열에 쓰는 함수임을 기억하자 ! (인자가 숫자라면 애당초 쓸 이유가 없다)

---

### 명시적 강제변환: \* -> 불리언

- String(), Number()도 그렇듯이 Boolean()은 (ToBoolean 추상 연산에 의한) 명시적인 강제변환 방법이다.

  - 그러나 자주 쓰이지는 않음
  - - 단항 연산자가 값을 숫자로 강제변환 하는 것처럼 ! 부정 단항 연산자도 값을 불리언으로 명시적인 강제변환을 한다.
  - 문제는 그 과정에서 truthy, falsy까지 뒤바뀐다는 점이다.
  - 그래서 일반적으로 자바스크립트 개발 시 불리언 값으로 명시적인 강제변환을 할 땐 !! 이중 부정 연산자를 사용한다.
  - 두 번째 !이 패리티를 다시 원상복구 시켜줌 (표현식이 true면 false, false면 true로 결과를 반대로 뒤집기 때문에 불리언 타입으로 변환 되고,
    한 번 더 부정해야 원래 표현식의 값을 얻을 수 있음)

  ```Javascript
  var a = "0";
  var b = [];
  var c = {};

  var d = "";
  var e = 0;
  var f = null;
  var g;

  !!a; // true
  !!b; // true
  !!c; // true
  !!d; // false
  !!e; // false
  !!f; // false
  !!g; // false
  ```

- 이중 부정 연산자
  - !! 연산자는 확실한 논리 결과를 가지기 위해 사용한다.
  - Ex) 정의되지 않은 변수 undefined 값을 가진 내용의 논리 연산 시에도 확실한 true / false를 가지도록 하는게 목적

```Javascript

var a;
console.log("a    :: " + (a));
console.log("!a   :: " + (!a));
console.log("!!a  :: " + (!!a));

var b = true;
console.log("b    :: " + (b));
console.log("!b   :: " + (!b));
console.log("!!b  :: " + (!!b));

var c = null;
console.log("c    :: " + (c));
console.log("!c   :: " + (!c));
console.log("!!c  :: " + (!!c));

// 결과

a    :: undefined
!a   :: true
!!a  :: false

b    :: true
!b   :: false
!!b  :: true

c    :: null
!c   :: true
!!c  :: false


출처: https://hermeslog.tistory.com/279

```
