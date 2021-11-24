## this

- 참조 : 객체의 실제 위치를 가리키는 포인터

```Javascript

// way 1
function identify() {
    return this.name.toUpperCase();
}

function speak() {
    var greeting = "Hello, I`m " + identify.call(this);
    console.log(greeting);
}

var me = {
    name : "Kely"
};

var you = {
    name: "Reader"
};

identify.call(me); // KYLE
identify.call(you); // READER

speak.call(me); // Hello, I`m KYLE
speak.call(you); // Hello, I`m READER


// way 2
function identify() {
    return context.name.toUpperCase();
}

function speak() {
    var greeting = "Hello, I`m " + identify.call(context);
    console.log(greeting);
}

var me = {
    name : "Kely"
};

var you = {
    name: "Reader"
};

identify(you); // READER
speak(me); // Hello, I`m KYLE

```

- this
  - this가 함수 그 자체를 가리킨다?
  - 함수가 내부에서 자기 자신을 가리킬 일이 있을지 생각해보자
    - 재귀로직이 들어가는 경우도 있고 최초 호출 시 이벤트에 바인딩 된 함수 자신을 언바인딩 할 때도 자기 참조가 필요하다.
  - 자 다음 코드를 보자.

```Javascript

function foo(num) {
    console.log("foo: " + num);

    // "foo"가 몇 번 호출됐는지 추적한다.
    this.count++;
}

foo.count = 0;

var i;

for(i=0; i<10; i++) {
    if (i > 5) {
        foo(i);
    }
}

// foo: 6
// foo: 7
// foo: 8
// foo: 9

// console.log(foo.count); // 0 <-- ?
```

- console.log에 4번의 foo() 함수 호출 횟수가 표시됐는데 foo.count 값은 0이다.
- 이 때, 왜 this 참조가 이상하게 이루어졌을까? 라는 질문에 스스로 답을 찾지 않고 count 프로퍼티를 다른 객체로 옮기는 등의 우회책을 떠올린다.
  (내 얘기..)

```Javascript

function foo(num) {
    console.log("foo: " + num);

    // "foo"가 몇 번 호출됐는지 추적한다.
    data.count++;
}

var data = {
    count = 0
};

var i;

for(i=0; i<10; i++) {
    if (i > 5) {
        foo(i);
    }
}

// foo: 6
// foo: 7
// foo: 8
// foo: 9

// console.log(data.count); // 4 <-- ?

```

- 이렇게 해서 해결할 수 있지만 이러면 this가 뭔지, 작동 원리는 무엇인지 모른 채 렉시컬 스코프라는 장치의 내맡긴다.
- 함수가 내부에서 자신을 참조할 때 일반적으로 this만으로 부족하며 렉시컬 식별자를 거쳐 함수 객체를 참조한다.

```Javascript

function foo() {
    foo.count = 4; // 'foo'는 자기 자신을 가리킨다.
}

setTimeout(function() {
    // 익명 함수(이름이 없는 함수)는 자기 자신을 가리킬 방법이 없다.
}, 10);

```

- foo 함수는 foo라는 함수명 자체가 내부에서 자신을 가리키는 레퍼런스로 쓰인다.
  하지만, setTimeout()에 콜백으로 전달한 함수는 이름 식별자가 없으므로 함수 자신을 참조할 방법이 없다.

```Javascript

// way 1 - this 없이 함수 객체 레펄런스로 foo 식별자를 대신 사용
function foo(num) {
    console.log("foo: " + num);

    // "foo"가 몇 번 호출됐는지 추적한다.
    foo.count++;
}

foo.count = 0;

var i;

for(i=0; i<10; i++) {
    if (i > 5) {
        foo(i);
    }
}

// foo: 6
// foo: 7
// foo: 8
// foo: 9

// console.log(foo.count); // 4

// way 2 - foo 함수 객체를 직접 가리키도록 강제하는 방법

function foo(num) {
    console.log("foo: " + num);

    // "foo"가 몇 번 호출됐는지 추적한다.
    // 참고: 'this'는 foo를 어떻게 호출하느냐에 따라 진짜 foo가 된다.
    this.count++;
}

foo.count = 0;

var i;

for(i=0; i<10; i++) {
    if (i > 5) {
        // 'call()'함수로 호출하므로 this는 확실히 함수 객체 foo 자신을 가리킨다.
        foo.call(foo, i);
    }
}

// foo: 6
// foo: 7
// foo: 8
// foo: 9

// console.log(foo.count); // 4

```

### 자신의 스코프 this

- this
  - this가 바로 함수의 스코프를 가리킨다는 말은 아주 흔한 오해다.
  - 분명한 사실은 this는 어떤 식으로도 함수의 렉시컬 스코프를 참조하지 않는다.

```Javascript

function foo() {
    var a = 2;
    this.bar();
}

function bar() {
    console.log(this.a);
}

foo(); // 참조 에러 : a는 정의되지 않았습니다. (ReferenceError: a is not defined);
```

- foo()와 bar()의 렉시컬 스코프 사이에 연결 통로를 만들어 bar()가 foo()의 내부 스코프에 있는 변수 a에 접근하게 하려고 했다.
- 그런 연결 통로는 없으며, 렉시컬 스코프 안에 있는 뭔가를 this 레퍼런스로 참조하기란 애당초 가능 하지 않다.

- this와 렉시컬 스코프 참조가 헷갈린다면?
  - 둘의 연결 통로 따윈 없다.

### 그럼 this란?

- **this**는 작성 시점이 아닌 런타임 시점에 바인딩 되며 함수 호출 당시 상황에 따라 콘텍스트가 결정된다.
  - 함수 선언 위치와 상관없이 this 바인딩은 오로지 어떻게 함수를 호출했느냐에 따라 달라진다.
  - 어떤 함수를 호출하면 활성화 레코드, 즉 실행 콘텍스트가 만들어지는데 이 때, 함수가 호출된 근원(콜스택)과 호출 방법, 전달된 인자 등의 정보가 담겨있다.
  - **this** 레퍼런스는 구 중 하나로, 함수가 실행되는 동안 이용할 수 있다.
  - this를 제대로 이해하려면 this가 함수 자신이나 함수의 렉시컬 스코프를 가리키는 레퍼런스가 아니라는 점을 인지하자 !
