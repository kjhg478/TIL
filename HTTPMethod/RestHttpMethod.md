## Rest

- Representational State Transfer

  - 자원 (Resource) : URI
  - 행위 (Verb) : HTTP Method
  - 표현 (Representations)
  - 즉, REST는 URI를 통해 자원을 표시하고, HTTP Method를 이용하여 해당 자원의 행위를 규정하여 그 결과를 받는 것

- HTTP Method

  - 클라이언트가 웹서버에게 사용자 요청의 목적/종류를 알리는 수단
  - GET : 조회 Read Idempotent
  - POST : 등록 Create
  - PUT : 수정 Update Idempotent
  - DELETE : 삭제 Delete Idempotent
  - GET과 DELETE는 행위가 명확하지만, POST와 PUT을 구분하기 위해서는 멱등법칙의 개념을 알아야 한다.

- 멱등법칙 (Idempotence)이란?

  - 여러 번 수행해도 결과가 같음을 의미
  - GET, PUT, DELETE는 같은 경로로 여러 번 호출해도 그 결과가 같다.
  - 그러나, POST는 매 호출마다 새로운 데이터가 추가된다.
  - 즉, POST는 결과가 Idempotent하지 않지만, PUT은 반복 수행해도 그 결과가 Idempotent 하다.

- PUT vs PATCH
  - PUT과 PATCH 둘 다 데이터의 수정을 위한 메소드다.
  - PUT : PUT 요청 시 요청을 일부분만 보낸 경우 나머지는 default 값으로 수정되는게 원칙이다. 즉, 바뀌지 않는 속성도 모두 보내야 함
    (만약 일부만 전달할 경우, 전달한 필드의 모두 null or default 값으로 처리 되니 주의해야 한다.)
  - PATCH : PATCH를 이용하여 변경 요청을 보낼 경우 새롭게 바뀐 부분만 반영 되며 나머지 기존의 데이터는 유지된다.
  - 데이터의 일부를 수정할 경우 PATCH, 전체적인 수정은 PUT을 사용한다.

```Javascript
PUT/users/1
{
  "age": 15
}

HTTP/1.1 200 OK
{
  "name": "Javascript",
  "age" : "15"
}

PATCH/users/1
{
  "age": 15
}
HTTP/1.1 200 OK
{
  "name": "Javascript",
  "age" : 15
}

```
