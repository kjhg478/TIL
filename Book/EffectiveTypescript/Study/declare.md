## Declare

---

- declare 키워드는 컴파일러에게 해당 변수나 함수가 이미 존재한다는 것을 알리는 역할을 함

  - 다른 영역의 코드에서 declare로 선언된 해당 변수나 함수를 참조할 수 있으며 declare로 선언된 부분은 javascript로 컴파일 되지 않음
  - 전역변수로 사용하거나 .d.ts 파일을 만들 때 사용

- Example
  - 컴파일리가 인식하지 못하는 자바스크립트 파일 (외부 모듈)
  - ts에서 exSdk.doSomething()을 호출하면 컴파일러는 해당 변수가 존재하는지 알지 못하기 때문에 컴파일 에러 발생
  - 이 때 declare 키워드를 이용해 해당 변수의 존재와 타입을 알릴 수 있다.
  - 컴파일러는 해당 선언문을 다른 코드의 정적 타입 확인을 위해 사용할 뿐 js로 컴파일 하지 않는다.
  - declare const exSdk = { doSomething: () => string };
