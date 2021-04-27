## Http 상태 코드 정리

> 4XX : Client error responses (내가 경험해본 것)
1. 400 : bad Request
    - 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없음을 의미
2. 401 : Unauthorized
    - 비인증 (인가되지 않은 접근자, 필수값 누락 등)
3. 403 : Forbidden
    - 클라이언트가 콘텐츠에 접근할 권리가 없음
4. 404 : Not Found
    - 해당 URL 찾지 못함
5. 405 : Method Not Allowed
    - 요청한 메소드가 서버에서 알고는 있지만, 제거되어 사용할 수 없음
6. 406 : Not Acceptable
    - 사용자 에이전트에서 정해준 규격에 따른 것을 찾지 않았을 때, 웹 서버에서 보냄