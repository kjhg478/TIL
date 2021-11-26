## 질문리스트

---

### 나만의 질문리스트 (완벽하게 숙지하는 것이 목적)

### 리액트가 나온 이유는?

- DOM이 굉장히 안좋아서 데이터 하나 수정할 때마다 Document에서 element를 가져와서 다시 렌더링을 시킴 이게 맞나? 리액트를 씀으로서 렌더링이 효율적으로 되던데

### 나만의 트러블슈팅 경험? / 언제나 기술을 쓸 때는 항상 why를 바탕으로 제안하자

### const, let, var의 차이 단순히 이것이 안된다 정도가 아니라 완벽히 숙지

### 일반 function과 arrow function 표현식의 차이 단순히 짧게 하는 것이 아닌 완벽

### React

- React Virtual-DOM
- 렌더링 최적화 useMemo, useCallback, re-rendering 조건

### React Hook의 종류와 각각의 용도

### CORS가 무엇이며, 어떻게 대체하는지

### 비동기 구문의 실행 방식과 순서에 대해서 이야기 해주세요

### CSR과 SSR의 차이

### 호이스팅이란?

### 클로저란?

### 렉시컬 스코프란?

### 리덕스란? 리덕스의 장점? 리덕스 사가?

### SPA와 MPA?

### 바벨과 폴리필?

### this?

### git rebase와 merge의 차이점

### git 명령어 정리

### 리액트의 ContextAPI

### 웹팩

### 보일러플레이트

### 브라우저 저장소 (로컬, 세션, 쿠키 각각 설명)

### 자바스크립트의 실행컨텍스트

### 이벤트 루프 (버블링, 캡쳐링, 딜리게이션)

### Promise 객체, Async await 예외처리의 까다로운점

### 자바스크립트 원시값

### 웹 브라우저에 www.google.com을 치고 엔터를 누르면 일어나는 일

### ESModule

### 구글 서버에서 index.html을 get요청으로 가져와야 하는데 가져오기 위해선 구글 아이피가 필요함

### google.com이라는 도메인 네임을 통해 IP 주소를 찾아야 하기 때문에, Dns에 요청을 보내서 구글 IP 주소를 찾아 index.html을 가져와 브라우저에 렌더링한다.

### html, css, js가 브라우저에서 어떻게 렌더링 되는지

### repainting reflow

---

## 의문이 들었던 부분들에 대해서 정리해놓자

### 좋은 컴포넌트의 분리법은?

### 전역으로 토큰 관리하기

### 넥스트 버전을 바꿨다고 서버에서 실행되고 오류가 나던 문제

### CRA와 보일러 플레이트를 쓰지 않는 것의 차이

### filter, map 새로운 배열반환, 정렬 되지 않은 값들은 비교가 안된다?

### container, presenter 디자인 패턴을 쓰는데, defaultProps에 대한 고민

### atomic 디자인 패턴?

### useRef로 돔 조작하기

### CSR은 상관없으나 SSR 시, 토큰 재발급의 관한 문제 (invaild Token)

### useSelector를 쓸 때 dispatch get

### 써드파티 라이브러리

### redux, contextAPI, mobX, flux

### props를 넘길 때의 null, undefined의 처리 (defaultValue)

### input value, defaultValue

### 컴포넌트는 동기?

### 여러개의 비동기 (await, setState)에서 위치를 바꿨더니 나오는 출력상태

### async await, promise, setState

### useSelector 값 변경시 리로드? 값을 로딩이 오래걸려서 리로드처럼 보여지는건지? useSelector 참조 비교와 관련이 있는건지?

### dispatch할 때 리로드?

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

### every함수를 써서 배열에 모든 요소를 true일 때 true로

### filter를 써서 취소를 클릭했을 때 배열에 공백인 요소 없애기

### re-rendering, re-load의 차이

### re-load는 웹호스트 서버에 또 다른 http 요청을 하고, 브라우저에서 페이지에 로드할 html을 반환합니다.

### re-rendering은 브라우저에 이미 제공된 페이지의 기존 html을 변경, 추가 또는 제거하는 작업

### 리렌더링은 사용자 화면에 뷰를 다시 새롭게 보여준다는 의미, 업데이트 과정을 거친다 또는 조화 과정을 거친다

