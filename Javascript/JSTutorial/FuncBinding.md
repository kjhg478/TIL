## FunctionBinding (함수 바인딩)

- 함수 바인딩
  - setTimeout에 메서드를 전달할 때 처럼, 객체 메서드를 콜백으로 전달할 때 'this 정보가 사라지는' 문제가 발생

```Javascript

let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

// 1.
setTimeout(user.sayHi, 1000); // Hello, undefined!

// 2. 1, 2가 같음
let f = user.sayHi;
setTimeout(f, 1000); // user 컨텍스트를 잃어버림

```

- 이렇게 undefined가 되는 이유는 setTimeout 객체에서 분리된 함수인 user.sayHi가 전달되기 때문
- 브라우저 환경에서 setTimeout은 인수로 전달받은 함수를 호출할 때, this에 window를 할당
  즉, this.firstName은 window.firstName이 됨

- 해결방법

  1. 래퍼

  ```Javascript
      // way 1.
      let user = {
      firstName: "John",
      sayHi() {
          alert(`Hello, ${this.firstName}!`);
      }
      };

      setTimeout(function() {
      user.sayHi(); // Hello, John!
      }, 1000);
      // 외부 렉시컬 환경에서 user를 받아 보통 때 처럼 메서드를 호출했기 때문에 정상 작동

      // way 2.
      let user = {
      firstName: "John",
      sayHi() {
          alert(`Hello, ${this.firstName}!`);
      }
      };

      setTimeout(() => user.sayHi(), 1000);

      // 1초가 지나기 전에 user의 값이 바뀜
      user = { sayHi() { alert("또 다른 사용자!"); } };

      // setTimeout에 또 다른 사용자!
  ```

  2. bind

     - 모든 함수는 this를 수정하게 해주는 내장 메서즈 bind를 제공
     - func.bid(context)는 함수처럼 호출 가능한 '특수 객체'를 반환한다. 이 객체를 호출하면 this가 context로 고정된 함수 func가 반환

     ```Javascript
     // way 1
     let user = {
     firstName: "John"
     };

     function func() {
     alert(this.firstName);
     }

     let funcUser = func.bind(user);
     funcUser(); // John

     // way 2
     let user = {
     firstName: "John"
     };

     function func(phrase) {
     alert(phrase + ', ' + this.firstName);
     }

     // this를 user로 바인딩합니다.
     let funcUser = func.bind(user);

     funcUser("Hello"); // Hello, John (인수 "Hello"가 넘겨지고 this는 user로 고정됩니다.)

     // way 3 - 객체 메서드에 bind 적용
     let user = {
     firstName: "John",
     sayHi() {
         alert(`Hello, ${this.firstName}!`);
     }
     };

     let sayHi = user.sayHi.bind(user); // (*)

     // 이제 객체 없이도 객체 메서드를 호출할 수 있습니다.
     sayHi(); // Hello, John!

     setTimeout(sayHi, 1000); // Hello, John!

     // 1초 이내에 user 값이 변화해도
     // sayHi는 기존 값을 사용합니다.
     user = {
     sayHi() { alert("또 다른 사용자!"); }
     };

     // way 4
     let user = {
     firstName: "John",
     say(phrase) {
         alert(`${phrase}, ${this.firstName}!`);
     }
     };

     let say = user.say.bind(user);

     say("Hello"); // Hello, John (인수 "Hello"가 say로 전달되었습니다.)
     say("Bye"); // Bye, John ("Bye"가 say로 전달되었습니다.)
     ```
