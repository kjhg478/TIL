## Scope

- 프로그래밍 언어의 기본 패러다임 중 하나는 변수에 값을 저장하고 저장된 값을 가져다 쓰고 수정하는 것

  - 변수는 어디에 살아있는가? 변수는 어디에 저장되는가?
  - 필요할 때 프로그램은 어떻게 변수를 찾는가?
  - 즉, 특정 장소에 변수를 저장하고 나중에 그 변수를 찾는 데는 잘 정의된 규칙이 필요하며, 이 규칙을 '스코프'라고 한다.

- 자바스크립트

  - 자바스크립트는 일반적으로 '동적', '인터프리터' 언어로 분류하나 사실은 '컴파일러 언어' 이다.
  - 전통적인 컴파일러 언어의 처리 과정에서는 프로그램을 이루는 소스 코드가 실행되기 전에 보통 3단계를 거치는데, 이를 '컴파일레이션(Compilation)'이라고 한다.
    1. 토크나이징(Tokenizing) / 렉싱 (Lexing) - 문자열을 나누어 '토큰'이라 불리는 의미 있는 조각으로 만드는 과정이다.
    2. 파싱 (Parsing) - 토큰 배열을 프로그램의 문법 구조를 반영하여 중첩 원소를 갖는 트리 형태로 바꾸는 과정이다. (파싱의 결과로 만들어진 트리를 AST(Abstract Syntax Tree)라 부른다.)
       ex) "var = 2;"의 트리는 먼저 변수 선언이라 부르는 최상위 노드에서, 'a'의 값을 가지는 확인자와 대입 수식이라 부르는 자식 노드를 가진다.
       대입 수식 노드는 '2'라는 값을 가지는 숫자 리터럴을 자식 노드로 가진다.
    3. 코드 생성 (Code-Generation) - AST(추상 구문 트리)를 컴퓨터에서 실행 코드로 바꾸는 과정이다.

- 자바스크립트 엔진
  - 자바스크립트 엔진은 이 세 가지 단계뿐 아니라 많은 부분에서 다른 프로그래밍 언어의 컴파일러보다 훨씬 복잡하다.
  - 파싱과 코드 생성 과정에서 불필요한 요소를 삭제하는 과정을 거쳐 실행 시 성능을 최적화한다.
  - 자바스크립트 엔진이 기존 컴파일러와 다른 점은 자바스크립트 컴파일레이션을 미리 수행하지 않아서 최적화할 시간이 많지 않다.
  - 즉, 어떤 자바스크립트 조각이라도 실행되려면 먼저 컴파일되어야 한다. 자바스크립트 컴파일러는 프로그램 "var a = 2;"를 받아 컴파일하여 바로 실행될 수 있게 한다.

### 스코프 이해하기

- Example

  - var a = 2;
    1. 엔진 : 컴파일레이션의 시작부터 끝까지 전 과정과 자바스크립트 프로그램 실행을 책임진다.
    2. 컴파일러 : 엔진의 친구로, 파싱과 코드 생성의 모든 잡일을 도맡아 한다.
    3. 스코프 : 엔진의 또 다른 친구로, 선언된 모든 확인자(변수) 검색 목록을 작성하고 유지한다.
       또한, 엄격한 규칙을 강제하여 현재 실행 코드에서 확인자의 적용 방식을 정한다.
  - var a = 2를 어떻게 접근하는지 살펴보자

    1. 컴파일러가 'var a'를 만나면 스코프에게 변수 a가 특정한 스코프 컬렉션 안에 있는지 묻는다.
    2. 변수 a가 이미 있다면 컴파일러는 선언을 무시하고 지나가고, 그렇지 않으면 컴파일러는 새로운 변수 a를 스코프 컬렉션 내에 선언하라고 요청한다.
    3. 그 후, 컴파일러는 'a = 2' 대입문을 처리하기 위해 나중에 엔진이 실행할 수 있는 코드를 생성한다.
    4. 엔진이 실행하는 코드는 먼저 스코프에게 a라 부르는 변수가 현재 스코프 컬렉션 내에서 접근할 수 있는지 확인한다.
    5. 가능하다면 엔진은 변수 a를 사용하고, 아니라면 엔진은 다른 곳(중첩 스코프 부분)을 살핀다.
    6. 엔진이 변수를 찾으면 변수에 값 2를 넣고, 못 찾는다면 엔진은 손을 들고 에러가 발생한다.

  - 이것을 요약하면 컴파일러가 변수를 선언한다.(현재 스코프에 미리 변수가 선언되지 않은 경우) 그 후, 엔진이 스코프에서 변수를 찾고 변수가 있다면 값을 대입한다.

### 컴파일러체

- LHS와 RHS
  - 여기서 L과 R은 각각 '왼쪽', '오른쪽'방향을 뜻한다. (여기서 방향은 대입 연산의 방향을 말한다.)
  - LHS 검색은 변수가 대입 연산자의 왼쪽에 있을 때 수행하고, RHS 검색은 변수가 대입 연산자의 오른쪽에 있을 때 수행한다.
  - RHS 검색은 단순히 특정 변수의 값을 찾는 것과 다를 바 없다. 반면, LHS 검색은 값을 넣어야 하므로 변수 컨테이너 자체를 찾는다.

```Javascript
// RHS
console.log(a);

// LHS
a = 2;

```