- 이러한 변경을 위해 웹사이트의 서버와 상호 작용할 필요가 없습니다.
- 새 html 요소 내부에 실제 콘텐츠를 표시하면 http 요청이 발생할 수 있다.

### 렌더링과정과 기초적인 개념들을 다시 잡고 가자!

### 로컬에서 작업했을 때와 배포했을 때 나오는 이미지 및 css가 달라지는 현상

### useState null 처리 (undefined, null이 아닌 {}, [], "")

### 리액트에선 중복되는 컴포넌트가 있으면 무조건 공통화?

### 협업 시, 개인이 중요하게 생각하는 선은 넘지말자 (사람마다 다를 수 있으니)

- 기술 원칙 (Tech Principal)
  - 우리가 기술레이어에서 어떤 걸 최우선으로 신경 쓸 지
- 개발팀
  1. 렌더링 퍼포먼스
  2. 가독성
  3. 코드의 간결성

### 프론트엔드에서 상태관리는 어떻게 하는게 좋을까요?

### 자바스크립트 함수의 유형과 특징, 용도를 구체적으로 설명해주세요

- 정적 --> 동적 (DOM 요소를 조작할 수 있는 scription 언어를 추가하자)
- ECMA 스크립트 : Ecma International이 ECMA-262 기술 규격에 따라 정의하고 있는 표준화된 스크립트 프로그래밍 언어
- 2004 Jesse James Grarrett란 사람이 AJAX 기술 명세서
- 2008 Chrome Browser 등장으로 웹시장이 바뀌게 됨 (JIT - Just-in-time compilation엔진) : 자바스크립트 실행 속도가 매우 빠름
- 2015 ECMAcript 6
- 모든 사람들이 최신 브라우저를 쓰고 있는게 아니기 때문에,
  Babel : 개발할 때는 최신 버전의 ECMA 스크립트 버전을 쓰고 배포할 때만 Javascript transcompiler라는 것을 사용하여 ECMA5나 6로 변환해서 변환 된 코드를 생산해주는 녀석

### 특정 상태의 값 변화를 추적하려 한다면 효과적인 구현 패턴?

### 인증관련 문제 (트러블 슈팅)

- SSR로 인해 겪었던 오류
- 페이지 이동시 (window.location.href --> 새로고침 되서 페이지를 이동하는데 비동기 처리로 토큰 발급보다 렌더링이 먼저 되기 때문에 재발급된 토큰으로 인한 invaild_token 오류)
- 뒤로 가기 했다가 다시 접근하면 유효한 토큰이기 때문에 다시 정상 작동
- window.location.href --> 브라우저를 사용할 때 javascript 코드가 아닌 HTTP 요청을 합니다. 따라 Authorization 토큰 값과 같이 사용자 정의 헤더를 추가할 수 없습니다.
  - HTTP 요청, 새로고침을 하며 Application 상태유지가 되지 않음
- window.location.href --> SPA 패러다임으로 개발하고 있으면 이렇게 이동할경우 참고하고 있던 데이터도 전부 재로딩 해야 한다.
- 그동안 관리하던 상태가 다 날라감 히스토리가 초기화됨
  - 그러면 router.push가 정답일까? application 상태는 유지하지만 껍데기만 유지되고 어떤 기능 동작을 하려고 하면 오류가 나타난다?
  - 토큰 재발급 이후 모든 api를 get 해야 하는데, 토큰 재발급과 get 요청이 비동기적으로 이루어지다보니 null과 undefined로 오류가 나타남
  - 해결책... --> 각각의 data가 없을 떄 return 처리와 optionalChaining? / interceptors
- next router.push --> 클라이언트 측 전환을 처리 (외부 URL에는 사용할 필요 X, window.location이 더 적합)

- 그럼 SSR 시, interceptors 처리?
- 페이지 접근시 이미 유효시간이 만료된 토큰값으로 API 요청을 보냈던건 어떻게 처리해야 하나? 페이지 단위로 API 요청?
- 그리고 필요성이 있는 곳에 정확한 의도로 사용하고 있는지, 아니면 설계가 문제인건지, 처리 방법이 있는지

