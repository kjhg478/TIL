## 호이스팅

```Javascript

a = 2;
var a;
console.log(a);
// 2

console.log(a);
var a = 2;
// undefined

```

- 컴파일레이션

  - 컴파일레이션 단계 중에는 모든 선언문을 찾아 적절한 스코프에 연결해주는 과정이 있었다. (이 과정이 렉시컬 스코프의 핵심)

- 위의 코드들의 해석
  - 변수와 함수 선언문 모드 코드가 실제 실행되기 전에 먼저 처리된다.
  - 자바스크립트에서 'var a= 2'는 두 개의 구문으로 나뉜다.
    1. var a;
    2. a = 2;
  - 첫째 구문은 선언문으로 컴파일레이션 단계에서 처리된다. 둘째 구문은 대입문으로 실행 단계까지 내버려둔다.

```Javascript

var a;
a = 2;
console.log(a);

var a;
console.log(a);
a = 2;


```

- 이 과정을 비유적으로 말하면 변수와 함수 선언문은 선언된 위치에서 코드의 꼭대기로 '끌어올려'진다.

### 이렇게 선언문을 끌어올리는 동작을 '호이스팅'이라고 한다. 선언문이 대입문보다 먼저다.

- 호이스팅은 스코프별로 작동한다는 점도 중요하다.
- 밑에 예제 함수(함수 선언문) foo() 내에서도 변수 a(프로그램의 꼭대기가 아니라)는 foo()의 꼭대기로 끌어올려진다.

```Javascript

foo();

function foo() {
    console.log(a) // undefined
    var a = 2;
}

function foo() {
    var a;
    console.log(a); // undefined
    a = 2;
}
foo();

```

- 함수 표현식

```Javascript

foo(); // TypeError

var foo = function bar() {
    // ...
};

foo(); // TypeError
bar(); // ReferenceError

var foo = function bar() {

};

```

- 변수 확인자 foo는 끌어올려져 둘러싼 (글로벌) 스코프에 붙으므로 foo() 호출은 실패하지 않고, ReferenceError도 발생하지 않는다.
- 그러나 foo는 아직 값을 가지고 있지 않는데 foo()가 undefined 값을 호출하려해 TypeError를 발생시킨다.
- 또 기억해야할 것은 함수 표현식이 이름을 가져도 그 이름 확인자는 해당 스코프에서 찾을 수 없다

- 호이스팅 적용

```Javascript

var foo;

foo();
bar();

foo = function() {
    var bar = self...
}

```

- 함수와 변수 선언문
  - 함수와 변수 선언문은 모두 끌어올려진다. 그러나 미묘한 차이가 있는데, 먼저 함수가 끌어올려지고 다음으로 변수가 올려진다.

```Javascript

foo(); // 1
var foo;

function foo() {
  console.log(1);
}

foo = function() {
  console.log(2);
}
// 이 코드를 자바스크립트 엔진은 이렇게 해석한다.

function foo () {
  console.log(1);
}

foo(); // 1

foo = function() {
  console.log(2);
};

```

- var foo가 중복 선언문이라는 점을 보자.
- var foo는 function foo() 선언문보다 앞서 선언됐지만, 함수 선언문이 일반 변수 위로 끌어올려졌다.
  많은 중복 변순 선언문이 사실상 무시됐지만 중복 함수 선언문은 앞선 것들을 곂쳐 쓴다.

```Javascript

foo(); // 3

function foo() {
  console.log(1);
}

var foo = function() {
  console.log(2);
}

function foo() {
  console.log(3);
}

```

- 같은 스코프 내에서의 중복 정의는 정말 나쁜 방식이고 혼란스러운 결과를 낸다.
- 일반 블록 안에서 보이는 함수 선언문은 보통 둘러싼 스코프로 끌어올려진다.

- 함수 선언식 (Function Declarations)

```Javascript

function 함수명() {
  Logic...
}

```

- 함수 표현식 (Function Expressions)

```Javascript

const 함수명 = function () {
  Logic...
}

```

### 정리하기

- var a = 2는 하나의 구문처럼 보이지만 자바스크립트 엔진은 "var a"와 "a = 2"라는 두 개의 독립된 구문으로 본다.
- 첫째 구문은 컴파일러 단계에서 처리하고 둘째 구문은 실행 단계에서 처리한다.

- 즉, 스코프의 모든 선언문은 어디서 나타나든 실행 전에 먼저 처리된다는 점이다.
- 호이스팅이라 불리는 이 과정은 (변수와 함수) 선언문 각각이 속한 스코프의 꼭대기로 '끌어올려'지는 작업이라고 생각할 수 있다.
- 그 과정에서 선언문 자체는 옮겨지지만, 함수 표현식의 대입문을 포함한 모든 대입문은 끌어 올려지지 않는다.
- 중복 선언을 조심하자. 일반 변수 선언과 함수 선언을 섞어 사용하면 더 위험하다 !
