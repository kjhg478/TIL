## ScopeClosure 스코프 클로저2

```Javascript

function wait(message) {
    setTimeout(function timer() {
        console.log(message);
    }, 1000);
}

wait("Hello, closure!");

```

- 작동방식

  1. 내부 함수 timer를 setTimeout()에 인자로 넘겼다.
  2. timer 함수는 wait() 함수의 스코프에 대한 스코프 클로저를 가지고 있으므로 변수 message에 대한 참조를 유지하고 사용할 수 있다.
  3. wait() 실행 1초 후, wait의 내부 스코프는 사라져야 하지만 익명의 함수가 여전히 해당 스코프에 대한 클로저를 가지고 있다.
  4. 내장 함수 setTimeout()에는 fn, func로 불리는 인자의 참조가 존재한다.
  5. 엔진은 해당 함수 참조를 호출하여 내장 함수 timer를 호출하므로 timer의 렉시컬 스코프는 온전히 남아있다.

- 반복문과 클로저

```Javascript

for(var i=1; i <= 5; i++ ) {
  setTimeout(function timer() {
    console.log(i); // 6이 5번 출력됨
  }, i*1000);
}
// 코드의 목적은 1, 2, 3, --- 5까지 하나씩 일초마다 출력

```

- 실행방식

  1. 반복문이 끝나는 조건 i가 '<=5'가 아닐 때다. (처음으로 끝나는 조건이 갖춰졌을 때 i의 값은 6)
  2. 출력된 값은 반복문이 끝났을 때의 i값을 반영한 것
  3. timeout 함수 콜백은 반복문이 끝나고 나서 작동한다.

- 원래 목적대로 실행하기 위해서는?
  - 더 많이 닫힌 스코프가 필요하다. 반복마다 하나의 새로운 닫힌 스코프가 필요하다.

```Javascript

for(var i=1; i<=5; i++) {
  (function() {
    setTimeout(function timer() {
      console.log(i); // 작동하지 않음
    }, i*1000);
  })();
}

```

- 각각의 timeout 함수 콜백은 반복마다 각각의 IIFE가 생성한 자신만의 스코프를 가지지만,
  IIFE는 아무것도 하지 않는 빈 스코프일뿐이기 때문에 각 스코프의 자체 변수가 필요하다.

```Javascript

// way 1
for(var i=1; i<=5; i++) {
  (function() {
    var j = i;
    setTimeout(function timer() {
      console.log(j); // 작동함
    }, j*1000);
  })();
}

// way 2
for(var i=1; i<=5; i++) {
  (function(j) {
    setTimeout(function timer() {
      console.log(j); // 작동함
    }, j*1000);
  })(i);
}

```

- 다시 보는 블록 스코프
  - 위의 해결책의 실제 필요했던 것은 반복 별 블록 스코프였다.
  - let을 이용하여 해결해보자. 키워드 let은 하나의 블록을 닫을 수 있는 스코프로 바꾼다.

```Javascript

for(let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}

```

- let 선언문이 for 반복문 안에서 사용되면 특별한 방식으로 작동한다.
- 반복문 시작 부분에서 let으로 선언된 변수는 한 번만 선언되는 것이 아니라 반복할 때마다 선언된다.
- 해당 변수는 편리하게도 반복마다 이전 반복이 끝난 이후의 값으로 초기화된다.
