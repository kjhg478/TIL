## Single Page Application

- 전통적인 Page LifeCycle

  1. Client에서 서버로 요청을 보냄
  2. Server는 요청에 대한 응답을 보내고 Client에서 화면이 보임
  3. Client에서 인터랙션을 위한 요청을 Server에 보냄
  4. Server는 계속해서 이에 응답하고 페이지가 Reload 됨

- 이렇게 새로운 요청이 간단해도 계속해서 페이지가 리로드 됨
- 이러한 불편함을 해소하고자 SPA가 등장함
  - SPA는 필요한 정적 리소스를 최초에 한번 다운로드 함
  - 일부 변경이 있을 때 페이지 전체를 리로드 하지 않고 변경된 부분만 갱신
