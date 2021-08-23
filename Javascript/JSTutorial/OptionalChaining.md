## OptionalChaining (옵셔널 체이닝)

- 옵셔널 체이닝 ?.을 사용하면 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있다.

- 옵셔널 체이닝?
  - 사용자가 여러 명 있고 그 중 몇 명은 주소 정보를 가지고 있지 않은 경우

```Javascript

let user = {}; // 주소 정보가 없는 사용자

alert(user.address.street); // TypeError: Cannot read property 'street' of undefined

// querySelector(...) 호출 결과가 null인 경우 에러 발생
let html = document.querySelector('.my-element').innerHTML;

```

- ?. 추가 되기 전엔 && 연산자를 사용했다.

```Javascript

let user = {}; // 주소 정보가 없는 사용자

alert( user && user.address && user.address.street ); // undefined, 에러가 발생하지 않습니다.

```

- 옵셔널 체이닝
  - ?.은 ?. '앞'의 평가 대상이 undefined, null이면 평가를 멈추고 undefined를 반환한다.

```Javascript

// way 1
let user = {}; // 주소 정보가 없는 사용자

alert( user?.address?.street ); // undefined, 에러가 발생하지 않습니다.

// way 2
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined

```

- 옵셔널 체이닝은 사용해야 할 때를 구분해야 한다.

  - 존재하지 않아도 괜찮은 대상에만 사용
  - 위의 예시로 user는 반드시 있어야 하지만 address는 필수값이 아니기 때문에 사용
  - 선언이 완료된 변수를 정의한 이후에 사용 가능

- 단락평가
  - ?.는 왼쪽 평가대상에 값이 없으면 즉시 평가를 멈춘다. 이런 평가 방법을 단락 평가(short-circuit)라고 부른다.

#### 정리하기

- 옵셔널 체이닝 문법 ?.은 세 가지 형태로 사용할 수 있다.

  1. obj?.prop – obj가 존재하면 obj.prop을 반환하고, 그렇지 않으면 undefined를 반환함
  2. obj?.[prop] – obj가 존재하면 obj[prop]을 반환하고, 그렇지 않으면 undefined를 반환함
  3. obj?.method() – obj가 존재하면 obj.method()를 호출하고, 그렇지 않으면 undefined를 반환함

- ?.를 계속 연결해서 체인을 만들면 중첩 프로퍼티들에 안전하게 접근 가능
- ?.은 왼쪽 평가대상이 없어도 괜찮은 경우에만 선택적으로 사용
- 꼭 있어야 하는 값은데 없는 경우에 ?.을 사용하면 에러를 쉽게 찾을 수 없으므로 주의해야 함!

출처 : https://ko.javascript.info/optional-chaining
