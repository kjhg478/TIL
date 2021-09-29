## 질문리스트

- 나만의 질문리스트 (완벽하게 숙지하는 것이 목적)

  1. 나만의 트러블슈팅 경험?
  2. const, let, var의 차이 단순히 이것이 안된다 정도가 아니라 완벽히 숙지
  3. 일반 function과 arrow function 표현식의 차이 단순히 짧게 하는 것이 아닌 완벽
  4. React

  - React Virtual-DOM
  - 렌더링 최적화 useMemo, useCallback, re-rendering 조건

  5. React Hook의 종류와 각각의 용도
  6. CORS가 무엇이며, 어떻게 대체하는지
  7. 비동기 구문의 실행 방식과 순서에 대해서 이야기 해주세요
  8. CSR과 SSR의 차이
  9. 호이스팅이란?
  10. 클로저란?
  11. 렉시컬 스코프란?
  12. 리덕스란? 리덕스의 장점? 리덕스 사가?
  13. SPA와 MPA?
  14. 바벨과 폴리필?
  15. this?
  16. git rebase와 merge의 차이점
  17. git 명령어 정리
  18. 리액트의 ContextAPI
  19. 웹팩
  20. 보일러플레이트
  21. 브라우저 저장소 (로컬, 세션, 쿠키 각각 설명)
  22. 자바스크립트의 실행컨텍스트
  23. 이벤트 루프 (버블링, 캡쳐링, 딜리게이션)
  24. Promise 객체, Async await 예외처리의 까다로운점
  25. 자바스크립트 원시값
  26. 웹 브라우저에 www.google.com을 치고 엔터를 누르면 일어나는 일
  27. ESModule

  - 구글 서버에서 index.html을 get요청으로 가져와야 하는데 가져오기 위해선 구글 아이피가 필요함
  - google.com이라는 도메인 네임을 통해 IP 주소를 찾아야 하기 때문에, Dns에 요청을 보내서 구글 IP 주소를 찾아 index.html을 가져와 브라우저에 렌더링한다.

  27. html, css, js가 브라우저에서 어떻게 렌더링 되는지
  28. repainting reflow

- 의문이 들었던 부분들에 대해서 정리해놓자

  1. 좋은 컴포넌트의 분리법은?
  2. 전역으로 토큰 관리하기
  3. 넥스트 버전을 바꿨다고 서버에서 실행되고 오류가 나던 문제
  4. CRA와 보일러 플레이트를 쓰지 않는 것의 차이
  5. filter, map 새로운 배열반환, 정렬 되지 않은 값들은 비교가 안된다?
  6. container, presenter 디자인 패턴을 쓰는데, defaultProps에 대한 고민
  7. atomic 디자인 패턴?
  8. useRef로 돔 조작하기
  9. CSR은 상관없으나 SSR 시, 토큰 재발급의 관한 문제 (invaild Token)
  10. useSelector를 쓸 때 dispatch get
  11. 써드파티 라이브러리
  12. redux, contextAPI, mobX, flux
  13. props를 넘길 때의 null, undefined의 처리 (defaultValue)
  14. input value, defaultValue
  15. 컴포넌트는 동기?
  16. 여러개의 비동기 (await, setState)에서 위치를 바꿨더니 나오는 출력상태
  17. async await, promise, setState
  18. useSelector 값 변경시 리로드? 값을 로딩이 오래걸려서 리로드처럼 보여지는건지? useSelector 참조 비교와 관련이 있는건지?
  19. dispatch할 때 리로드?

  - useSelector 참조비교
  - useSelector와 문제
  - [참조링크](https://redux.js.org/tutorials/fundamentals/part-5-ui-react#reading-state-from-the-store-with-useselector)

  - dispatch를 할 경우 store가 업데이트 되기 때문에 다시 컴포넌트를 그려야 함
  - put메소드로 그것만 할 경우 수정된 사항만 반영하기 때문에 리로드가 안됨
  - 그렇다면 리덕스를 왜쓰지?
  - 리덕스 공부

  20. every함수를 써서 배열에 모든 요소를 true일 때 true로
  21. filter를 써서 취소를 클릭했을 때 배열에 공백인 요소 없애기
  22. re-rendering, re-load의 차이

  - re-load는 웹호스트 서버에 또 다른 http 요청을 하고, 브라우저에서 페이지에 로드할 html을 반환합니다.
  - re-rendering은 브라우저에 이미 제공된 페이지의 기존 html을 변경, 추가 또는 제거하는 작업
  - 리렌더링은 사용자 화면에 뷰를 다시 새롭게 보여준다는 의미, 업데이트 과정을 거친다 또는 조화 과정을 거친다

    - 이러한 변경을 위해 웹사이트의 서버와 상호 작용할 필요가 없습니다.
    - 새 html 요소 내부에 실제 콘텐츠를 표시하면 http 요청이 발생할 수 있다.

  23. 렌더링과정과 기초적인 개념들을 다시 잡고 가자!

- 1일 1 커밋, 1일 1블로그 보기, 1일 1 영어문단

#### 문제 해결의 방법은 정말 다양하지만 개발을 하지 않는 것도 하나의 방법 (의사소통의 중요성)

- 투자 준비하기 대표자와 관련된 해결논의
- 자바스크립트 웹 브라우저 관련지식을 탄탄히 쌓자.
