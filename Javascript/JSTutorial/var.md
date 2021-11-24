# 오래된 var

### 'var'는 블록 스코프가 없습니다.

- var로 선언한 변수의 스코프는 함수 스코프이거나 전역 스코프입니다.
- 블록 기준으로 스코프가 생기지 않기 때문에 블록 밖에서 접근 가능합니다.

```Javascript
    // var
    if (true) {
        var test = true;
    }

    alert(test); // true

    // let
    if (true) {
        let test = true;
    }

    alert(test); // Error : test is not defined
```

- var는 코드 블럭을 무시하기 때문에 test는 전역 변수가 됩니다.

```Javascript
    for (var i=0; i < 10; i++) {
        //...
    }

    alert(i); // 10, 반복문이 종료되었지만 i는 전역 변수이므로 접근이 가능합니다.


```

- 코드 블록이 함수 안에 있다면, var는 함수 레벨 변수가 됩니다.

```Javascript
    function sayHi() {
        if (true) {
            var phrase = "Hello";
        }

        alert(pharse);
    }

    sayHi();
    alert(pharse); // Error: phrase is not defined

```

- var는 if, for 등의 코드 블록을 관통합니다.
- 아주 오래전의 자바스크립트에선 블록 수준 렉시컬 환경이 만들어지지 않았기 때문

### 선언하기 전 사용할 수 있는 var

- var 선언은 함수가 시작될 때 처리되지만 전역에서 선언한 변수라면 스크립트가 시작될 때 처리됩니다.
- 함수 본문 내에서 var로 선언한 변수는 선언 위치와 상관없이 함수 본문이 시작되는 지점에서 정의됩니다. (단 변수가 중첩 함수 내에서 정의되지 않아야 함)

```Javascript
    // way 1
    function sayHi() {
        phrase = "Hello";

        alert(phrase);

        var pharse;
    }
    sayHi();

    // way 2
    function sayHi() {
        var phrase;
        phrase = "Hello";

        alert(phrase);
    }
    sayHi();

    // way 3
    function sayHi() {
        phrase = "Hello"; // (*)

        if (false) {
            var phrase;
        }

        alert(phrase);
    }
    sayHi();
```

- 이렇게 변수가 끌어올려 지는 현상을 **호이스팅**이라고 부릅니다.
- var로 선언한 모든 변수는 함수의 최상위로 '끌어 올려지기 때문입니다.'
- if (false) 블록 안 코드는 절대 실행되지 않지만, 이는 호이스팅에 전혀 영향을 주지 않습니다.
  if 내부의 var는 함수 sayHi의 시작 부분에서 처리되므로 phrase는 이미 정의가 된 상태인 것입니다.

### 선언은 호이스팅 되지만 할당은 호이스팅 되지 않습니다.

```Javascript
    function sayHi() {
    alert(phrase);

    var phrase = "Hello";
    }

    sayHi();
```

- var phrase = "Hello" 행에선 두 가지 일이 일어납니다.
  1. 변수 선언(var)
  2. 변수에 값을 할당 (=)
- 변수 선언은 함수 실행이 시작될 때 처리되지만 할당은 호이스팅 되지 않기 때문에 할당 관련 코드에서 처리됩니다.

```Javascript
    function sayHi() {
        var phrase; // 선언 함수 시작 시 처리됩니다.

        alert(phrase); // undefined

        phrase = "Hello"; // 할당은 실행 흐름이 해당 코드에 도달했을 때 처리됩니다.
    }
    sayHi();

```

- 이처럼 모든 var 선언은 함수 시작 시 처리되기 때문에, var로 선언한 변수는 어디서든 참조할 수 있습니다.
  하지만 변수에 무언가를 할당하기 전까지는 값이 undefined입니다.

### 정리하기

    - var로 선언한 변수는 let이나 const로 선언한 변수는 다른 두 가지 주요한 특성을 보입니다.
        1. var로 선안한 변수는 블록 스코프가 아닌 함수 수준 스코프를 갖습니다.
        2. var 선언은 함수가 시작되는 시점 (전역 공간에선 스크립트가 시작되는 시점)에서 처리됩니다.