- console.log(a)는 a에 대한 RHS 참조다. 구문에서 a에 아무것도 대입하지 않기 때문이다.
- a = 2는 a에 대한 LHS 참조다. 현재 a 값을 신경 쓸 필요 없이 '= 2' 대입 연산을 수행할 대상 변수를 찾기 때문이다.
- 개념적으로 대입할 대상(LHS)과 대입한 값(RHS)라고 생각하는 것이 낫다.

```Javascript

function foo(a) {
  console.log(a); // 2
}
foo (2);

```

- 마지막 줄에서 foo() 함수를 호출하는 데 RHS 참조를 사용한다. 즉, 가서 foo의 값을 찾아 내게 가져와라라는 뜻이다. 여기서 ()는 실행된다는 뜻이므로 foo는 함수여야 한다.
- 인수로 값 2를 함수 foo()에 넘겨줄 때, 값 2를 인자 a에 대입하는 연산이 일어난다. 이(내재된) 인자 a에 대한 대입 연산을 위해 LHS 검색이 수행된다.
- 변수 a에 대한 RHS 참조 역시 수행되는데, 그 결괏값은 console.log() 함수에 넘겨진다. 또 console.log()가 실행되려면 참조가 필요하다.
  console 객체를 RHS 검색하여 log 메서드가 있는지 확인한다.
- 마지막으로 구현된 log()내부에는 인자가 있을 것이고, 첫번째 인자를 LHS 검색으로 찾아 2를 대입하며 마무리 된다.

### 중첩 스코프

- 하나의 블록이나 함수는 다른 블록이나 함수 안에 중첩될 수 있으므로 스코프도 다른 스코프 안에 중첩될 수 있다.
  따라서, 대상 변수를 현재 스코프에서 발견하지 못하면 엔진은 다음 바깥의 스코프로 넘어가는 식으로 변수를 찾거나 글로벌 스코프라 부르는 가장 바깥 스코프에 도달할 때까지 계속한다.

```Javascript

function foo(a) {
  console.log( a + b );

}
var b = 2;
foo(2); // 4

```

- b에 대한 RHS 참조는 함수 foo 안에서 처리할 수 없고, 함수를 포함하는 스코프에서 처리한다.
- 중첩 스코프를 찾을 때 사용하는 간단한 규칙
  1. 엔진은 현재 스코프에서 변수를 찾기 시작하고, 찾지 못하면 한 단계씩 올라간다.
  2. 최상위 글로벌 스코프에 도달하면 변수를 찾았든, 못 찾았든 검색을 멈춘다.

### 오류

```Javascript

function foo(a) {
  console.log(a + b);
  b = a;
}

foo(2);

```

- LHS와 RHS를 구분하는 것은 중요하다. 이 두 종류의 검색 방식은 변수가 아직 선언되지 않았을 때 서로 다르게 동작하기 때문
  - b에 대한 첫 RHS 검색이 실패하면 다시는 b를 찾을 수 없다.
    - 이렇게 스코프에서 찾지 못한 변수는 '선언되지 않은 변수'라 한다. ReferenceError
  - 반면, 엔진이 LHS 검색을 수행하여 변수를 찾지 못하고 최상위 층에 도착할 때 프로그램이 'Strict Mode'로 동작하고 있는 것이 아니라면,
    글로벌 스코프는 엔진이 검색하는 이름을 가진 새로운 변수를 생성해서 엔진에게 넘겨준다.
    - 만약 Strict Mode라면 글로벌 변수를 자동으로 또는 암시적으로 생성할 수 없다. (마찬가지로 ReferenceError)
  - ReferenceError와 TypeError
    - ReferenceError : 스코프에서 대상을 찾았는지와 관계있음
    - TypeError : 스코프 검색은 성공했으나 결괏값을 가지고 적합하지 않거나 불가능한 시도를 한 경우를 의미

### 정리

- 스코프는 어디서 어떻게 변수를 찾는가를 결정하는 규칙의 집합
- 변수를 검색하는 이유는 변수에 값을 대입하거나 (LHS 참조) 변수의 값을 얻어오기 위해서다. (RHS 참조)
  - LHS 참조는 대입 연산 과정에서 일어난다. 스코프와 관련된 대입 연산은 '=' 연산자가 사용되거나 인자를 함수의 인자로 넘겨줄 때 일어난다.
  - 자바스크립트 엔진은 코드를 실행하기 전에 먼저 컴파일하는데, 이 때, 엔진은 "var a = 2;"와 같은 구문을 독립된 두 단계로 나눈다.
    1. var a는 변수 a를 해당 스코프에 선언한다. 이 단계는 코드 실행 전에 처음부터 수행된다.
    2. a = 2는 변수 a를 찾아 값을 대입한다.
  - LHS와 RHS 참조 검색은 모두 현재 실행 중인 스코프에서 시작하며, 대상 변수를 찾지 못했을 경우 한 번에 한 스코프씩 중첩 스코프의 상위 스코프로 넘어가며 확인자를 찾는다.
  - 이 작업은 글로벌 스코프에 이를 때까지 계속하고 대상을 찾았든 못 찾았든 작업을 중단한다.

```Javascript

function foo(a) {
  var b = a;
  return a + b;
}

var c = foo(2);

```

- LHS 검색을 찾아보자 (=)
  - c =, b =, a = 2(암시적 인자 대입)
- RHS 검색을 찾아보자 (변수의 값)
  - foo(2), = a, a, b
