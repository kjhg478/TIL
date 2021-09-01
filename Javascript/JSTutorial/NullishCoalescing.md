## Nullish Coalescing Operator (null 병합 연산자 '??')

- null 병합 연산자( Coalescing Operator)

  - ??을 사용하면 짧은 문법으로 여러 피연산자 중 그 값이 '확정되어있는' 변수를 찾을 수 있다.
  - Ex) a ?? b의 평가 결과
    - a가 null도 아니고 undefined도 아니면 a
    - 그 외의 경우는 b

- Ex1)

  - null 병합 연산자 ??없이 x = a ?? b와 동일한 동작을 하는 코드를

  ```Javascript
      x = (a !== null && a !== undefined) ? a : b;
  ```

- Ex2)

  - 변수에 사용자 이름이나 별명을 저장하는데, 사용자가 아무런 정보도 입력하지 않는 케이스도 허용

  ```Javascript
      let firstName = null;
      let lastName = null;
      let nickName = "바이올렛";

      // null이나 undefined가 아닌 첫 번째 피연산자
      alert(firstName ?? lastName ?? nickName ?? "익명"); // 바이올렛

  ```

- ??와 ||의 차이

  - || 는 첫 번째 truthy 값을 반환합니다.
  - ?? 는 첫 번째 정의된(defined) 값을 반환합니다.
  - null과 undefined, 숫자 0을 구분 지어 다뤄야 할 때 이 차이점은 매우 중요함

  ```Javascript
      height = height ?? 100; // 100

      let height = 0;

      alert(height || 100); // 100
      alert(height ?? 100); // 0

  ```

  - height || 100은 height에 0을 할당했지만 0을 falsy 한 값으로 취급했기 때문에 null이나 undefined를 할당한 것과 동일하게 처리
  - height || 100의 평가 결과는 100
  - 반면 height ?? 100의 평가 결과는 height가 정확하게 null이나 undefined일 경우에만 100이 된다.
  - 위 코드에서는 height에 0이라는 값을 할당했기 때문에 alert창에 0이 출력

- 연산자 우선순위

  - ??의 연산자 우선순위는 5로 꽤 낮다
  - 그래서 ??는 =, ? 보다는 먼저, 대부분의 연산자보다는 나중에 평가된다.
  - 복잡한 표현식 안에서 ??를 사용해 값을 하나 선택할 땐 괄호를 추가하는 게 좋다.

  ```Javascript
      let height = null;
      let width = null;

      // 괄호를 추가!
      let area = (height ?? 100) * (width ?? 50);

      alert(area); // 5000
  ```

  - 괄호 추가를 하지 않으면 *가 ??보다 우선순위가 높기 때문에 *가 먼저 실행된다.
  - 추가로 안정성 관련 이슈 때문에 ??는 &&나 ||와 함께 사용하지 못합니다.

  ```Javascript
      // Wrong
      let x = 1 && 2 ?? 3; // SyntaxError: Unexpected token '??'

      // Right
      let x = (1 && 2) ?? 3; // 제대로 동작합니다.
      alert(x); // 2
  ```

#### 정리하기

    - null 병합 연산자 ??를 사용하면 피연산자 중 값이 할당된 변수를 빠르게 찾을 수 있다.
    - ??는 변수에 기본값을 할당하는 용도로 사용할 수 있다.
