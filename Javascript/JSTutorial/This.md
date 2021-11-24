## This

---

### this와 실행 컨텍스트

- 자바스크립트는 스크립트 언어로, 인터프리터에 의해 줄 단위로 읽혀서 해석된다.
- 인터프리터에 의해 현재 실행되는 자바스크립트의 환경을 실행 컨텍스트라고 한다.
  자바스크립트 내부에서 이러한 실행 컨택스트를 스택으로 관리하며, 실행되는 시점에 자주 변경되는 실행 컨텍스트를 this가 가리킨다.

- 즉, this는 현재 실행되는 코드의 실행 컨텍스트를 가리킨다.
- Function.prototype 객체의 메서드인 call, apply, bind를 통해 명시적으로 this를 바인딩해줄 수도 있다.

### Binding 종류

1. default

- 기본적으로 this는 전역 객체를 가리킨다.
- node환경에서는 global, 브라우저에서는 window 객체를 가리킨다.

2. 일반 함수 내부

- 일반적인 함수 내부에서 this를 호출하면 전역객체를 가리키는데, strict 모드를 사용하는 경우는 undefined 반환 (즉시 실행 함수도 포함)

3. 객체의 메소드 내부

- 객체 내부의 매소드 내부에서 this를 호출하면 해당 객체를 가리킨다.
- 만약, 메소드 내부에서 또 함수 내부에서 호출할 경우, 이는 함수 내부에서 호출한 것이 되어 전역객체를 가리키게 된다.

```Javascript
  var obj = {
    print: function() {
      console.log(this); // obj 객체

      var print2 = function() {
        console.log(this); // window 객체
      }
      print2();
    }
  }

  // 메소드 내부에서 this를 정의해준다.
  var obj = {
    print: function() {
      console.log(this); // obj 객체

      var _this = this;
      var print2 = function() {
        console.log(_this); // obj 객체
      }
      print2();
    }
  }

```

- 어떻게 호출하는지도 중요하다

```Javascript
var obj = {
    print: function() {
      console.log(this);
    }
}
var print = obj.print

obj.print();      // obj 객체
print();          // window 객체

```

- obj.print()의 경우 메소드 방식으로 호출하고 있으므로 객체 자신을 가리키게 되지만,
  print()의 경우 일반적인 함수 호출 방식으로 호출하고 있으므로 전역객체를 가리키게 된다.

4. 생성자 함수 내부

   - new 연산자로 생성자 함수를 호출할 때, 생성자 함수 내부에서 호출된 this는 생성자 함수를 통해 새로 생성되어 반환되는 객체를 가리킨다.

   ```Javascript
     var foo1="foo1"
     function print() {
         this.foo2 = "foo2"
         console.log(this.foo1, this.foo2)
     }
     print();                      // foo1 foo2
     var newPrint = new print();   // undefined "foo2"

   ```

   - 일반함수를 호출할 경우, this는 전역 객체를 가리키게 되므로 window 객체의 foo1과 foo2가 출력된다.
   - 반면 new로 선언할 경우, this는 전역 객체가 아닌 생성된 객체를 가리키게 되므로 foo1은 undefined로 나오게 된다.

- **this**는 작성 시점이 아닌 런타임 시점에 바인딩 되며 함수 호출 당시 상황에 따라 콘텍스트가 결정된다.
