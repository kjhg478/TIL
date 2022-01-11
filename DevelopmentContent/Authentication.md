## Authentication

---

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

    - 기존 토큰은 클라이언트에서 쿠키를 구웠기 때문에, 근데 세션아이디로 바꾸면서 서버에서 set-cookie 해서 클라이언트에 전달해주기 때문에 SameSite 에러를
    - 함부로 클라이언트로 set-cookie를 보낼 수 없기 때문에 정해진 보안 규정을 맞춰야 그 쿠키값을 사용할 수 있음
    - 만약 서버에서 토큰을 발급해서 클라이언트로 넘겨줬다면 똑같이 에러가 났을거다. (결국은 set-cookie 때문에)

  - https 인증서 설치

- 세션관리를 서버에 위임함으로써 토큰 재발급에 관련하여 문제들은 해결이 되었음
- 그러나 interceptor에서 alert창을 띄울 때 페이지의 호출하는 API와 비례하여 창이 뜸
  - abortController(), axios.CancelToken ?
  - 아니면 useEffect 의존성 때문에 계속 호출 애초에 API와는 관계가 없다?
  - interceptro에서 처리하는 것이 아닌 app.js에서 로그인을 체크하는 훅에서 처리하면 alert창은 한 번 뜸
  - 다시 생각해보면 interceptors는 들어오는 요청과 응답을 가로채는 역할인데 그럼 API만큼 가로채기 때문에 당연히 비례해서 뜨는게 맞나..?
- 페이지마다 호출하는 API들을 첫 번째 요청에서 에러가 나면 나머지 요청들은 안보낼 수 없을까?
  - 효율적이지 않다.
- 일단 페이지에 접근하면 모든 API들의 대해서 오류가 난다....
  - 그러면 페이지를 그리기 전에 판별을 해야 한다.
    - CSR이면 모든 페이지에 접근하기 전에 판별할 수 있지만 SSR이기 때문에 미리 그려놓은 페이지 때문에 적합하지 않다고 생각
    - next js 페이지를 렌더링 하기 전에 API를 호출하고 만약 401 에러가 나면 페이지를 그리지 않게 했는데 페이지가 그려진다? (SSR 때문에?)
- axios로 request, response를 요청하고 받으면 한 API 당 계속해서 여러 번 호출하는 현상?
  - 일단 이 현상을 막기 위해서 while문으로 처리하였음
  - 정확한 원인을 찾으려고 노력 필요
- 로그인을 해놓고 세션이 만료된 이후에 API 요청에 대해서 처리를 해야 함
  - 모든 API 요청에 대해서는 interceptor로 처리할 수 밖에 없음

### SSR 환경에서 쿠키를 넣어주기

- SSR 환경에서는 쿠키를 모르기 때문에 설정을 해줘야 한다.
- 사모기능과 관련하여 클라이언트 접근권한 처리를 백엔드에서 해줬지만, 서버 환경이기 때문에 쿠키를 알 수가 없다.
  - 그것과 관련한 처리

```js
// way 1
let sessionId;
if (isServer(ctx)) {
  // 서버 환경일 때 쿠키를 심어줌
  const cookie = getCookie(ctx);
  $axios.defaults.headers.Cookie = cookie;
  // defaults : 모든 axios 요청 시에 쿠키 데이터를 심어줌
  if (!cookie) return { sessionId: null };
  sessionId = cookie.replace(REGEXP_SESSIONID, "$1");
  // 배포 시 문제가 생겨, 조건문을 걸어줌
  if (sessionId) {
    $axios.defaults.headers.Cookie = cookie;
  }
  if (!sessionId) {
    redirectLogin(ctx, router);
  }
}

// way 2

let sessionId;
if (isServer(ctx)) {
  const cookie = getCookie(ctx);
  if (!cookie) return { sessionId: null };
  sessionId = cookie.replace(REGEXP_SESSIONID, "$1");
  if (sessionId) {
    $axios.defaults.headers.Cookie = cookie;
  } else {
    $axios.defaults.headers.Cookie = null;
  }
  if (!sessionId) {
    redirectLogin(ctx, router);
  }
}
```

1. 첫 번째 문제

- way 1번으로 완료가 되었다고 생각하고, 테스트를 잘 마친 이후에 배포시 문제가 생김
  - $axios.defaults.headers.Cookie = cookie 이녀석은 로그인을 했을 때, SESSIONID로서의 역할을 한다.
  - SESSIONID 없이 접근 가능한, SSG로 생성된 약관페이지에 접근시, 쿠키 undefined가 나옴
  - SESSIONID가 있을 때만 저 쿠키값을 넣게 해서 해결을 했다.

2. 두 번째 문제

- way 1번의 조건문을 걸어서, 배포가 잘 되었고 문제가 없다고 생각했다.
- 그러나 저렇게 조건을 걸어버리면 sessionID가 없을때의 처리가 없기 때문에 바뀌지 않고 계속해서 고정된 값으로 남아있음
- 세션이 만료됐을 때, 이미 만료된 세션아이디 값 때문에 문제가 생김 (초기화를 해야한다고 생각)

- 결국, way 2번으로 처리를 해주어 SESSIONID값이 없을 땐, 초기화를 시켜주고 다시 넣어주는 방식으로 해결

---

### SSR 환경에서 쿠기값 처리 이후에..

- SSR 환경에서 쿠키값을 모르기 때문에 위에서 SESSIONID가 있으면 헤더에 실어서 api 요청을 했다.
- 그러나 오류가 난다.

  1. 세션이 만료됐을 때, 투자하기 페이지 접근
  2. 세션이 만료됐을 때, 투자하기 페이지에서 프로젝트 페이지로 갈 때

- 원인을 생각해보니 ServerSideProps로 각 요청마다 데이터 페칭을 하는 페이지인데 여기서 세션이 만료된다면?

  - 이미 쿠키값을 관리하고 있던 로직에서 만료된 쿠키로 api 요청을 하게 된다.  
    여기서 에러가 나면 페이지를 만들 수 없기 때문에 당연히 페이지도 안나온다.
  - 빌드된 결과물이 json 형태로 관리되고 서버 값이 바뀌면 그 바뀐 값으로 json 갱신을 해줘야 하는데 에러코드가 오기 때문에 문제가 됐던 것

- next 서버가 있고 api 서버가 있는데 여기서 두 가지 생각을 했다.

  1. api 서버에서 주는 결과물을 next 서버로 주면 next 서버는 그 최신값을 받아서 빌드해준다.
  2. SEO에 걸릴려면 next 서버가 들고 있어야 하는데 api 서버에서 받아온 데이터와 비교해 동기화 해주는 과정이 있다.

- 그래서 빌드된 next 폴더를 뒤져보고, next docs를 봤다.

  - getStaticProps는 html과 json 형태로 변환하고 getServerSideProps는 실행결과를 JSON을 반환하여 페이지를 렌더링
  - 실제 getStaticProps로 빌드된 것은 html과 json을 확인

- 해결을 위해 SSR 환경에서 쿠키값을 처리하는 로직에서 에러처리를 해야할 것으로 생각
