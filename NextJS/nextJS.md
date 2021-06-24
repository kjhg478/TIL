## NextJS

- 따로 설정을 해주지 않고도 SSR, SEO부터 Javascript, Typescript까지 생산에 필요한 많은 기능들을 제공
- 사전 렌더링 (Pre-Rendering)

  - 기본적으로 Next.js는 모든 페이지를 미리 렌더링 한다. 클라이언트 측 Javascript에서 모든 작업을 수행하는 대신
    각 페이지에 대해 미리 HTML을 생성한다. 사전 렌더링은 더 나은 성능과 SEO의 이점을 가져올 수 있다.

- 두 가지 형태의 사전 렌더링

  - Static Generation : HTML은 빌드시에 생성되며 각 요청에 재사용 할 수 있다.
  - Server-Side Rendering : 각 요청에 대해 HTML이 생성된다. (클라이언트 사이드에서 서버 요청을 하는 방식으로 진행가능)

- SSG와 SSR과 함께 CSR을 같이 사용할 수 있다.
- Next.js를 사용하여 대부분 페이지에는 SSG를 사용하고 다른 페이지에는 SSR을 사용하여 하이브리드 Next.js 앱을 만들 수 있다.

- 가급적 SSG를 사용할 수 있는 부분엔 SSG를 사용하고 필요한 부분에만 SSR을 사용할 것을 권장

  - 페이지를 한 번만 빌드하고 CDN(콘텐츠 전송 네트워크)에서 제공 할 수 있으므로 서버가 모든 요청에 대해 페이지를 렌더링 하는 것보다 훨씬 빠르기 때문

![SSGSSR](./images/SSGSSR.png)

- getStaticProps : 빌드 타임 때 data fetch --> 딱 한 번만 실행되고 빌드시에 고정되는 값, 빌드 된 이후에 변경이 불가능
- getStaticPaths : data에 기반하여 Pre-render 할 동적 라우팅을 적어주면 된다. (getStaticProps와 함께 쓰임)
- getServerSideProps : 각각의 요청마다 data fetch --> 같은 페이지에서 페칭하고 다른 내용은 렌더함 Static이 아니기 때문에 매 요청마다 데이터를 서버로부터 가져온다.

- Next.js Page
  - 동적 경로가 있는 페이지를 지원함
