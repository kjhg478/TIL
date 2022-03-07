## Mui Static Date Picker

---

### 기능

- 캘린더 각 날마다 기록을 할 수 있는 기능이 있음
- 어떤 날에 기록을 하게 되면 그 날에 하이라이트 표시가 되는 기능

### 배운 것

- 자바스크립트 실행 시점
- Array.from
  - 유사 배열 객체나 반복 가능 객체를 얕게 복사해 새로운 Array 객체를 만듦
  - 유사 배열 객체 : []로 감싸져 있지만 배열이 아닌 녀석들 (유사 배열은 배열의 메서드 사용 불가)
    - key가 숫자이고 length 값을 가지고 있는 객체
- new Set으로 중복 값 제거
- setText((prev) => Array.from(new Set([...prev, data])));

### 내가 놓쳤던 것

- 타입스크립트의 이해도 부족

  - 타입 에러가 나는 것이 무서워 어떻게든 안나는 방향으로만 하려고 했던 것
  - 기존 코드를 수정을 해서 해결할 수 있었어야 했는데 타입에러를 피하고자 계속해서 올바르지 않은 방향성으로 작업 진행

- 타입스크립트 편집기(언어서비스)를 이용해서 선언되어 있는 d.ts를 보고 어떤 것을 반환해야 하는지 잘 체크하자

  - JSX.Element 반환인데 당연히 배열형태로 값이 오면 사용할 수 없지...

- map으로 뿌려주면 당연히 렌더링이 2번이 되고 map 안에서 처리하려고 하지말자

  - 차라리 map 함수를 적절히 이용해서 배열에 값을 push 해주는 것도 하나의 방법

- 함수실행
  - 내부적으로 함수를 리턴해줬기 때문에 함수를 한번 더 실행해줘야 했다.
  - 내부적으로 map 함수 리턴은 당연히 함수 실행을 안해줘도 실행이 됨
  - conosle.log(reportDay()), console.log(reportDay)