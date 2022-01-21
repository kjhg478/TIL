## 의문이 들었던 부분들에 대해서 정리해놓자

---

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

### every함수를 써서 배열에 모든 요소를 true일 때 true로

### filter를 써서 취소를 클릭했을 때 배열에 공백인 요소 없애기

### re-rendering, re-load의 차이

### re-load는 웹호스트 서버에 또 다른 http 요청을 하고, 브라우저에서 페이지에 로드할 html을 반환합니다.

### re-rendering은 브라우저에 이미 제공된 페이지의 기존 html을 변경, 추가 또는 제거하는 작업

### 리렌더링은 사용자 화면에 뷰를 다시 새롭게 보여준다는 의미, 업데이트 과정을 거친다 또는 조화 과정을 거친다

- 이러한 변경을 위해 웹사이트의 서버와 상호 작용할 필요가 없습니다.
- 새 html 요소 내부에 실제 콘텐츠를 표시하면 http 요청이 발생할 수 있다.

---

### 렌더링과정과 기초적인 개념들을 다시 잡고 가자!

### 로컬에서 작업했을 때와 배포했을 때 나오는 이미지 및 css가 달라지는 현상

### useState null 처리 (undefined, null이 아닌 {}, [], "")

- 옵셔널 체이닝도 하나의 방법이 될 수 있음

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

---

### useSelector 값 변경시 리로드? 값을 로딩이 오래걸려서 리로드처럼 보여지는건지? useSelector 참조 비교와 관련이 있는건지?

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

### 리액트의 리렌더의 대해서 한번 더 생각해보게 되는 계기

- useSelector 변경 사항에서 새 참조로 반환된 값이 반환될 때마다 다시 렌더링 된다는 점

- useSelector로 인자값을 직접 참조하여 함수를 만들어 return하는 함수가 있다.

  - 그 함수값을 참조하여 자식 컴포넌트를 렌더링 시킨다. (가능한 컴포넌트, 불가능한 컴포넌트)
  - 자식 컴포넌트에서는 그 dispatch를 통해 스토어 값을 변경시킨다.
  - 그럼 스토어가 업데이트 되었기 때문에 useSelector 값을 다시 불러오게 되고 그 불러올 때 시간이 생긴다.
  - null이 되고, 그에 따른 함수값은 false가 됐다가 true로 되기 때문에 깜빡이는 현상

- useSelector를 setState해서 그 값을 저장시켜 참조시키는 방법

---

### next js 배포시 권한체크를 없애야 한다?

- 왜냐면 next js 배포할 때, ssr로 돌릴 때 애초에 권한체크가 되지가 않기 때문에 문제가 됨
  - 서버에서는 권한체크를 걸어두었던 것들이 문제가 됐었던 경험

### React UseMemo와 UseCallback

- 함수 안에서 참조되는 모든 값은 의존 값의 배열에 나타나야 합니다.
  - 아니면 undefined가 떴었다.
- useMemo와 useCallback을 활용한 최적화 적용

### 공통작업의 대해서 컴포넌트 분리에 대해서 좀 더 유연하게 생각하자

- 같은 작업을 하는 버튼들의 대해서 함수로 분리할 수도 있지만 공용 컴포넌트를 활용하여 처리할 수 있다.
- 심사를 거치는 버튼들의 대한 각 상태

### Redux-saga Tap과 관련된 문제

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

### Next.js Optional catch all routes

- next docs에서 Dynamic Routes를 보면서 어렴풋이 보고 넘겼던 적이 있는데,  
  인앱 브라우저 환경에서 sns 작업을 하면서 적용하게 된 내용을 정리해보려고 한다.

- 기존 SNS 로그인을 했을 때, 무조건 메인페이지 넘어가서 체크를 했다.

  - 그러면 내가 가입을 하지 않았던 회원임에도 불구하고 sns로그인을 하면 메인페이지에 가서 그 결과를 보게됨
  - 가입되지 않은 회원인데 메인페이지로 보내지고 사용자가 다시 로그인페이지에 다시 접근해야 되는 불편함이 생긴다.

- 로그인이 완료되면 로그인 페이지에서 가입한 회원이면 메인으로, 가입하지 않은 회원이면 회원가입 페이지로 보내게끔 수정을 해야 된다.

- 문제
  - sns로 로그인을 처리할 때 login/[type.js] 로 동적경로를 설정해두었다.
  - 이렇게 되면 /login에서 버튼을 클릭해 가야하는데 login/[] 뒤에 걸리는 route 설정이 없기 때문에 페이지를 찾을 수 없다고 나옴
- 해결
  - 여러 고민을 하며 next docs를 참고해보니 Optional catch all routes설정이 있고, 선택적으로 경로를 잡을 수 있음
  - optional catch all routes는 매개변수가 없는 경로도 일치하여 문제없이 작동되는 기능
  - ex) `pages/post/[[...slug]].js`는 ` /post``post/a``post/a/b `
  - apply) `pages/login/[[...type]].js` -> ` /login``login/kakao~~``login/google~~ `

