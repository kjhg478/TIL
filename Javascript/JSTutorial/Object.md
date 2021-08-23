## JSON과 Object

- JSON

  - JSON(JavaScript Object Notation)은 값이나 객체를 나타내주는 범용 포맷이다.
  - JSON은 자바스크립트에서 사용할 목적으로 만들어진 포맷이지만, 라이브러리를 사용하면 자바스크립트가 아닌 언어에서도 JSON을 충분히 다룰 수 있다.
  - 데이터 교환 목적 등
  - JSON.stringify : 객체를 JSON으로 바꿔준다.
  - JSON.parse : JSON을 객체로 바꿔준다.

- keys(), values(), entries()

  - map
  - set
  - array

- Object.keys, values, entries
  - Object.keys(obj) : 객체의 키만 담은 배열을 반환한다.
  - Object.values(obj) : 객체의 값만 담은 배열을 반환환다.
  - Object.entries(obj) : [키, 값] 쌍을 담은 배열을 반환한다.

#### 참조에 의한 객체 복사

- 객체와 원시 타입의 근본적인 차이 중 하나는 객체는 '참조에 의해(by reference)' 저장되고 복사된다는 것
- 원시값(문자열, 숫자, 불린 값)은 '값 그대로' 저장, 할당되고 복사된다.

```Javascript

let message = "Hello!";
let phrase = message;

```

- 객체의 동작방식
  - 변수에 객체가 그대로 저장되는 것이 아니라, 객체가 저장되어있는 '메모리 주소'인 객체에 대한 '참조 값'이 저장된다.

```Javascript

let user = {
  name: "Jhon"
};

```

- 객체는 메모리 내 어딘가에 저장되고, 변수 user엔 객체를 '참조'할 수 있는 값이 저장된다.
  따라서, 객체가 할당된 변수를 복사할 땐 객체의 참조 값이 복사되고 객체는 복사되지 않습니다.

```Javascript

// 1.
let user = {
  name: "Jhon"
};

let admin = user; // 참조값을 복사함


// 2.
let user = { name: 'John' };
let admin = user;

admin.name = 'Pete'; // 'admin' 참조 값에 의해 변경됨
alert(user.name); // 'Pete'가 출력됨. 'user' 참조 값을 이용해 변경사항을 확인함

```

- 변수는 두 개이지만 각 변수엔 동일 객체에 대한 참조 값이 저장된다.
- 객체에 접근하거나 객체를 조작할 땐 여러 변수를 사용할 수 있다.

#### 정리

- 객체는 참조에 의해 할당되고 복사됩니다. 변수엔 '객체' 자체가 아닌 메모리상의 주소인 '참조'가 저장됩니다.
  따라서 객체가 할당된 변수를 복사하거나 함수의 인자로 넘길 땐 객체가 아닌 객체의 참조가 복사됩니다.

- 복사된 참조를 이용한 모든 작업(프로퍼티 추가, 삭제 등)은 동일한 객체를 대상으로 이뤄집니다.
- 객체의 '진짜 복사본'을 만드려면 '얕은 복사'를 가능하게 해주는 Object.assign이나 '깊은 복사'를 가능하게 해주는 \_cloneDeep(obj)를 사용하면 됩니다.
  (자바스크립트 라이브럴 lodash 메서드로 깊은 복사 처리 가능)
