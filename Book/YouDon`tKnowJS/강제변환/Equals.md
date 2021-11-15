## Loose Equals, Strict Equals

- 느슨한 동등 비교와 엄격한 동등 비교 (==과 ===)
  - 동등함의 비교 시 ==은 강제변환을 허용하지만, === 강제변환을 허용하지 않는다.
  - 강제변환이 필요하다면 느슨한 동등 연산자 (==), 필요하지 않다면 엄격한 동등 연산자 (===) 사용!

#### 비교하기: 문자열 -> 숫자

```Javascript
var a = 42;
var b = "42";

a === b; // false
a == b; // ture
// 강제변환이 허용되지 않는 데다 42와 "42"는 그냥 봐도 다른 값
```

- 느슨한 동등 비교에서는 피연산자의 타입이 다르면, 비교 알고리즘에 의해 한쪽 또는 양쪽 피연산자 값이 알아서 암시적으로 강제변환 된다.
  - ES5 11.9.3.4-5
  - Type(x)가 Number고 Type(y)가 String이면, x == ToNumber(y) 비교 결과를 반환한다.
  - Type(x)가 String이고 Type(y)가 Number면, ToNumber(x) == y 비교 결과를 반환

#### 비교하기: \* -> 불리언

```Javascript
var a = "42";
var b = true;

a == b; // false
// "42"는 truthy값이면 true 아닌가?
```

- ES5 11.9.3.6-7
  - Type(x)이 불리언이면 ToNumber(x) == y의 비교 결과를 반환한다.
  - Type(y)이 불리언이면 x == ToNumber(y)의 비교 결과를 반환한다.

```Javascript
var x = true;
var y = "42";

x == y; // false

var x = "42";
var y = false;

x == y; // false

```

- Type(x)은 불리언이므로 ToNumber(x) -> 1로 강제변환된다. 따라서 1 == "42" --> 1 == 42 false
- Type(y)가 불리언이므로 ToNumber(y)는 0이고, "42" == 0 --> 42 == 0 false

#### == ture, == false같은 코드는 쓰지 말자 !

---

#### 비교하기: null -> undefined

- ES5 11.9.3.2-3
  - x가 null이고 y가 undefined면 true를 반환한다.
  - x가 undefined고 y가 null이면 true를 반환한다.

```Javascript

var a = null;
var b;

a == b; // true
a == null; // true
b = null; // true

a == false; // false
b == false; // false
a == ""; // false
b == ""; // false
a == 0; // false
b == 0; // false

```

- null <--> undefined 강제변환은 안전하고 예측 가능하며, 어떤 다른 값도 비교 결과 긍정 오류를 할 가능성이 없다.

```Javascript
var a = doSomething();

if (a == null) {
    //
}
// 가독성 좋고 안전하게 작동하는 암시적 강제변환의 일례
// a == null의 평가 결과는 null이나 undefined를 반환할 경우에만 true, 나머지는(심지어 0, false값들도 포함) false

var a = doSomething();

if (a === undefined || a === null) {
}
// 사소하지만 성능도 약간 떨어지고 가독성도 좋지 않음

```

#### 비교하기: 객체 -> 비객체

- 객체/함수/배열과 단순 스칼라 원시 값(문자열, 숫자, 불리언)의 비교
  - ES5 11.9.3.8-9
  - Type(x)가 String 또는 Number고 Type(y)가 객체라면, x == ToPrimitive(y)의 비교결과를 반환
  - Type(x)가 Object이고 Type(y)가 String 또는 Number라면, ToPrimitive(x) == y의 비교결과를 반환

```Javascript
var a = 42;
var b = [42];

a == b; // true

```

- [42]는 ToPrimitive 추상 연산 결과, "42"가 된다. 그리고 "42" == 42 => 42 == 42이므로 a, b는 동등

```Javascript

var a = "abc";
var b = Object(a); // new String(a)와 같다

a === b; // false;
a == b; // true
```

- b는 ToPrimitive 연산으로 "abc"라는 단순 스칼라 원시 값으로 강제변환되고 (언박싱으로 벗겨짐) 이 값은 a == b true
  - 항상 그런 것만은 아니다 (더 우선하는 규칙이 있음)

```Javascript
var a = null;
var b = Object(a); // Object()와 같다
a == b; // false

var c = undefined;
var d = Object(c); // Object()와 같다
c == d; // false

var e = NaN;
var f = Object(e); // new Number(e)와 같다.
e == f; // false
```

- null과 undefined는 객체 래퍼가 따로 없으므로 박싱할 수 없다.
  - Object(null)은 Object()로 해석되어 그냥 일반 객체가 만들어짐
  - NaN은 해당 객체 래퍼인 Number로 박싱되지만, ==을 만나 언박싱되면 NaN == NaN ( NaN은 자기 자신과도 같지 않음) false
