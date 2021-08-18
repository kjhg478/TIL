## ArrowFunction (화살표 함수)

- 화살표 함수

  - 기존 함수로서 쓰던 방식들을 주로 짧게쓰기 위한 용도로 쓰던 과거를 반성하며..
  - 화살표 함수는 단순히 함수를 "짧게" 쓰기 위한 용도로 사용되지 않는다.
  - 화살표 함수는 몇 가지 독특하고 유용한 기능을 제공한다.
  - 자바스크립트를 사용하다 보면 저 멀리 실행될 작은 함수를 작성해야 하는 상황을 자주 만나게 된다.
  - EX)
    1. arr.forEach(func) - func는 forEach가 호출될 때 배열 arr의 요소 전체를 대상으로 실행된다.
    2. setTimeout(func) - func는 내장 스케줄러에 의해 실행된다.
  - 이처럼 자바스크립트에선 함수를 생성하고 그 함수를 어딘가 전달하는 것이 자연스럽다.
  - 이 때, 어딘가에 함수를 전달하게 되면 함수의 컨텍스트를 잃을 수 있다. 이럴 때 **화살표 함수**를 사용하면 현재 컨텍스트를 잃지 않아 편리함

- 화살표 함수에는 **this**가 없습니다.

  - 화살표 함수엔 this가 없다. 화살표 함수 본문에서 this에 접근하면, 외부에서 값을 가져온다.
  - this가 없기 때문에 화살표 함수는 생성자 함수로 사용할 수 없다는 제약이 있다. new와 함께 호출할 수 없다.

- 화살표 함수엔 **arguments**가 없습니다.
  - 모든 인수에 접근할 수 있게 해주는 유사 배열 객체 arguments를 지원하지 않는다.
  - 이런 특징은 현재 this 값과 arguments 정보를 함께 실어 호출을 포워딩해주는 데코레이터를 만들 때 유용하게 사용된다.

```Javascript

// 1.
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms)
  };
}

function sayHi(who) {
  alert('안녕, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("철수"); // 2초 후 "안녕, 철수"가 출력됩니다.

// 2.
function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}
// 일반 함수에선 setTimeout에 넘겨주는 콜백 함수에서 사용할 변수 ctx와 args를 반드시 만들어줘야 한다.

```

- 화살표 함수 vs bind
  1. .bind(this)는 함수의 '한정된 버전(bound version)'을 만든다.
  2. 화살표 함수는 어떤 것도 바인딩시키지 않는다.
  3. this가 없다. 화살표 함수에서 this를 사용하면 일반 변수 서칭과 마찬가지로 this의 값을 외부 렉시컬 환경에서 찾는다.
