## Rest

- Representational State Transfer

  - 자원 (Resource) : URI
  - 행위 (Verb) : HTTP Method
  - 표현 (Representations)
  - 즉, REST는 URI를 통해 자원을 표시하고, HTTP Method를 이용하여 해당 자원의 행위를 규정하여 그 결과를 받는 것

- HTTP Method

  - GET : 조회 Read Idempotent
  - POST : 등록 Create
  - PUT : 수정 Update Idempotent
  - DELETE : 삭제 Delete Idempotent
  - GET과 DELETE는 행위가 명확하지만, POST와 PUT을 구분하기 위해서는 멱등성의 개념을 알아야 한다.

- 멱등성 (Idempotence)이란?
  - 여러 번 수행해도 결과가 같음을 의미
  - GET, PUT, DELETE는 같은 경로로 여러 번 호출해도 그 결과가 같다.
  - 그러나, POST는 매 호출마다 새로운 데이터가 추가된다.
  - 즉, POST는 결과가 Idempotent하지 않지만, PUT은 반복 수행해도 그 결과가 Idempotent 하다.
