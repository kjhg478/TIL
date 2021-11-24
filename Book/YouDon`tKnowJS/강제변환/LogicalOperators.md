## Logical Operators

- || && 연산자
  - 선택 연산자 또는 피연산자 선택 연산자
  - 자바스크립트에서 이 두 연산자는 다른 언어와 달리 실제로 결괏값이 논리 값이 아니기 때문
  - 두 피연산자 중 한쪽 (오직 한쪽의) 값이다.

```Javascript

var a = 42;
var b = "abc";
var c = null;

a || b; // 42
a && b; // "abc"

c || b; // "abc"
c && b; // null

```

- 실행순서
  1. ||, && 연산자는 첫 번째 피연산자(a,c)의 불리언 값을 평가한다
  2. 피연산자가 비 불리언 타입이면 먼저 ToBoolean로 강제변환 후 평가를 계속한다.
  3. || 연산자는 그 결과가 true면 첫 번째 피연산자(a, c) 값을, false면 두 번째 피연산자 (b)값을 반환한다.
  4. 이와 반대로 && 연산자는 true면 두 번째 피연산자(b)의 값을, false면 첫 번째 피연산자 (a, c)의 값을 반환한다.

```Javascript
function foo(a,b) {
    a = a || "hello";
    b = b || "world";

    console.log(a + " " + b);
}

foo(); // "hello world"
foo("오 마이", "갓!"); // "오 마이 갓!"

foo("바로 이거야!", " "); // "바로 이거야! world"
// 의도는 b를 ""로 만들려는 것이지만 안된다.
```

- || 연산자

  - falsy 값은 무조건 건너뛸 경우에만 사용

- && 연산자
  - && 연산자는 첫 번째 피연산자의 평가 결과가 truthy일 때에만 두 번째 피연산자를 선택한다고 했는데 이런 특성을 가드 연산자라고 함
  - 첫 번째 표현식이 두 번째 표현식의 가드 역할을 하는 것

```Javascript

function foo() {
    console.log(a);
}

var a = 42;

a && foo(); // 42
```

- a 평가 결과가 truthy일 때에만 foo()가 호출된다. 평가 결과가 falsy면 a && foo() 표현식은 실행을 멈춘다. (단락평가 - Short Circuiting)

```Javascript

var a = 42;
var b = null;
var c = "foo";

if (a && (b || c)) {
    console.log("넵");
}
// a && (b || c) 표현식의 결과는 true가 아니라 foo다
// if문은 이 "foo"를 불리언 타입으로 강제변환하여 true로 만듦
```

### 복합 표현식이 평가된 다음 불리언으로 암시적 강제변환이 일어난다는 사실 !
