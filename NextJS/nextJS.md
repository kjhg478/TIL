## NextJS

- 따로 설정을 해주지 않고도 SSR, SEO부터 Javascript, Typescript까지 생산에 필요한 많은 기능들을 제공
- 사전 렌더링 (Pre-Rendering)

  - 기본적으로 Next.js는 모든 페이지를 미리 렌더링 한다. 클라이언트 측 Javascript에서 모든 작업을 수행하는 대신
    각 페이지에 대해 미리 HTML을 생성한다. 사전 렌더링은 더 나은 성능과 SEO의 이점을 가져올 수 있다.
  - 이렇게 만들어진 HTML은 해당 페이지에 적은 자바스크립트 코드와 연관된다. 페이지가 브라우저에 로드될 때, 해당 자바스크립트 코드가 작동하고 완전한 인터렉티브 페이지가 되도록 만든다.
    이를 Hydration이라고 함

- 두 가지 형태의 사전 렌더링

  - Static Generation : HTML은 빌드시에 생성되며 각 요청에 재사용 할 수 있다.

    - Next.js에서 페이지 컴포넌트를 내보낼 때, getStaticProps 라는 async 함수도 같이 내보낼 수 있다.
    - getStaticProps가 빌드 타임에 작동하고, 함수 내부에서 외부 데이터를 받아오고 이를 props로 페이지에 보낼 수 있다.

    ```Javascript
      export default function Home(props) { ... }

      export async function getStaticProps() {
        // Get external data from the file system, API, DB, etc.
        const data = ...

        // The value of the `props` key will be
        //  passed to the `Home` component
        return {
          props: ...
        }
      }
    ```

  - Server-Side Rendering : 각 요청에 대해 HTML이 생성된다. (클라이언트 사이드에서 서버 요청을 하는 방식으로 진행가능)

    - 서버사이드 렌더링을 하기 위해서는 getServerSideProps를 export 하면 된다.
    - getServerSideProps는 Request 시점에 데이터가 fetch 되어야 하는 페이지를 pre-render 할 때만 사용해야 한다.

    ```Javascript
    export async function getServerSideProps(context) {
      return {
        props: {
          // props for your component
        }
      }
    }

    ```

- SSG와 SSR과 함께 CSR을 같이 사용할 수 있다.
- Next.js를 사용하여 대부분 페이지에는 SSG를 사용하고 다른 페이지에는 SSR을 사용하여 하이브리드 Next.js 앱을 만들 수 있다.

- 가급적 SSG를 사용할 수 있는 부분엔 SSG를 사용하고 필요한 부분에만 SSR을 사용할 것을 권장

  - 페이지를 한 번만 빌드하고 CDN(콘텐츠 전송 네트워크)에서 제공 할 수 있으므로 서버가 모든 요청에 대해 페이지를 렌더링 하는 것보다 훨씬 빠르기 때문
  - 단, 자주 데이터를 업데이트 한다거나, 매 요청마다 콘텐츠가 달라지는 경우에는 SSR을 사용해야 한다.

![image](https://user-images.githubusercontent.com/31474272/123185984-1bd38600-d4d2-11eb-81f7-6c581030659a.png)

- getStaticProps : 빌드 타임 때 data fetch --> 딱 한 번만 실행되고 빌드시에 고정되는 값, 빌드 된 이후에 변경이 불가능
- getStaticPaths : data에 기반하여 Pre-render 할 동적 라우팅을 적어주면 된다. (getStaticProps와 함께 쓰임)
- getServerSideProps : 각각의 요청마다 data fetch --> 같은 페이지에서 페칭하고 다른 내용은 렌더함 Static이 아니기 때문에 매 요청마다 데이터를 서버로부터 가져온다.

- Next.js의 작동방식

  1. 사용자가 초기에 Serever에 페이지 접속을 요청한 경우 SSR 방식으로 렌더링 될 HTML을 보낸다.
  2. 브라우저에서 JS를 다운받고 실행한다.
  3. 사용자가 페이지와 상호작용하며 다른 페이지로 이동할 경우 CSR방식으로 Server가 아닌 브라우저에서 처리
