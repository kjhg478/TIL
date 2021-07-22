## RestAPI

- API (Application Programming Interface)

  - 응용 프로그램에서 운영체제나 프로그래밍 언어가 제공하는 기능을 제어할 수 있게 만든 인터페이스를 뜻한다.
  - 주로 파일 제어, 창 제어, 화상 처리, 문자 제어 등을 위한 인터페이스를 제공합니다.
  - 애플리케이션과 운영체제, 애플리케이션과 프로그래밍 언어가 제공하는 기능 사이의 상호 작용을 도와준다.
  - 기본적으로 웹은 요청과 응답으로 작동한다.

- REST API

  - REST API는 웹상에서 사용되는 여러 리소스를 HTTP URI로 표현하고, 해당 리소스에 대한 행위를 HTTP Method로 정의하는 방식
  - 리소스 (HTTP URI로 정의됨)를 HTTP Method + Payload를 구조적으로 깔끔하게 표현하는 방법

- REST API 설계 규칙

  1. URI는 정보의 자원을 표현해야 한다.
  2. 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE)로 표현한다.

- REST URI 설계 시 주의할 점
  1. 슬래시 구분자(/)는 계층 관계를 나타내는 데 사용
  2. URI 마지막 문자로 슬래시(/)를 포함하지 않는다.
  3. URI에 \_는 사용하지 않도록 하며, 대문자보단 소문자를 쓴다
  4. URI에 동사는 HTTP Method를 표현하기 때문에, 동사가 아니라 명사를 쓴다.

```Javascript

GET/members/delete/1
// URI는 자원을 표현하는데 중점을 둬야 한다. delete와 같은 행위에 대한 표현이 들어가면 안됨

DELETE/members/1
// 자원에 대한 행위를 HTTP Method로 표현

```

- HTTP 응답상태 코드
