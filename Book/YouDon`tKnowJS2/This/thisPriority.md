## this 확정규칙

- this 확정 규칙

  1. new로 함수를 호출(new바인딩)했는가? -> 맞으면 새로 생성된 객체가 this다.

  ```Javascript
      var bar = new foo();
  ```

  2. call과 apply로 함수를 호출(명시적 바인딩), bind 하드 바인딩 내부에 숨겨진 형태로 호출됐는가? -> 맞으면 명시적으로 지정된 객체가 this다.

  ```Javascript
      var bar = foo.call(obj2);
  ```

  3. 함수를 콘텍스트(암시적 바인딩), 즉 객체를 소유 또는 포함하는 형태로 호출했는가? -> 맞으면 바로 이 콘텍스트 객체가 this다.

  ```Javascript
      var bar = obj1.foo();
  ```

  4. 그 외의 경우에 this는 기본값(엄격 모드는 undefined, 비엄격 모드는 전역 객체)으로 세팅된다.(기본 바인딩)

  ```Javascript
      var bar = foo();
  ```

- 바인딩 예외

  - 특정 바인딩을 의도했는데 실제로 기본 바인딩 규칙이 적용되는 예외 사례

  1. this 무시

     - call, apply, bind 메서드에 첫 번째 인자로 null 또는 undefined를 넘기면 this 바인딩이 무시되고 기본 바인딩 규칙이 적용된다.

     ```Javascript
         function foo() {
             console.log(this.a);
         }
         var a = 2;
         foo.call(null); // 2

     ```

#### 정리하기

    - 함수 실행에 있어 this 바인딩은 함수의 직접적인 호출부에 따라 달라진다.
    - 일단 호출부를 식별한 후에 다음 4가지 규칙을 열거한 우선순위에 따라 적용한다
        1. new로 호출했다면 새로 생성된 객체로 바인딩 된다.
        2. call이나 apply 또는 bind로 호출됐다면 주어진 객체로 바인딩 된다.
        3. 호출의 주체인 콘텍스트 객체로 호출됐다면 바로 이 콘텍스트 객체로 바인딩 된다.
        4. 기본 바인딩에서 엄격 모드는 undefined, 그 밖엔 전역 객체로 바인딩 된다.

    - 실수로 예기치 않게 기본 바인딩 규칙이 적용되는 경우를 조심하자
    - ES6 화살표 함수는 표준 바인딩 규칙을 무시하고 렉시컬 스코프로 this를 바인딩 한다.
      즉, 함수 호출로부터 어떤 값이든 this 바인딩을 상속한다. ES6 이전 시절 self = this 구문을 대체한 장치다.
