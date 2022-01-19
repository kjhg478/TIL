## GA

---

### 구글 애널리틱스

- React google analytics 연동을 위해서 이렇게 작업을 해주었다.
- 그러나 SPA 패러다임에서는 후속 콘텐츠가 동적으로 로드되는데 구글 애널리틱스 태그는 새 페이지를 로드할 때마다 스니펫 코드가 실행됨
- 사이트가 전체 페이지를 로드하는 대신 동적으로 새 페이지 콘텐츠를 로드하는 단일 페이지 애플리케이션의 스니펫 코드는 한 번만 실행됨

  - 새 콘텐츠가 로드될 때 후속 콘텐츠를 수동으로 추적할 수 있게 해줘야 함.
  - 이렇게 docs를 보고 같이 function을 걸어주었지만 작동하지 않았다.
  - 첫페이지만 감지하고 실시간 감지가 안되고 새로고침을 눌러줘야 감지가 되는 현상

- [GoogleAnalytics](https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications)

```js
import Document, { Html, Head, Main, NextScript } from "next/document";

const isProduction = process.env.APP_ENV === "production";

export default class RootDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          {isProduction && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=[${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}]`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname,
                });
                ga('send', 'pageview', location.pathname);
              `,
                }}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              (function(h,o,t,j,a,r){ h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)}; h._hjSettings={hjid:2646733,hjsv:6}; a=o.getElementsByTagName('head')[0]; r=o.createElement('script');r.async=1; r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv; a.appendChild(r); })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `,
                }}
              />
            </>
          )}

          <link rel="shortcut icon" href="/favicon/favicon.svg" />
          <meta charSet="UTF-8" />
          <meta name="description" content="Xquare" />
        </Head>
        <body id="body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

---

### React.GA

- 결국 라이브러리를 택했다..
- 라이브러리 설치를 좋아하지 않아 최대한 docs를 보면서 문제를 해결하려고 했지만 잘 되지 않았다.
- 대신..라이브러리 설치 한방에 문제가 해결됐다. (customHook으로 빼주었다)
- router가 바뀔때마다 감지하게끔 의존성을 걸어줘서 해결!

```Js

import ReactGA from "react-ga";

const useGaTracking = () => {
  // useEffect
  const router = useRouter();

  useEffect(() => {
    ReactGA.initialize("trackingId");
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }, [router]);
  return <></>;
};

export default useGaTracking;

```