- 현재 Production Hotfix 에러의 대부분은 Token관련 문제

  - 토큰 관리 주최 --> Client (JWT) --> 이 부분을 Server쪽 주최로 바꾸고 JWT에서 세션기반 인증으로 넘어가자
  - JWT의 존재목적 ? 인가/인증보다는 전자서명에 가까움
    - ex) QR체크인 내 이름 내 휴대전화 접종정보가 맞다면 DB까지 가지 않고 Verified 정보로만 사용자 정보 확인
    - 즉, 가변성이 있는 정보를 넣는건 JWT를 쓰는 것과 맞지 않다.
  - 저희 클라이언트에선 그 토큰안에 투자자권한이 있는데 그 투자자권한이 변경되고 있기 때문에 우리 사이트와는 목적이 별로 맞지 않다.
  - 조금 더 추가적인 보완

- 인증방식을 변경하면 생기는 일
  - 인증은 전역적으로 관리되고 있는 모든 것의 영향을 줌
  - 물론 클라이언트에서 관리하던 토큰을 서버에서 세션방식으로 위임함으로서 관리 자체는 안해도 되지만 (Cookie의 SessionId)
  - 토큰 만료 처리 --> 세션 만료 처리
  - 토큰으로 로그인 여부 체크 --> 세션으로 로그인 여부 체크
  - URL 직접 접근 막기
  - 기존 토큰 로직 제거 (세션으로 관리를 하기 때문에 토큰 방식이 필요가 없음)
  - SNS 로그인 방식도 변경
  - 어떤 사이드 이펙트가 생길지 테스트 해보면서 수정

### JWT에서 세션으로

- http, https

  - 기존 토큰은 http에서도 쿠키에 있는 값에 접근이 가능

  - 그러나 http는 document.cookie는 "" 이렇게 빈 스트링이 나옴
    - httpOnly 설정이 되어 있으면 "" 빈 스트링이 나온다.
    - document.cookie와 같은 자바스크립트로 쿠키를 조회하는 것을 막는 옵션 (브라우저에서 HTTP Only가 설정된 쿠키를 조회할 수 없다.)

- 세션작업으로 바꾸고 나서는 sameSite오류가 지속적으로 났었음, 이 에러를 해결하고자 sameSite: none과 https를 필수적으로 옵션을 줘야 했었음

  - 토큰은 어떻게 sameSite에러가 안났지?

  - https 인증서 설치

- 세션관리를 서버에 위임함으로써 토큰 재발급이 관련하여 문제들은 해결이 되었음
- 그러나 interceptor에서 alert창을 띄울 때 페이지의 호출하는 API와 비례하여 창이 뜸
  - interceptro에서 처리하는 것이 아닌 app.js에서 로그인을 체크하는 훅에서 처리하면 alert창은 한 번 뜸
- 페이지마다 호출하는 API들을 첫 번째 요청에서 에러가 나면 나머지 요청들은 안보낼 수 없을까?
  - 효율적이지 않다.
- 일단 페이지에 접근하면 모든 API들의 대해서 오류가 난다....
  - 그러면 페이지를 그리기 전에 판별을 해야 한다.
  - next js 페이지를 렌더링 하기 전에 API를 호출하고 만약 401 에러가 나면 페이지를 그리지 않게 했는데 페이지가 그려진다? (SSR 때문에?)
  -
- abortController(), axios.CancelToken ?

- 아니면 useEffect 의존성 때문에 계속 호출 애초에 API와는 관계가 없다?

### 리액트의 리렌더의 대해서 한번 더 생각해보게 되는 계기

- useSelector 변경 사항에서 새 참조로 반환된 값이 반환될 때마다 다시 렌더링 된다는 점

- useSelector로 인자값을 직접 참조하여 함수를 만들어 return하는 함수가 있다.

  - 그 함수값을 참조하여 자식 컴포넌트를 렌더링 시킨다. (가능한 컴포넌트, 불가능한 컴포넌트)
  - 자식 컴포넌트에서는 그 dispatch를 통해 스토어 값을 변경시킨다.
  - 그럼 스토어가 업데이트 되었기 때문에 useSelector 값을 다시 불러오게 되고 그 불러올 때 시간이 생긴다.
  - null이 되고, 그에 따른 함수값은 false가 됐다가 true로 되기 때문에 깜빡이는 현상

- useSelector를 setState해서 그 값을 저장시켜 참조시키는 방법

### next js 배포시 권한체크를 없애야 한다?

