## 질문리스트

---

#### 나만의 질문리스트 (완벽하게 숙지하는 것이 목적)

#### 리액트가 나온 이유는?

- DOM이 굉장히 안좋아서 데이터 하나 수정할 때마다 Document에서 element를 가져와서 다시 렌더링을 시킴 이게 맞나? 리액트를 씀으로서 렌더링이 효율적으로 되던데

#### 나만의 트러블슈팅 경험? / 언제나 기술을 쓸 때는 항상 why를 바탕으로 제안하자

#### const, let, var의 차이 단순히 이것이 안된다 정도가 아니라 완벽히 숙지

#### 일반 function과 arrow function 표현식의 차이 단순히 짧게 하는 것이 아닌 완벽

#### React

- React Virtual-DOM
- 렌더링 최적화 useMemo, useCallback, re-rendering 조건

#### React Hook의 종류와 각각의 용도

#### CORS가 무엇이며, 어떻게 대체하는지

#### 비동기 구문의 실행 방식과 순서에 대해서 이야기 해주세요

#### CSR과 SSR의 차이

#### 호이스팅이란?

#### 클로저란?

#### 렉시컬 스코프란?

#### 리덕스란? 리덕스의 장점? 리덕스 사가?

#### SPA와 MPA?

#### 바벨과 폴리필?

#### this?

#### git rebase와 merge의 차이점

#### git 명령어 정리

#### 리액트의 ContextAPI

#### 웹팩

#### 보일러플레이트

#### 브라우저 저장소 (로컬, 세션, 쿠키 각각 설명)

#### 자바스크립트의 실행컨텍스트

#### 이벤트 루프 (버블링, 캡쳐링, 딜리게이션)

#### Promise 객체, Async await 예외처리의 까다로운점

#### 자바스크립트 원시값

#### 웹 브라우저에 www.google.com을 치고 엔터를 누르면 일어나는 일

#### ESModule

#### 구글 서버에서 index.html을 get요청으로 가져와야 하는데 가져오기 위해선 구글 아이피가 필요함

#### google.com이라는 도메인 네임을 통해 IP 주소를 찾아야 하기 때문에, Dns에 요청을 보내서 구글 IP 주소를 찾아 index.html을 가져와 브라우저에 렌더링한다.

#### html, css, js가 브라우저에서 어떻게 렌더링 되는지

#### repainting reflow

---

## 의문이 들었던 부분들에 대해서 정리해놓자

#### 좋은 컴포넌트의 분리법은?

#### 전역으로 토큰 관리하기

#### 넥스트 버전을 바꿨다고 서버에서 실행되고 오류가 나던 문제

#### CRA와 보일러 플레이트를 쓰지 않는 것의 차이

#### filter, map 새로운 배열반환, 정렬 되지 않은 값들은 비교가 안된다?

#### container, presenter 디자인 패턴을 쓰는데, defaultProps에 대한 고민

#### atomic 디자인 패턴?

#### useRef로 돔 조작하기

#### CSR은 상관없으나 SSR 시, 토큰 재발급의 관한 문제 (invaild Token)

#### useSelector를 쓸 때 dispatch get

#### 써드파티 라이브러리

#### redux, contextAPI, mobX, flux

#### props를 넘길 때의 null, undefined의 처리 (defaultValue)

#### input value, defaultValue

#### 컴포넌트는 동기?

#### 여러개의 비동기 (await, setState)에서 위치를 바꿨더니 나오는 출력상태

#### async await, promise, setState

#### useSelector 값 변경시 리로드? 값을 로딩이 오래걸려서 리로드처럼 보여지는건지? useSelector 참조 비교와 관련이 있는건지?

#### dispatch할 때 리로드?

- 원인

  - return myInfoData && <Presenter data={member.type === "CORPORATION" ? componentPropsCor : componentProps}></Presenter>;
  - return corporation && myInfoData && <Presenter data={componentPropsCor}></Presenter>;

