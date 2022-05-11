## FunctionType
- 함수의 반환(Return) 타입
    - 반환 값이 없을 경우 void
    - ex) function 함수이름 (매개변수1, 매개변수2): 타입 명시 {}

- 함수의 매개변수 (Parameter)
    - parameter에 타입 명시
    - 타입스크립트는 함수에 정의된 모든 매개변수가 함수에 필요하다고 가정
    - 함수 호출 시 타입스크립트 컴파일러는 함수의 정의된 매개 변수와 함수를 호출할 때 전달하는 아규먼트를 비교 검사한다.
      이 때, 매개 변수와 아규먼트 수가 일치하지 않으면 오류 발생

- 선택적 매개변수 (Optional Property)
    - Property명 뒤에 ?를 붙인다.
    - ex) function 함수이름 (message? : string)
    - 함수를 호출 할 때 생략 가능한 Property를 의미
    - ? 있어도 되고 없어도 되는 값을 설정할 때 사용

- 기본 매개변수 (Default Parameter)
    - 아무런 값이 전달되지 않을 때, undefined 대신 할당 된 기본 값을 출력할 수 있다.
    - ex) function 함수이름 (message? : string = 'there')

- Arrow Function
    - function add (x, y) { return x + y; }
    - const add = (x, y) => x + y; / const add = (x, y) => return ({x + y})