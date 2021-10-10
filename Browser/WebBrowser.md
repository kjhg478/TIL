## Browser

#### 브라우저가 이해할 수 있는 언어

1. HTML
2. CSS
3. Javascript
4. WebAssembly

#### 웹 브라우저 렌더링 과정

- HTML을 다운로드 받는다. (HTML 코드를 위에서 아래로 읽어나감 - 파싱)
  - HTML 요소 내에서 Link(외부 리소스 연동 CSS를 불러올 때 - 파싱), Script (Javascript를 만나면 렌더링을 멈춤), Image(외부 리소스 다운로드)
- HTML은 DOM이라는 요소를 만들고 CSS는 CSSOM이라는 요소를 만듦
- DOM과 CSSOM이라는 요소들을 결합해서 RenderTree라는 요소를 만듦
- RenderTree
  1. Layout (배치 Reflow) - 생략 가능 (Ex : BackgroundColor같은 요소는 레이아웃을 발생시키지 않음)
  2. Paint (그리기 Repaint) - 필수
  3. Render
- 불필요한 Layout은 줄이는게 좋다. (성능 이점)
- Layout을 발생시키는 속성들의 대한 이해는 굉장히 중요 (CSS 속성)
- Layout 과정을 하나 줄이는 것만으로 렌더링 퍼포먼스에 대한 최적화가 잘 수행이 됨
  - Position absolute와 함꼐 top, left, right, bottom속성을 쓰게 되면 위치를 변경시킬 수 있음 : 기본적으로 레이아웃 발생, 60프레임 유지 불가
  - transform의 translate 속성도 위치 이동을 시키지만 레이아웃을 발생시키지 않음 : transform으로 애니메이션 구성, 60프레임 유지 가능
- paint과정은 필수기 때문에 최적화가 어려움

#### 웹에서 꼭 알아야 할 요소들

- Reflow Repaint(CPU와 GPU 많이 먹음)
- Web에서 렌더링이 되는건 60fps를 유지시켜줘야 유저들이 부드럽다고 느낌
  - 60프레임을 유지시켜주는 것이 1초당
  - 1프레임은 0.024초
  - 이 초내에 Layout과 Paint도 해야함
  - 1프레임 단위로 렌더링 과정을 다시 수행해야 함
- SPA, SSR 모두 위 요소들과 직접적으로 연관이 됨
- CSR, SSR 둘 다 Web에서 Content를 만드는 행위다.
- CSR과 SSR, SSG를 적절히 섞을 수 있어야함 (화면의 프레임은 SSR로 보내고 화면 내부의 Content들은 CSR로 새로 불러온다던가)

#### CSR (Client Side Rendering)

- Content를 Client에서 만들면 CSR
- Client에서 DOM을 이용해 HTML을 만듦
- Client = Browser
- React, Angular, Vue
  - 브라우저에서 컴포넌트를 만들어서 그 컴포넌트를 렌더링 시키는 것을 최우선 목적이기 때문
  - 컴포넌트들이 만드는 행위가 DOM을 만드는 행위와 비슷함
- 그럼 CSR이 왜나왔는가?
  - A에서 B로 이동할 때 흰색화면 및 데이터를 불러오기 위해선 새로고침을 해야함 (Tranditional Web)
  - User Experience 저하
- 브라우저의 파워를 많이 써야 하기 때문에 렌더링 퍼포먼스는 저하됨
- 한번 렌더링을 시키고 나면 필요한 부분만 렌더링을 할 수 있기 때문에 성능상의 이점이 없는건 아님
- 실시간성으로 보장해야 할 땐 CSR이 제일 중요함

#### SSR (Server Side Rendering)

- Content를 Server에서 만들면 SSR
- HTML을 애초에 만들어서 내려줌 (빠름)
- Server의 Computing Power를 이용해서 컨텐츠를 좀 더 빠르게 렌더링 할 수 있도록
- Web Content가 많을 떄 SSR을 사용
- Next.JS, Node - Template Engine
  - SSR을 위해서 Next.js를 추천, Why? 하는 기능들이 정말 많음
    1. 이미지 최적화
    2. 렌더링 최적화
    3. Cache
    4. .env (Node.js 환경 구축)
    5. API Proxy
    6. Docker Image 말기
- 검색엔진은 언제나 빠르게 뜨는 사이트를 우선적으로 노출 시키기 때문에 검색엔진 최적화에서 SSR이 더 이롭다. (검색 엔진에서 상위 노출을 목표로 하기 때문에)

#### SSG (Static Site Generation)

- CSR은 SSR은 User가 Request를 날린 시점마다 데이터를 불러와서 렌더링을 한다. (유저의 타이밍)
- 모든 콘텐츠가 유저가 리퀘스트를 날린 시점에서 데이터를 불러와야 하냐?
  - EX) 기사, 상품소개 페이지? (데이터가 잘 변하지 않는 페이지)
  - 서버에는 API, DB 등 다양한 것들의 접근이 필요하지만 이 접근을 줄 일수 있을까?에서 접근한게 SSG
- 사이트를 생성하는 시점(Build)에 미리 HTML을 만듦
- 미리 만들어 놓은 정적 사이트를 유저들에게 전달하는 역할을 수행
  - API의 접근하는 비율은 사이트 생성할 때만 접근하기 때문에 API의 서버의 부하가 훨씬 줄어들게 됨
- SSG의 빌드과정
  - Build
  - HTML, CSS, JS --> CDN과 S3경로를 --> User에게 내려줌
- SSG의 초점이 맞춰져 있는 Gatsby라는 라이브러리도 유용

### 한 가지에 국한된 것이 아닌 상황에 맞게끔 적절히 섞어쓸 수 있어야 한다.