- 왜냐면 next js 배포할 때, ssr로 돌릴 때 애초에 권한체크가 되지가 않기 때문에 문제가 됨

### React UseMemo

- 함수 안에서 참조되는 모든 값은 의존 값의 배열에 나타나야 합니다.
  - 아니면 undefined가 떴었다.

### Tap과 관련된 문제

- redux로 tap을 관리하고 있고 router는 next의 link href등으로 이동하고 있음
- 프로젝트의 디테일 화면은 tap이 5개로 구분되어 있고, 이 탭은 리덕스에 의해서 값이 관리됨
- 또 tap을 쓰는 곳은 나의 투자에서 2개의 tap으로 구분되어 있음
- 프로젝트 디테일 화면에서 tap3, 4, 5로 클릭하고 나의 투자로 이동하면 디폴트값이 없어지게 됨
- 그럼 이 값을 초기화 하는 방법 및 조금 더 효율적으로 관리 하는 방법
- 페이지를 벗어날 때 redux를 초깃값으로 다시 설정하는 방법? (action.type으로는 값이 변하지 않는다?)
- 일단은,, a tag를 써서 해결 (a 태그를 사용하여 라우트 이동 시, redux의 전역 state가 모두 초기화)

  - a 태그의 기본 속성은 페이지를 이동시키면서, 페이지를 새로 불러온다. 그렇게 되면서 react 앱이 지닌 상태도 초기화
  - react에서 페이지를 이동시킬 때 <Link> 컴포넌트를 이용하면 브라우저 주소만 바꾸고, 페이지를 새로고침 하지 않기 때문에 state를 초기화 시키지 않음

- redux devTools를 잘 사용하고 확인해보자

  - devTools를 확인하니 next_redux_wrapper라는 녀석을 호출해주고 있길래 좀 더 자세히 보니 이녀석의 상태가 진짜였다.
  - HYDRATE 라는 액션을 통해서 클라이언트에 합쳐주는 작업이 필요한데 action.payload에는 스토어의 상태가 담겨있는데 이 둘을 합쳐서 새로운 클라이언트 리덕스 스토어의 상태를 만드는 것

- next-redux-wrapper
  - react에 redux는 react app에서는 단 하나의 redux store만 존재하므로 괜찮다.
  - Next.js를 사용하게 되면 유저가 요청할 때마다 redux store를 새로 생성하게 되므로 store가 여러개가 될 수 있다.
  - 또한 getInitialProps, getServerSideProps 등에서 redux store에 접근할 수 있어야 하는데 next-redux-wrapper가 없다면 접근할 수 없다.
  - next.js에서 생성한 redux store와 client에서 생성한 redux store는 다르므로 이 둘을 합쳐주는 것을 HYDRATE라는 액션을 통해 서버에서 생성한 store의 상태를 클라이언트에 합쳐주는 작업 필요

```Javascript
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...initialState };
    }
```

### getServerSideProps / getStaticProps

- 프로젝트 디테일 화면에서 다른 사람이 투자를 한 후, 뒤로가기나 투자하기 페이지에 접근했을 때 투자 퍼센트가 바뀌지 않는 이슈
- 기존 getStaticProps로 값을 받아왔기 때문에, 빌드시 고정되었음 (새로고침 하면 변경됨)
- 이 문제를 해결하기 위해 실시간성이 보장된다고 생각해야 했고, 그로 인해 getServerSideProps로 변경하여 문제 해결

```Javascript

// getStaticProps : 빌드시 고정되는 값으로, 빌드 이후에는 변경이 불가능

import { Project } from "components/Project";
import { apiGetProjectIndex } from "@api";
import { useAppInitLogged } from "@hooks";

const ProjectPage = props => {
  const { data } = props;
  return (
    <section>
      <Project data={data} />
    </section>
  );
};

export async function getStaticProps() {
  const data = await apiGetProjectIndex();

  return { props: { data }, revalidate: 1 };
}

export default ProjectPage;

// getServerSideProps : 빌드와 상관없이, 매 요청마다 데이터를 서버로부터 가져옵니다.

const ProjectPage = props => {
  const { data } = props;

  return (
    <section>
      <Project data={data} />
    </section>
  );
};

export async function getServerSideProps() {
  const data = await apiGetProjectIndex();
  return { props: { data } };
}

export default ProjectPage;



```

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
