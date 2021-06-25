## Client Side Rendering

- Rendering : 요청받은 내용을 브라우저 화면에 표시하는 것

- CSR

  - 최종적으로 로딩이 끝난 후, 브라우저가 보여지고 인터랙션이 동시에 가능
  - CSR은 페이지를 부분적으로 업데이트하는 모든 과정이 클라이언트 사이드에서 이루어지는 것

- CSR은 SSR에 비해 초기에 전송되는 페이지 (비어있다.)의 로딩 속도는 빠르지만 서비스에 필요한 데이터를
  Client(브라우저)에서 추가로 요청하여 재구성해야 하기 때문에 전체적인 페이지 완료 시점은 SSR보다 느려짐

- CSR

  1. 서버에서 브라우저로 응답을 보낸다
  2. 브라우저에서 JS를 다운로드 받는다 (HTML은 빈 태그)
  3. 브라우저가 실행
  4. 페이지가 로드 되고 인터랙션 가능

- CSR 장점

  1. 컴포넌트 단위로 UI를 구성하기 때문에 재사용에 용이하고 중복을 줄일 수 있다.
  2. 변경된 사항만 Server에 요청을 보내기 때문에 비용적인 측면에서 효율적

- CSR 단점
  1. 초기 페이지 로딩이 오래걸린다.
  2. SEO가 어렵다

```Javascript

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="description"
          content="Amazing web site" />
    <title>App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="app.js"></script>
  </body>
</html>

```

- 처음에는 빈화면만 보이다가 app.js를 서버로부터 받게 되는데 이 때, 파일 크기가 너무 커지면 다운로드 받는데 너무 많은 시간이 소요된다.
