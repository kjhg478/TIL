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

#### 1. 렉시컬 환경

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

#### 2. 함수 선언문

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

#### 3. 내부와 외부 렉시컬 환경

- 함수를 호출해 실행하면 새로운 렉시컬 환경이 자동으로 만들어집니다. 이 렉시컬 환경엔 함수 호출 시 넘겨받은 매개변수와 함수의 지역 변수가 저장됩니다.
- say(John)을 호출하면 아래와 같은 내부 변화가 일어납니다.

```Javascript
    let phrase = "Hello";

    function say(name) {
        alert(`${phrase}, ${name}`);
    }

    /*
    Lexical Environment of the call
    --> : outer
    name: "John" --> say: function, phrase: "Hello" --> null
    */

    say(John); // Hello, John

```

- 함수가 호출 중인 동안엔 호출 중인 함수를 위한 내부 렉시컬 환경과 내부 렉시컬 환경이 가리키는 외부 렉시컬 환경을 갖게 됩니다.
  1. 내부 렉시컬 환경은 현재 실행 중인 함수인 say에 상응합니다. 내부 렉시컬 환경엔 함수의 인자인 name으로부터 유래한 프로퍼티 say(John)을 호출했기 때문에, name 값은 "John"이 됩니다.
  2. 위 코드의 외부 렉시컬 환경은 전역 렉시컬 환경입니다. 전역 렉시컬 환경은 phrase와 함수 say를 프로퍼티로 갖습니다.
- 그리고 내부 렉시컬 환경은 외부 렉시컬 환경에 대한 참조를 갖습니다.
- 코드에서 변수에 접근할 땐, 먼저 내부 렉시컬 환경을 검색 범위로 잡습니다. 내부 렉시컬 환경에서 원하는 변수를 찾지 못하면 검색 범위를 내부 렉시컬 환경이 참조하는 외부 렉시컬 환경으로 확장합니다.
  이 과정은 검색 범위가 전역 렉시컬 환경으로 확장될 때까지 반복됩니다.
  ![image](https://user-images.githubusercontent.com/31474272/136473040-f5f133d8-b5db-4c69-834a-425a7b6734fd.png)

#### 4. 함수를 반환하는 함수

```Javascript
    function makeCounter() {
        let count = 0;

        return function() { [[Environment]]
            return count++;
        };
    }

    let counter = makeCounter();

```

- makeCounter()를 호출하면 호출할 때마다 새로운 렉시컬 환경 객체가 만들어지고 여기에 makeCounter를 실행하는데 필요한 변수들이 저장됩니다.
- makeCounter()를 호출할 때도 두 개의 렉시컬 환경이 만들어집니다.
  ![image](https://user-images.githubusercontent.com/31474272/136473375-bb4937c5-70e6-4bf6-8ad3-332c74feecec.png)

- 그러나 이 예시는 3번에서 살펴본 say(John)와 차이점이 있습니다. makeCounter()가 실행되는 도중엔 본문 return count++라는 중첩 함수가 만들어집니다.
  현재는 중첩함수가 생성되기만 하고 실행은 되지 않은 상태입니다.
- 모든 함수는 함수가 생성된 곳의 렉시컬 환경을 기억한다는 점입니다. 함수는 [[Envirnoment]]라 불리는 숨김 프로퍼티를 갖는데, 여기에 함수가 만들어진 곳의 렉시컬 환경에 대한 참조가 저장됩니다.
- 따라서 counter.[[Environment]]엔 {count: 0}이 있는 렉시컬 환경에 대한 참조가 저장됩니다.
  호출 장소와 상관없이 함수가 자신이 태어난 곳을 기억할 수 있는 건 [[Environment]] 프로퍼티 덕분입니다. 이 프로퍼티는 함수가 생성될 때 딱 한 번 값이 세팅되고 영원히 변하지 않습니다.
  ![image](https://user-images.githubusercontent.com/31474272/136473907-003b0ab1-6f1c-4a3b-a94e-60ac162d96e6.png)
- 실행 흐름이 중첩 함수의 본문으로 넘어오면 count 변수가 필요한데, 먼저 자체 렉시컬 환경에서 변수를 찾습니다.
- 익명 중첩 함수엔 지역변수가 없기 때문에 이 렉시컬 환경은 비어있는 상황입니다.(<empty>) 이제 counter()의 렉시컬 환경이 참조하는 외부 렉시컬 환경에서 count를 찾아봅시다.
- 이제 count++이 실행되면서 count 값이 1 증가해야 하는데, **변숫값 갱신은 변수가 저장된 렉시컬 환경에서 이뤄집니다.**
- 실행이 종료된 후의 상태
  ![image](https://user-images.githubusercontent.com/31474272/136474066-52ea4dfe-555a-43f1-bc64-24c419102682.png)

- counter()를 여러 번 호출하면 count qustnrk 2, 3으로 증가하는 이유가 여기 있습니다.

#### 클로저

- 클로저는 외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수를 의미합니다.
- 자바스크립트에선 모든 함수가 자연스럽게 클로저가 됩니다.
- 자바스크립트의 함수는 숨김 프로퍼티인 [[Environment]]를 이용해 자신이 어디서 만들어졌는지를 기억합니다. 함수 본문에선 [[Environment]]를 사용해 외부 변수에 접근합니다.
- 클로저의 정의와 자바스크립트에서 왜 모든 함수가 클로지인지 관해 설명할 수 있어야 합니다. 이 때 [[Environment]] 프로퍼티와 렉시컬 환경이 어떤 방식으로 동작하는지에 대한 설명을 덧붙일 수 있어야 한다.
