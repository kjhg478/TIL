## 함수 표현식 (Function Declaration)

- 자바스크립트는 함수를 특별한 종류의 값으로 취급합니다.

```Javascript

// 함수 선언문 (Function Declaration)
function sayHi() {
    alert("Hello");
}

// 함수 표현식 (Function Expression)
let sayHi = function() {
    alert("Hello");
};


```

- 함수를 생성하고 변수에 값을 할당하는 것처럼 함수가 변수에 할당되었습니다.
- 함수가 어떤 방식으로 만들어졌는지에 관계없이 함수는 값이고, 변수에 할당할 수 있습니다. 위 예시에선 함수가 변수 sayHi에 저장된 값
- 즉, 함수를 만들고 그 함수를 변수 sayHi에 할당하기
- 함수는 값이기 때문에 alert를 이용하여 함수 코드를 출력할 수도 있습니다.

```Javascript

function sayHi() {
    alert("Hello");
}

alert(sayHi); // 함수 코드가 보임

```

- 마지막 줄에서 sayHi 옆에 괄호가 없기 때문에 함수는 실행되지 않습니다.
- 자바스크립트는 괄호가 있어야만 함수가 호출됩니다.
- 자바스크립트에서는 함수가 값이기 때문에 값처럼 취급할 수 있습니다.

```Javascript

    function sayHi() { // 1. 함수 생성
        alert("Hello");
    }

    let func = sayHi; // 2. 함수 복사

    func(); // Hello 3. 복사한 함수를 실행 (정상적으로 실행됩니다.)
    sayHi(); // Hello   본래 함수도 정상적으로 실행됩니다.

```

- 값에 할 수 있는 일을 함수에도 할 수 있습니다.
- 변수를 복사해 다른 변수에 할당하는 것처럼 함수를 복사해 다른 변수에 할당할 수도 있습니다.
- 위 코드의 작동 방식

  1. (1)에서 함수 선언 방식을 이용해 함수를 생성합니다. 생성한 함수는 sayHi라는 변수에 저장됩니다.
  2. (2)에선 sayHi를 새로운 변수 func에 복사합니다. 이 때 sayHi 다음에 괄호가 없다는 점을 봅시다.
     괄호가 있었다면 func = sayHi()가 되어 sayHi 함수 그 자체가 아니라, 함수 호출 결과 (함수의 반환 값)가 func에 저장됐을 겁니다.
  3. 이젠 sayHi()와 func()로 함수를 호출할 수 있게 되었습니다.

- 콜백 함수, 콜백

  ```Javascript
      // way 1
      function ask(question, yes, no) {
          if (confirm(question)) yes()
          else no();
      }

      function showOk() {
          alert( "동의하셨습니다." );
      }

      function showCancel() {
          alert( "취소 버튼을 누르셨습니다." );
      }

      // 사용법: 함수 showOk와 showCancel가 ask 함수의 인수로 전달됨
      ask("동의하십니까?", showOk, showCancel);

      // way 2
      function ask(question, yes, no) {
          if (confirm(question)) yes()
          else no();
      }

      ask(
      "동의하십니까?",
      function() { alert("동의하셨습니다."); },
      function() { alert("취소 버튼을 누르셨습니다."); }
      );
  ```

  - 함수의 ask의 인수, showOk와 showCancle은 콜백 함수 또는 콜백이라고 불립니다.
  - 함수를 함수의 인수로 전달하고, 필요하다면 인수로 전달한 그 함수를 나중에 호출(called back)하는 것이 콜백함수의 개념입니다.
  - way2는 ask 안에 함수가 선언되었습니다. 이렇게 이름 없이 선언한 함수는 익명 함수(anonymous function)라고 부릅니다.
    - 익명 함수는 (변수에 할당된 게 아니기 때문에) ask 바깥에선 접근할 수 없습니다.

### 함수는 **동작**을 나타내는 값입니다.

    - 문자열이나 숫자 등의 일반적인 값들은 데이터를 나타냅니다.
    - 함수는 하나의 동작(action)을 나타냅니다.
    - 동작을 대변하는 값인 함수를 변수간 전달하고, 동작이 필요할 때 이 값을 실행할 수 있습니다.

