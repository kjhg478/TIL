## 모듈

```Javascript

function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];

    function doSomething() {
        console.log(something);
    }
    function doAnother() {
        console.log(another.join("!"));
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3

```

- 모듈
  - 이런 코드와 같은 자바스크립트 패턴을 **모듈**이라고 부른다.
  - 가장 흔한 모듈 패턴 구현 방법은 모듈 노출이고, 앞의 코드는 이것의 변형이다.
  - 함수 doSomething과 doAnother은(CoolModule()을 호출하면 얻을 수 있는) 모듈 인스턴스의 내부 스코프에 포함하는 클로저를 가진다.

```Javascript

// way1
var foo = (function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];

    function doSomething() {
        console.log(something);
    }
    function doAnother() {
        console.log(another.join("!"));
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
})();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3

// way2
function CoolModule(id) {
    function identify() {
        console.log(id);
    }

    return {
        identify: identify
    };
}

var foo1 = CoolModule( "foo1" );
var foo2 = CoolModule( "foo2" );

foo1.identify(); // foo1
foo2.identify(); // foo2

```

- 이 패턴에서는 약간 변경된 오직 하나의 인스턴스, 싱글톤만 생성하는 모듈이다.
- 앞의 코드에서 모듈 함수를 IIFE로 바꾸고 즉시 실행시켜 반환 값을 직접 하나의 모듈 인스턴스 확인자 foo에 대입시켰다.
- way2 에서 모듈은 함수이므로 인자를 받을 수 있다.

### 정리하기

- 클로저는 함수를 렉시컬 스코프 밖에서 호출해도 함수는 자신의 렉시컬 스코프를 기억하고 접근할 수 있는 특성을 의미한다.
- 모듈은 두 가지 특성을 가져야 한다.
  1. 최외곽 래퍼 함수를 호출하여 외곽 스코프를 생성한다.
  2. 래핑 함수의 반환 값은 반드시 하나 이상의 내부 함수 참조를 가져야 하고, 그 내부 함수는 래퍼의 비공개 내부 스코프에 대한 클로저를 가져야 한다.
