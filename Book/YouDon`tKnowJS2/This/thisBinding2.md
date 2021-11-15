## this

- 바인딩

3. 명시적 바인딩

   - 암시적 바인딩에선 함수 레퍼런스를 객체에 넣기 위해 객체 자신을 변형해야 했고 함수 레퍼런스 프로퍼티를 이용하여 this를 간접적으로(암시적으로) 바인딩 했다.
   - 함수 레퍼런스 프로퍼티를 객체에 더하지 않고 어떤 객체를 this 바인딩에 이용할 수 있을까?
   - 이럴 때 '모든' 자바스크립트 함수가 함께 사용할 수 있는 아주 적당한 유틸리티가 있는데 바로 **call()**과 **apply()** 메서드다.
   - Function.prototype.call()의 두 번째 이후 인자들은 호출된 함수에 차례로 전달되며 Function.prototype.apply()는 이 인자를 배열 형태로 전달
   - Ex) foo.call(obj, '인자1', '인자2', ...); / foo.apply(obj, ['인자1', '인자2', ...]);

     ```Javascript
         function foo() {
             console.log(this.a);
         }

         var obj = {
             a: 2
         };

         foo.call(obj); // 2

     ```

     - 두 메서드는 this에 바인딩 할 객체를 첫째 인자로 받아 함수 호출 시 이 객체를 this로 세팅한다.
     - this를 지정한 객체로 직접 바인딩 하므로 이를 '명시적 바인딩'이라고 한다.
     - foo.call()에서 명시적으로 바인딩 하여 함수를 호출하므로 this는 반드시 obj가 된다.
     - 객체 대신 단순 원시 값(문자열, 불린, 숫자)을 인자로 전달하면 원시 값에 대응되는 객체(각각 new String(), new Boolean(), new Number()) 로 래핑된다.
       아 과정을 박싱이라고 한다.
     - 그러나, 이렇게 명시적으로 바인딩 해도 앞에서 언급한 this 바인딩이 도중에 소실되거나 프레임워크가 임의로 덮어써 버리는 문제는 해결할 수 없다.

     - 하드 바인딩

     ```Javascript

         function foo() {
             console.log(this.a);
         }

         var obj = {
             a: 2
         };

         var bar = function() {
             foo.call(obj);
         };

         bar(); // 2
         setTimeout(bar, 100); // 2

         // 하드 바인딩 된 'bar'에서 재정이 된 this는 의미 없다.
         bar.call(window); // 2

     ```

     - 함수 bar()는 내부에서 foo.cal(obj)로 foo를 호출하면서 obj를 this에 강제로 바인딩 하도록 하드 코딩한다.
     - 따라서, bar를 어떻게 호출하든 이 함수는 항상 obj를 바인딩 하여 foo를 실행한다. 이런 바인딩은 명시적이고 강력해서 '하드 바인딩'이라고 한다.

     - 하드 바인딩으로 함수를 감싸는 형태의 코드는 다음과 같이 인자를 넘기고 반환 값을 돌려받는 창구가 필요할 때 주로 쓰임

     ```Javascript
         function foo(something) {
             console.log(this.a, something);
             return this.a + something;
         }

         var obj = {
             a: 2
         };

         var bar = function() {
             return foo.apply(obj, arguments);
         };

         var b = bar(3); // 2 3
         console.log(b); // 5

     ```

     - 재사용 가능한 헬퍼 함수를 쓰는 것도 같은 패턴이다.

     ```Javascript

         function foo(something) {
             console.log(this.a, something);
             return this.a + something;
         }

         // 간단한 bind 헬퍼

         function bind(fn, obj) {
             return function() {
                 return fn.apply(obj, arguments);
             };
         }

         var obj = {
             a: 2
         };

         var bar = bind(foo, obj);

         var b = bar(3); // 2 3
         console.log(b); // 5

     ```

     - 하드 바인딩은 매우 자주쓰는 패턴이다.

     ```Javascript
         function foo(something) {
             console.log(this.a, something);
             return this.a + something;
         }

         var obj = {
             a: 2
         };

         var bar = foo.bind(obj);

         var b = bar(3); // 2, 3
         console.log(b); // 5

         // bind()는 주어진 this 콘텍스트로 원본 함수를 호출하도록 하드 코딩된 새 함수를 반환한다.

     ```

4. new 바인딩

   - 네 번째 바인딩 규칙을 설명하려면 먼저 자바스크립트 함수와 객체에 대한 오해를 바로잡자.
   - 전통적인 클래스 지향(Class-Oriented) 언어의 생성자는 클래스에 붙은 특별한 메서드로, 다음과 같이 클래스 인스턴스 생성 시 new 연산자로 호출된다.
     something = new MyClass();
   - 사실 자바스크립트에서 new는 의미상 클래스 지향적인 기능과 아무 상관이 없다.

   - 먼저 자바스크립트에서 생성자의 정의를 내려보자

     - 자바스크립트 생성자는 앞에 new 연산자가 있을 때 호출되는 일반 함수에 불과하다.\*\*
     - 클래스에 붙은 것도 아니고 클래스 인스턴스화 기능도 없다. 심지어 특별한 형태의 함수도 아니다.
     - 단지 new를 사용하여 호출할 때 자동으로 붙들려 실행되는 그저 평범한 함수다.

   - Number 생성자
     - new 표현식의 일부로 호출 시 Number는 생성자이며 새로 만들어진 객체를 초기화 한다.
     - Number() 같은 부류의 내장 객체 함수는 물론이고 상당수의 옛 함수는 앞에 new를 붙여 호출할 수 있고 이는 결국 **생성자 호출**이나 다름없다.
     - **생성자 함수**가 아니라(실제로 이런건 없다) 함수를 생성하는 호출이라고 해야 옳다.
     - 앞에 new를 붙여 생성자 호출을 하면 다음과 같은 일들이 일어난다.
       1. 새 객체가 만들어진다.
       2. 새로 생성된 객체의 [[prototype]]이 연결된다.
       3. 새로 생성된 객체는 해당 함수 호출 시 this로 바인딩 된다.
       4. 이 함수가 자신의 또 다른 객체를 반환하지 않는 한 new와 함께 호출된 함수는 자동으로 새로 생성된 객체를 반환한다.

   ```Javascript
      function foo(a) {
          this.a = a;
      }
      var bar = new foo(2);
      console.log(bar.a); // 2

   ```

   - 앞에 new를 붙여 foo()를 호출했고 새로 생성된 객체는 foo 호출 시 this에 바인딩 된다.
   - 따라서 결국 new는 함수 호출 시 this를 새 객체와 바인딩 하는 방법이며 이것이 **new 바인딩**이다.