### 이미지 태그들에 alt로 이미지에 대한 설명 및 content 작성

- SEO에 좀 더 유용

### 오픈그래프(og)를 이용한 기능들

- url 지정을 안해줘서 생겼던 문제

### ts api 요청을 할 때 타입값을 맞춰줘야 하는 것들

- ts로 post요청을 할 때 request 타입과 response 타입

### js로 할 때와 ts로 할 때의 차이점을 너무나 크게 느끼고 있다.

- 그냥 타입지정이 아니라 ts에서 TypeSafe를 위한 정말 많은 가이드를 해주고 있다는 점을 깨닫는중..

---

### lodash의 많은 기능들

- isNull
- uniqBy
- cloneDeep
  - shallow Copy와 cloneDeep과의 차이를 이해하자

---

### 서비스 중점적 개발 개선

- 먼저 크라우드 펀딩 사이트로서 유저가 회원가입, 투자 준비, 투자하기, 배정 모든 과정의 한 사이클이 제대로 동작하는지에 집중

- 서비스를 오픈하고나서, 생각보다 유저 유입이 많이 되지 않았다.

- 광고의 필요성을 느끼고 광고를 했으나 400~600명 정도가 사이트에 유입이 되었으나, 이탈률이 80~90%가 되었음

  - 지속적인 유입은 들어오나, 여전히 이탈률은 높음

  - 실제로 회원가입이나, 이벤트, 프로젝트 페이지에 들어오는 유저도 현저히 적었음
  - 상품이 매력적이지 않을 수 있지만 프론트 측면과 각 파트를 맡고 있는 분들의 의견을 듣고싶어 개선을 건의함

- 새로운 기능의 기발보단 기획, 경험, 시각, 기술적인 요소들을 바탕으로 기존 요소에서 재조정의 필요성을 느낌
  - 디자인측면
    - 최초, 외주를 받았던 영향도 있었고 디자인보다는 기능에 집중 (전체적인 디자인 틀을 맞추는 것이 중요)
    - 사이트의 디자인 통일이 되어보이지 않았고, 너무 구시대적 디자인 느낌(클래식)이 나서 개선 건의
  - 프로세스 측면
    - 회원가입, 투자 준비하기, 투자하기 각각의 과정들의 대해 다시 한번 점검하고 사용자로서 최대한 간편하게 사이트를 이용할 수 있게 하는 것이 목적
    - 투자를 결심하기 전까지 모든 과정이 이해가 쉽고 이용이 편리해야 한다.

### 원본 이미지 비율을 유지하기 위해서

- next에서의 Image의 기본적으로 걸려있는 min, max width, height 옵션들을 모두 없애고 width: 100%, height: auto

- 하나의 이미지로 반응형웹에 적용하려면 overflow: hidden (background-image)

### 테스트 코드 작성에 대해서

- jest를 이용한 테스트코드
  - UI의 대한 것들보단 기능 위주로 테스트 코드 작성하여 기능 점검
  - 테스트코드를 작성하면서 가지는 의문점과 깨달은 내용을 추후 작성 예정
  - 컴포넌트 자체를 테스트?
    - 컴포넌트 안에서의 모든 기능들을 테스트하는 방법..

### 서버 요청에 대한 의문

- 각각의 대한 정보를 5번 수정해야 된다면 한번에 갔다와서 요청하는 것이 좋은지?
- 아니면 쓰임새에 맞게 서버에 5번을 요청하는 것이 좋은지?
  - 당연히 서버에 무리가 안가게끔 한번에 하면 좋지만 여러 사이드 이펙트나, 모든걸 묶어서 처리하려는 방법이 좋은지에 대한 의문
  - 정답은 없다고 생각하지만 납득이가는 근거로 좀 더 나은 방향을 위한 고민??
  - 다시 한번 더 생각해보니 각 페이지에 대한 쓰임새에 따라서 달라질 것 같다가 결론
    - 유지보수 측면과, 가독성 여러 방면을 생각해야 되니 그 당시에 맞는 쪽으로 협의 후에 결정

### 문제 해결의 방법은 정말 다양하지만 개발을 하지 않는 것도 하나의 방법 (의사소통의 중요성)

- 투자 준비하기 대표자와 관련된 해결논의
  - 요구사항은 법인회원으로서 투자준비를 할 수 있고 투자준비가 완료된 이후에 투자를 할 수 있으면 된다.
  - 대표자가 많아지면 많아질수록 그에 따른 화면처리나 서버쪽에서 처리해줘야 할 데이터들이 있었다.
  - 그러면 요구사항에 집중해서 꼭 대표자를 여러명 받아야 하나? 법적 규제가 중요한 우리한테 법적으로 문제가 되냐?
  - 없었다. 그 부분에서 중요한건 투자를 담당하는 법인이 대표자 본인인지 아니면 따로 담당자가 있는지가 중요하다.

### 프론트엔드 개발자로서 더욱 성장하기 위해 필수적으로 정복해야 할 요소들

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
