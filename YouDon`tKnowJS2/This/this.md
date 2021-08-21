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
