## 강제변환 (Coercion)

- 강제변환 : 어떤 값을 다른 타입의 값으로 바꾸는 과정이 명시적이면 타입 캐스팅 (Type Casting) 암시적이면 강제변환 (Coercion) 이라고 한다.
  - 두 용어를 타입 캐스팅은 정적 타입 언어에서 컴파일 시점에, 강제변환은 동적 타입 언어에서 런타임 시점에 발생한다.
  - 명시적 강제변환은 코드만 봐도 의도적으로 타입변환을 일으킨다는 사실이 명백하다.
  - 암시적 강제변환은 다른 작업 도중 불분명한 부수 효과로부터 발생하는 타입변환이다.
  - 명시적(Explicit) : 암시적(Implicit) = 명백한(Obvious) : 숨겨진(Hidden Side Effect) 부수 효과라는 대응관계가 성립한다.

```Javascript
var a = 42;
var b = a + ""; // 암시적
var c = String(a); // 명시적

```

#### 추상 연산

- 추상 연산

  - 어떻게 값이 문자열, 숫자, 불리언 등의 타입이 되는지 기본 규칙에 대해서 알아봐야 한다.
  - ES5 $9를 보면 변환 규칙의 추상 연산(Abstract Operation 내부 전용 연산)이 정의되어 있다.
  - ToString, ToNumber, ToBoolean, ToPrimitive

- ToString
  - 문자열이 아닌 값 -> 문자열 변환 작업은 ToString 추상 연산 로직이 담당한다.
  - 내장 원시 값은 본연의 문자열화 방법이 정해져 있다. (ex: null -> "null", undefined -> "undefined", true -> "true")
  - 숫자는 그냥 문자열로 바뀌고 너무 작거나 큰 값은 지수 형태로 바뀐다.

```Javascript

var a = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;
a.toString(); // "1.07e21"

```

- 일반 객체는 특별히 지정하지 않으면 기본적으로 (Object.prototype.toString()에 있는) toString() 메서드가 내부 [[Class]]를 반환한다.(ex: "[object Object]")
- 자신의 toString() 메서드를 가진 객체는 문자열처럼 사용하면 자동으로 이 메서드가 기본 호출되어 toString()을 대체한다.
  (엄밀히는 객체 -> 문자열 강제변환 시 ToPrimitive 추상 연산 과정을 거치지만, 일단 넘어가자 !)
- 배열은 기본적으로 재정의된 toString()이 있다. 문자열 변환 시 모든 원소 값이 (각각 문자열로 바뀌어) 콤마(,) 형태로 이어진다.
- 또한 toString() 메서드는 명시적으로도 호출 가능하며, 문자열 콘텍스트에서 문자열 아닌 값이 있을 경우에도 자동 호출된다.

```Javascript
var a = [1,2,3];
a.toString(); // "1,2,3"

```
