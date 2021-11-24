## fetch와 Cross-Origin 요청

```Javascript

try {
  await fetch('http://example.com');
} catch(err) {
  alert(err); // TypeError: Failed to fetch
}

```

- 왜 요청이 실패했는가?

  - 도메인, 프로토콜, 포트 세 가지에 의해 결정되는 오리진(origin)이라는 핵심 개념을 알아야 합니다.
  - 도메인이나 서브도메인, 프로토콜, 포트가 다른 곳에 요청을 보내는 것을 Cross-Origin Request(크로스 오리진 요청)라고 합니다.
    이 때, 크로스 오리진 요청을 보내려면 리모트 오리진에서 전송받은 특별한 헤더가 필요합니다.
  - 이러한 정책을 'CORS(Cross-origin Resource Sharing, 크로스 오리진 리소스 공유'라고 부릅니다.

- CORS

  - CORS는 인터넷을 보호하기 위해 만들어짐
  - 과거 수 년동안, 한 사이트 스크립트에서 다른 사이트에 있는 콘텐츠에 접근할 수 없다는 제약이 있었습니다.
  - 보안 규칙 덕에 hacker.com에서 gmail.com에 있는 메일 박스에 접근할 수 없었다.
  - 그러나, 많은 웹 개발자들이 강력한 기능을 원하기 시작하면서 위와 같은 제약을 피해 다른 웹사이트에 요청을 보내기 위한 트릭들을 만들기 시작!

- 폼 사용하기

  - 트릭 중 하나로 <form>안에 <iframe>을 넣어 form을 전송했습니다.

- 스크립트 사용하기
  - script 태그의 src 속성값엔 도메인 제약이 없기 때문에 이 특징을 이용하여 어디서든 스크립트 실행

### 안전한 요청

- 크로스 오리진 요청 종류
  1. 안전한 요청(Safe Request)
     - 안전한 메서드 : GET, POST, HEAD를 사용한 요청
     - 안전한 헤더 : Accept, Accept-Language, Content-Language, Content-Type, multipart/form-data emd
  2. 그 외의 요청
     - 위의 두 조건을 모두 충족하지 않은 요청은 안전하지 않은 요청으로 취급 (PUT 메서드를 사용하거나 헤더에 API-Key가 명시된 요청)
  - 즉, 안전한 요청은 <form>, <script> 태그를 사용해도 가능했던 요청인 반면 안전하지 않은 요청은 브라우저에서 보낼 수 없었던 요청이라는 두 요청의 근본적인 차이
