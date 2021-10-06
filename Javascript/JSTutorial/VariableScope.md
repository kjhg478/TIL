# 변수의 유효범위와 클로저

#### 변수의 유효범위

    - 자바스크립트는 함수 지향 언어입니다.
    - 함수를 동적으로 생성할 수 있고, 생성한 함수를 다른 함수에 인수로 넘길 수 있으며, 생성된 곳이 아닌 곳에서 함수를 호출할 수도 있기 때문입니다.
    - 함수 내부에서 외부에 있는 변수에 접근할 수 있다는 사실도 알고 있습니다.
    - 그런데 함수가 생성된 이후에 외부 변수가 변경되면 어떤일이 발생할까요? 함수는 새로운 값을 가져올까요? 아니면 생성 시점 이전의 값을 가져올까요?
    - 매개변수를 통해 함수를 넘기고 이 함수를 저 멀리 떨어진 코드에서 호출할 땐 어떤일이 발생할까요? 함수는 호출되는 곳을 기준으로 외부 변수에 접근할까요?

#### 코드 블록

- 코드 블록 안에서 선언한 변수는 블록 안에서만 사용할 수 있습니다.

```Javascript
    {
        // 지역 변수를 선언하고 몇 가지 조작을 했지만 그 결과를 밖에서 볼 수 없습니다.

        let message = "안녕하세요."; // 블록 내에서만 변숫값을 얻을 수 있습니다.

        alert(message); // 안녕하세요.
    }

    alert(message); // ReferenceError: message is not defined
    // if for while 등에서도 마찬가지로
    if (true) {
        let phrase = "안녕하세요!";

        alert(phrase); // 안녕하세요!
    }

    alert(phrase); // ReferenceError: phrase is not defined
```

#### 중첩 함수

- 함수 내부에서 선언한 함수는 중첩함수라고 부릅니다.

```Javascript
    function sayHiBye(firstName, lastName) {
        // 헬퍼(helper) 중첩 함수
        function getFullName() {
            return firstName + " " + lastName;
        }

        alert("Hello, " + getFullName());
        alert("Bye, " + getFullName());
    }

```

- 위 예시에서 외부 변수에 접근해 이름 전체를 반환해주는 중첩 함수 getFullName()은 편의상 만든 함수입니다.
- 중첩함수는 새로운 객체의 프로퍼티 형태나 중첩 함수 그 자체로 반환될 수 있다는 점과 이렇게 반환된 중첩 함수는 어디서든 호출해 사용할 수 있습니다.
- 물론 이때도 외부 변수에 접근할 수 있다는 사실은 변함없습니다.

```Javascript
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2

```

- 자, 여기서 counter를 여러 개 만들었을 때, 이 함수들은 서로 독립적일까? 함수와 중첩 함수 내 count 변수엔 어떤 값이 할당될까?라는 의문이 듭니다.
- 이러한 시나리오를 통해 시작해봅시다!

#### 렉시컬 환경

1. 변수

   - 자바스크립트에선 실행 중인 함수, 코드 블록, {...}, 스크립트 전체는 렉시컬 환경이라 불리는 내부 숨김 연관 객체를 갖습니다.
   - 렉시컬 환경 객체
     1. 환경 레코드 - 모든 지역 변수를 프로퍼티로 저장하고 있는 객체입니다. this 값과 같은 기타 정보도 여기에 저장됩니다.
     2. 외부 렉시컬 환경에 대한 참조 - 외부 코드와 연관됨
   - 변수는 특수 내부 객체인 환경 레코드의 프로퍼티일 뿐입니다. '변수를 가져오거나 변경'하는 것은 환경 레코드의 프로퍼티를 가져오거나 변경함을 의미

   ```Javascript
       let phrase = "Hello";
       alert(phrase);

       // Lexical Environment
       // phrase: "Hello" --> null

   ```

   - 이렇게 스크립트 전체와 관련된 렉시컬 환경은 **전역 렉시컬 환경**이라고 합니다.
   - 위 코드에서 phrase: "Hello" 변수가 저장되는 이 녀석은 환경 레코드를 나타내고 화살표는 외부 렉시컬 환경에 대한 참조를 나타냅니다.
   - 전역 렉시컬 환경은 외부 참조를 갖지 않기 때문에 화살표가 null을 가리키는 걸 확인 할 수 있습니다.

   ```Javascript
       // execution start - phrase: <uninitialized> --> null
       let phrase; - phrase: undefined
       phrase = "Hello"; - phrase: "Hello"
       phrase = "Bye"; - phrase: "Bye

   ```

   1. 스크립트가 시작되면 스크립트 내에서 선언한 변수 전체가 렉시컬 환경에 올라갑니다,
      - 이 때, 변수의 상태는 특수 내부 상태인 'uninitialized'가 됩니다.
        자바스크립트 엔진은 uninitialized 상태의 변수를 인지하긴 하지만, let을 만나기 전까진 이 변수를 참조할 수 없습니다.
   2. let phrase를 만나 값을 할당하기 전까진 프로퍼티 값은 undefined입니다. phrase는 이 시점 이후부터 사용 할 수 있습니다.
   3. phrase에 값이 할당되었습니다.
   4. phrase의 값이 변경되었습니다.

   - 변수는 특수 내부 객체인 환경 레코드의 프로퍼티입니다. 환경 레코드는 현재 실행 중인 함수와 코드 블록, 스크립트와 연관되어 있습니다.
   - 변수를 변경하면 환경 레코드의 프로퍼티가 변경됩니다.
   - 렉시컬 환경은 명세서에서 자바스크립트가 어떻게 동작하는지 설명하는 데 쓰이는 '이론상의' 객체입니다. 코드를 사용해 직접 렉시컬 환경을 얻거나, 조작하는 것을 불가능!

#### 함수 선언문

- 함수는 변수와 마찬가지로 값입니다.
- 함수 선언문으로 선언한 함수는 일반 변수와는 달리 바로 초기화된다는 점에서 차이가 있습니다.
- 함수 선언문으로 선언한 함수는 렉시컬 환경이 만들어지는 즉시 사용이 가능. (변수는 let을 마나 선언이 될 때 까지 사용할 수 없다.)

```Javascript

    // execution start - phrase: <uninitialized> --> null
                      // say: function

    let phrase = "Hello";

    function say(name) {
        alert(`$(phrase), $(name)`);
    }

```

- 이런 동작 방식은 함수 선언문으로 정의한 함수에만 적용됩니다. let say = function(name)...같이 함수를 변수에 할당한 함수 표현식은 해당하지 않습니다.
