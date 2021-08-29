## this

- 호출부
  - this 바인딩의 개념을 이해하려면 먼저 호출부, 즉 함수 호출(선언이 아님) 코드부터 확인하고 **this**가 가리키는 것을 찾아봐야 한다.
  - 호출부는 함수를 호출한 지점으로 돌아가면 확인할 수 있을 것 같지만 코딩 패턴에 따라 '진짜' 호출부가 어디인지 모호할 때가 많다.
    (나도 이런 경험이...)
  - 중요한 건 호출 스택 (현재 실행 지점에 오기까지 호출된 함수의 스택)을 생각해보는 것. 이 중 호출부는 현재 실행 중인 함수 '직전'의 호출 코드 '내부'에 있다.

```Javascript

function baz() {
    // 호출 스택: 'baz'
    // 따라서 호출부는 전역 스코프 냐부다.

    console.log('baz');
    bar(); // <- 'bar'의 호출부
}

function bar() {
    // 호출스택: 'baz' -> 'bar'
    // 따라서 호출부는 'baz' 내부다.

    console.log('bar');
    foo(); // 'foo'의 호출부
}

function foo() {
    // 호출 스택: 'baz' -> 'bar' -> 'foo'
    // 따라서 호출부는 'bar' 내부다.

    console.log('foo');
}

baz(); // 'baz'의 호출부

```

- 크롬 디버거 Tip : 42p

- 바인딩

  - 함수가 실행되는 동안 this가 무엇을 참조할지를 호출부가 어떻게 결정하는지 알아봐야 한다.
  - 호출부를 살펴보고 4가지 규칙 중 어느 것이 해당하는지 확인하는데 규칙을 먼저 살펴보자.

  1. 기본 바인딩

     - 첫 번째 규칙은 가장 평범한 함수 호출인 '단독 함수 실행'에 관한 규칙으로 나머지 규칙에 해당하지 않을 경우 적용되는 this의 기본 규칙이다.

       ```Javascript
        // 1. NON-strict MODE
        function foo() {
            console.log(this.a);
        }
        var a = 2;
        foo(); // 2

        // 2. strict MODE
        function foo() {
            "use strict";
            console.log(this.a);
        }
        var a = 2;
        foo(); // 타입 에러: 'this'는 'undefined'입니다.

        // 엄격 모드에서는 전역 객체가 기본 바인딩 대상에서 제외된다.

       ```

     - var a = 2처럼 전역 스코프에 변수를 선언하면 변수명과 같은 이름의 전역 객체 프로퍼티가 생성된다. (서로의 사본이 아니다.)
     - foo() 함수 호출 시 this.a는 전역 객체 a다. 기본 바인딩이 적용되어 this는 전역 객체를 참조한다.

  2. 암시적 바인딩

  - 두 번째 규칙은 호출부에 콘텍스트 객체가 있는지, 즉 객체의 소유/포함 여부를 확인하는 것

  ```Javascript

      function foo() {
          console.log(this.a);
      }

      var obj = {
          a: 2,
          foo: foo
      }

      obj.foo(); // 2

  ```

  - 앞에서 선언한 foo() 함수를 obj에서 프로퍼티로 참조하고 있다.
  - foo()를 처음부터 foo 프로퍼티로 선언하든 이 예제처럼 나중에 레퍼런스로 추가하든 obj 객체가 이 함수를 '소유'하거나 '포함'한 것은 아니다.
  - 그러나 호출부는 obj콘텍스트로 foo()를 참조하므로 obj객체는 함수 호출 시점에 함수의 레퍼런스를 '소유'하거나 '포함'한다고 볼 수 있다.
  - foo() 호출 시점에 이미 obj 객체 레퍼런스는 준비된 상태다.
    함수 레퍼런스에 대한 콘텍스트 객체가 존재할 때 **암시적 바인딩** 규칙에 따르면 바로 이 콘텍스트 객체가 함수 호출 시 this에 바인딩 된다.
  - foo 호출 시 obj는 this이니 this.a는 obj.a가 된다.

  ```Javascript

      function foo() {
          console.log(this.a);
      }

      var obj2 = {
          a: 42,
          foo: foo
      };

      var obj1 = {
          a: 2,
          obj2: obj2
      };

      obj1.obj2.foo(); // 42

      // 이 예제처럼 객체 프로퍼티 참조가 체이닝된 형태라면 최상위/최하위 수준의 정보만 호출부와 연관된다.

  ```

  - 암시적 소실

    - 암시적으로 바인딩 된 함수에서 바인딩이 소실되는 경우가 있다.

    ```Javascript

        function foo() {
            console.log(this.a);
        }

        var obj = {
            a: 2,
            foo: foo
        };

        var Bar = obj.foo; // 함수 레퍼런스/별명

        var a = "전역"; // 'a' 역시 전역 객체의 프로퍼티

        bar(); // "전역"

    ```

    - bar는 obj의 foo를 참조하는 변수처럼 보이지만 실은 foo를 직접 가리키는 또 다른 레퍼런스다.
      호출부에서 그냥 평범하게 bar()를 호출하므로 기본 바인딩이 적용된다.

    ```Javascript

        function foo() {
            console.log(this.a);
        }

        function doFoo(fn) {
            // 'fn'은 'foo'의 또 다른 레퍼런스일 뿐

            fn(); // <- 호출부
        }

        var obj {
            a: 2,
            foo: foo
        };

        var a = "전역"; // 'a' 전역 객체 프로퍼티
        doFoo(obj.foo); // "전역"

    ```

    - 인자로 전달하는 건 일종의 암시적인 할당이다. 함수를 인자로 넘기면 암시적으로 레퍼런스가 할당되어 결과가 같다.
    - 어떤 까닭으로 예기치 않게 this가 바뀌게 됐든 콜백 함수나 레퍼런스를 마음대로 통제할 수 없다. 각자의 입맛대로 호출부를 조정할 수도 없다.
    - 이제 this를 고정해 이 문제를 해결해보자!
