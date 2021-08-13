## 쿠키와 document.cookie

- 쿠키

  - 브라우저에 저장되는 작은 크기의 문자열로, RFC 6265 명세에서 정의한 HTTP 프로토콜의 일부
  - 쿠키는 주로 웹 서버에 의해 만들어집니다.
  - 서버가 HTTP 응답 헤더의 Set-Cookie에 내용을 넣어 전달하면, 브라우저는 이 내용을 자체적으로 브라우저에 저장
  - 브라우저는 사용자가 쿠키를 생성하도록 한 동일 서버에 접속할 때마다 쿠키의 내용을 Cookie 요청 헤더에 넣어서 함께 전달
  - document.cookie 프로퍼티를 이용하면 브라우저에서도 쿠키에 접근할 수 있다.

- 쿠키 읽기

  - document.cookie는 name=value 쌍으로 구성되어 있고, 각 쌍은 ;로 구분합니다.
    이 때, 쌍 하나는 하나의 독립된 쿠키를 나타냅니다. ;을 기준으로 document.cookie의 값을 분리하여 원하는 쿠키를 찾을 수 있습니다.

- 쿠키 쓰기
  - document.cookie에 직접 값을 쓸 수 있습니다.
  - 이 때, cookie는 데이터 프로퍼티가 아닌 접근자 프로퍼티 입니다.
  - document.cookie에 값을 할당하면, 브라우저는 이 값을 받아 해당 쿠키를 갱신, 다른 쿠키의 값은 변경되지 않습니다.

```Javascript

document.cookie = "user-John"; // 이름이 'user'인 쿠키의 값만 갱신
alert(document.cookie); // 모든 쿠키 보여주기

// 특수 값(공백)은 인코딩 처리해 줘야 합니다.
let name = "my name";
let value = "John Smith"

// 인코딩 처리를 해, 쿠키를 my%20name=John%20Smith 로 변경하였습니다.
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith

```

- 쿠키 옵션
  - 옵션은 key=value 뒤에 나열하고 ;로 구분
  - document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
  - path=/
    - 기본값은 현재 경로이고, 설정한 경로나 그 하위 경로에서만 쿠키 정보를 볼 수 있습니다.
  - domain=site.com
    - 옵션에 아무런 값을 입력하지 않았다면 쿠키를 설정한 도메인에서만 쿠키 정보를 얻을 수 있습니다.
  - expires/max-age
    - 쿠키의 만료시간을 정해줍니다. 이 옵션이 없으면 브라우저가 닫힐 때 쿠키도 같이 삭제됩니다.
  - secure
    - HTTPS 연결에서만 쿠키를 사용할 수 있게 합니다.
  - samesite
    - 요청이 외부 사이트에서 일어날 때, 브라우저가 쿠키를 보내지 못하도록 막아줍니다. XSRF 공격을 막는데 유용
