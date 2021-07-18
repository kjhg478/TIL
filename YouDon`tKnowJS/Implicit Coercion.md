## 암시적 변환 (Implicit Coercion)

- 암시적 강제변환은 부수 효과가 명확하지 않게 숨겨진 형태로 일어나는 타입변환

  - 보기에 분명하지 않은 타입변환은 모두 이 범주에 속함
  - 명시적 강제변환의 목적(코드를 명확하게, 이해할 수 있게 작성함)은 분명하고
    암시적 강제변환의 목적이 그 반대(코드를 더 이해하기 어렵게 만듦)도 분명하다.
  - 암시적 강제변환의 목적은 중요한 내용으로부터 주의를 분산시켜 장황함, 보일러 플레이트, 불필요한 상세 구현을 줄이는 것

- toPrimitive : 추상연산으로서 hint(자료형)에 따라 toString, valueOf 두 메서드 중 하나에게 우선권을 주는 메서드
- toString : 문자열로의 형 변환
- valueOf : 원시값으로의 형 변환

#### 암시적 강제변환: 문자열 <--> 숫자

```Javascript
var a = "42";
var b = "0";

var c = 42;
var d = 0;

a + b; // "420"
c + d; // 42

```

```Javascript
var a = 42;
var b = a + "";

b; // "42"
// 숫자를 문자열로 (암시적) 강제변환하는 아주 흔한 관용 코드
```

```Javascript
var a = {
    valueOf: function() { return 42; },
    toString: function() { return 4; }
}

a + ""; //  "42"

String(a); // 4
```

- toPrimitive 연산 과정에서 a + ""는 a값을 valueOf() 메서드에 전달하여 호출하고, 그 결괏값은 toString 추상 연산을 하여 최종 문자열로 변환
- String(a)는 toString을 직접 호출
- 두 방법 모두 변환된 문자열을 반환하지만 평범한 원시 숫자 값이 아닌 객체라면 결괏값(문자열)이 달라질 수 있다.

```Javascript
var a = "3.14";
var b = a - 0;

b; // 3.14

var a = [3];
var b = [1];

```

- - 연산자는 숫자 뺄셈 기능이 전부이므로 a - 0은 a 값을 숫자로 강제변환한다. 자주 쓰이진 않지만 \*, / 연산자 역시 숫자 연산만 하므로 마찬가지
- 객체 값에 - 연산을 하면 두 배열은 문자열로 강제변환 한 뒤 숫자로 강제변환된다.