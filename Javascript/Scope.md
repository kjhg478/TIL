## Scope

- Scope : 변수에 접근할 수 있는 범위

  - Global
  - Function
  - Block

- Hoisting : 자바스크립트에서 아직 선언되지 않은 함수 또는 변수를 끌어올려서 사용할 수 있는 자바스크립트 작동 방식 (피해야 함)

- Scope chain : 내부 함수에서는 외부함수의 변수에 접근 가능하지만 외부 함수에서는 내부 함수의 변수에 접근할 수 없다.
  그리고 모든 함수들은 전역 객체에 접근할 수 있다.
  즉, 꼬리를 물고 계속 범위를 넓히면서 찾는 관계를 스코프 체인이라고 한다.

```Javascript
var name = 'zero';
function outer() {
  console.log('외부', name);
  function inner() {
    var enemy = 'nero';
    console.log('내부', name);
  }
  inner();
}
outer();
console.log(enemy); // undefined

```

- Lexical Scope : 함수를 어디서 선언하였는지에 따라 상위 스코프를 결정하는 것
  - 좀 더 자세히 말하면 함수를 처음 선언하는 순간, 함수 내부의 변수는 자기 스코프로부터 가장 가까운 곳(상위 범위에서)에 있는 변수를 계속 참조하게 됩니다.
  - 아래 예시에서는 log 함수 안의 name 변수는 선언 시 가장 가까운 전역변수 name을 참조하게 됩니다.
  - 그래서 wrapper 안에서 log를 호출해도 지역변수 name='nero'를 참조하는게 아니라 전역변수 name 값이 나오게 되는겁니다.

```Javascript
var name = 'zero';
function log() {
  console.log(name);
}

function wrapper() {
  name = 'nero';
  log();
}
wrapper(); // nero

var name = 'zero';
function log() {
  console.log(name);
}

function wrapper() {
  var name = 'nero';
  log();
}
wrapper(); // zero

```

[참조링크](https://www.zerocho.com/category/JavaScript/post/5740531574288ebc5f2ba97e)