- 함수 표현식 vs 함수 선언문

  1. 문법
     - 함수 선언문 : 함수는 주요 코드 흐름 중간에 독자적인 구문 형태로 존재합니다.
     - 함수 표현식 : 함수는 표현식이나 구문 구성(syntax construct) 내부에 생성됩니다. 할당 연산자 =을 이용해 만든 할당 표현식이 우측에 생성
     ```Javascript
         // 함수 선언문
         function sum(a, b) {
             return a + b;
         }
         // 함수 표현식
         let sum = function(a, b) {
             return a + b
         }
     ```
  2. 자바스크립트 엔진이 언제 함수를 생성하는지

     - 함수 표현식은 실제 실행 흐름이 해당 함수에 도달했을 때 함수를 생성합니다. 따라서 실행 흐름이 함수에 도달했을 때부터 해당 함수를 사용할 수 있습니다.
     - 함수 선언문은 함수 선언문이 정의되기 전에도 호출할 수 있습니다. (전역 함수 선언문을 스크립트 어디에 있느냐에 상관없이 사용할 수 있는 이유)

     ```Javascript
         // way 1
         sayHi("John"); // Hello, John

         function sayHi(name) {
             alert( `Hello, ${name}` );
         }

         // way 2
         sayHi("John"); // error!

         let sayHi = function(name) {
             alert( `Hello, ${name}` );
         };
     ```

     - way 1 : 함수 선언문, sayHi는 스크립트 실행 준비 단계에서 생성되기 때문에, 스크립트 내 어디에서든 접근 가능
     - way 2 : 함수 표현식으로 정의한 함수는 함수가 선언되기 전에 접근하는게 불가능합니다.

  3. 스코프

     - 엄격 모드에서 함수 선언문이 코드 블록 내에 위치하면 해당 함수는 블록 내 어디서든 접근할 수 있습니다.
       하지만 블록 밖에서는 함수에 접근하지 못합니다.

     ```Javascript
         // way 1
         let age = prompt("나이를 알려주세요.", 18);

         // 조건에 따라 함수를 선언함
         if (age < 18) {
             function welcome() {
                 alert("안녕!");
             }

             } else {

             function welcome() {
                 alert("안녕하세요!");
             }
         }

         // 함수를 나중에 호출합니다.
         welcome(); // Error: welcome is not defined

         // way 2
         let age = 16; // 16을 저장했다 가정합시다.

         if (age < 18) {
             welcome();               // \   (실행)
                                     //  |
             function welcome() {     //  |
                 alert("안녕!");        //  |  함수 선언문은 함수가 선언된 블록 내
             }                        //  |  어디에서든 유효합니다
                                     //  |
             welcome();               // /   (실행)

             } else {

             function welcome() {
                 alert("안녕하세요!");
             }
         }
         // 여기는 중괄호 밖이기 때문에
         // 중괄호 안에서 선언한 함수 선언문은 호출할 수 없습니다.

         welcome(); // Error: welcome is not defined

         // way 3
         let age = prompt("나이를 알려주세요.", 18);

         let welcome;

         if (age < 18) {
             welcome = function() {
                 alert("안녕!");
             };

             } else {

             welcome = function() {
                 alert("안녕하세요!");
             };
         }
         welcome(); // 제대로 동작합니다.

         // way 4
         let age = prompt("나이를 알려주세요.", 18);
         let welcome = (age < 18) ?
             function() { alert("안녕!"); } :
             function() { alert("안녕하세요!"); };

         welcome(); // 제대로 동작합니다.
     ```

  4. 결론
     - 함수 선언문을 이용해 함수를 선언하는 걸 먼저 고려하자
     - 함수 선언문으로 함수를 정의하면, 함수가 선언되기 전에 호출 할 수 있어서 코드 구성을 좀 더 자유롭게 가능 (가독성도 좋아진다.)

### 정리하기

    - 함수는 값입니다. 따라서 함수도 값처럼 할당, 복사, 선언할 수 있습니다.
    - 함수 선언(문) 방식으로 함수를 생성하면, 함수가 독립된 구문 형태로 존재하게 됩니다.
    - 함수 표현식 방식으로 함수를 생성하면, 함수가 표현식의 일부로 존재하게 됩니다.
    - 함수 선언문은 코드 블록이 실행되기도 전에 처리됩니다. 따라서 블록 내 어디서든 활용 가능합니다.
    - 함수 표현식은 실행 흐름이 표현식에 다다랐을 때 만들어집니다.

- 출처: https://ko.javascript.info/function-expressions