- useSelector 참조비교
- useSelector와 문제
- [참조링크](https://redux.js.org/tutorials/fundamentals/part-5-ui-react#reading-state-from-the-store-with-useselector)

- dispatch를 할 경우 store가 업데이트 되기 때문에 다시 컴포넌트를 그려야 함
- put메소드로 그것만 할 경우 수정된 사항만 반영하기 때문에 리로드가 안됨
- 그렇다면 리덕스를 왜쓰지?
- 리덕스 공부

#### every함수를 써서 배열에 모든 요소를 true일 때 true로

#### filter를 써서 취소를 클릭했을 때 배열에 공백인 요소 없애기

#### re-rendering, re-load의 차이

#### re-load는 웹호스트 서버에 또 다른 http 요청을 하고, 브라우저에서 페이지에 로드할 html을 반환합니다.

#### re-rendering은 브라우저에 이미 제공된 페이지의 기존 html을 변경, 추가 또는 제거하는 작업

#### 리렌더링은 사용자 화면에 뷰를 다시 새롭게 보여준다는 의미, 업데이트 과정을 거친다 또는 조화 과정을 거친다

- 이러한 변경을 위해 웹사이트의 서버와 상호 작용할 필요가 없습니다.
- 새 html 요소 내부에 실제 콘텐츠를 표시하면 http 요청이 발생할 수 있다.

#### 렌더링과정과 기초적인 개념들을 다시 잡고 가자!

#### 로컬에서 작업했을 때와 배포했을 때 나오는 이미지 및 css가 달라지는 현상

#### useState null 처리 (undefined, null이 아닌 {}, [], "")

#### 협업 시, 개인이 중요하게 생각하는 선은 넘지말자 (사람마다 다를 수 있으니)

- 기술 원칙 (Tech Principal)
  - 우리가 기술레이어에서 어떤 걸 최우선으로 신경 쓸 지
- 개발팀
  1. 렌더링 퍼포먼스
  2. 가독성
  3. 코드의 간결성

#### 프론트엔드에서 상태관리는 어떻게 하는게 좋을까요?

#### 자바스크립트 함수의 유형과 특징, 용도를 구체적으로 설명해주세요

- 정적 --> 동적 (DOM 요소를 조작할 수 있는 scription 언어를 추가하자)
- ECMA 스크립트 : Ecma International이 ECMA-262 기술 규격에 따라 정의하고 있는 표준화된 스크립트 프로그래밍 언어
- 2004 Jesse James Grarrett란 사람이 AJAX 기술 명세서
- 2008 Chrome Browser 등장으로 웹시장이 바뀌게 됨 (JIT - Just-in-time compilation엔진) : 자바스크립트 실행 속도가 매우 빠름
- 2015 ECMAcript 6
- 모든 사람들이 최신 브라우저를 쓰고 있는게 아니기 때문에,
  Babel : 개발할 때는 최신 버전의 ECMA 스크립트 버전을 쓰고 배포할 때만 Javascript transcompiler라는 것을 사용하여 ECMA5나 6로 변환해서 변환 된 코드를 생산해주는 녀석

---

## 문제 해결의 방법은 정말 다양하지만 개발을 하지 않는 것도 하나의 방법 (의사소통의 중요성)

- 투자 준비하기 대표자와 관련된 해결논의

## 프론트엔드 개발자로서 더욱 성장하기 위해 필수적으로 정복해야 할 요소들

- BE쪽

  - 네트워크 (HTTP)
  - Restful API
  - RDBMS , NoSQL, SQL
  - JSON
  - graphQL

- FE쪽
  - 브라우저에 대한 지식
  - OS에 대한 이해 (맥, 윈도우, IOS, Android)
    - OS 별 특징 (어느 레이어에서 그래픽을 최적화 할 지?, 맥에서는 기본 폰트가 이런 거니까 신경써야 할 것)
    - Mobile
    - Desktop
    - Input Method (입력 장치)
  - ContentFormat
    - 이미지
      - png, jpeg, webp, svg, 2배율, 3배율,
    - 비디오
      - mp4, mpeg의 표준 포맷이 mp4, vp9, av1 (8k 비디오 지원하는 근간)
    - 오디오
    - 텍스트
      - plain text?
  - UX
    - 심리학
    - 인터랙션
  - 인프라
    - 배포
    - AWS
    - Serverless
    - Docker
    - CDN
    - S3
    - Kubernets
    - Devops : 우리가 서비스를 어떻게 관리 할 지
    - Monitoring
    - Log
