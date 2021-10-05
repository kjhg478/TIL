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
