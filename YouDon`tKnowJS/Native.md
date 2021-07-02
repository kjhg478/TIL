## Native

- 자바스크립트에서 Native란 특정 환경에 종속되지 않은, ECMAScript 명세의 내장 객체를 말한다.

  - ex) Object, Math, Function, Array, Window, Button 중 네이티브가 아닌 것은 Window, Button 두 가지이다.
  - String
  - Number
  - Boolean
  - Array
  - Object
  - Function
  - RegExp
  - Date
  - Error
  - Symbol : ES6에서 추가

- 자바스크립트는 원시 값을 감싸는 객체 래퍼, 즉 네이티브를 제공한다.
- 객체 래퍼에는 타입별로 쓸 만한 기능이 구현되어 있어 편리하게 사용할 수 있다. ex) String.trim(), Array.concat()
- 'abc' 같은 단순 스칼라 원시 값이 있을 때, 이 값의 length 프로퍼티나 String.prototype에 정의된 메서드를 호출하면 자바스크립트는 자동으로 원시값을 '박싱'(해당되는 객체 래퍼로 감싸는 것)하여 필요한 프로퍼티와 메서드를 쓸 수 있게 도와준다.
