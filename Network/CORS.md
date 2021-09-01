## CORS (Cross Origin Resource Sharing)

- CORS란?

  - Cross Origin Resource Sharing : HTTP 헤더를 사용하여 브라우저가 한 출처에서 실행중인 웹 애플리케이션에 선택된 액세스 권한을 부여하도록 하는 메커니즘
  - 같은 주소, 같은 포트에 있는 리소스를 불러올 때는 문제가 없지만 다른 출처의 리소스를 요청하게 되면 보안적인 문제로 기본적으로 이를 차단

- CORS 해결 방법

  1. 동일한 출처 사용 (원초적 해결)
  2. 서버에서 해결 (Response)

  - HTTP 응답헤더 Access-Control-Allow-Origin: \* , Access-Control-Allow-Origin: 허용하고자 하는 도메인 설정
  - express에서는 이를 쉡게 해결해주는 미들웨어 제공

  ```Javascript
    const express = require('express')
    const cors = require('cors')
    const app = express()

    app.use(cors())
  ```

  - 기본적으로 origin : \* 이 설정됨

  3. 클라이언트쪽 해결 (Request)

     - 리소스를 요청하는 서버 사이에 프록시 서버를 하나 거쳐서 요청, 응답을 주고 받기
     - 프록시 서버 : 브라우저와 서버를 통신하는 과정 중간에서 정보교환을 도와주는 중간 서버 (브라우저 - 프록시 서버 - 서버)
     - 프록시 서버는 헤더를 추가하거나 요청을 허용/거부하는 역할을 중간에서 해줘서 Access-Control-Allow-Origin: \* 의 헤더를 담아 응답해준다.

- 프록시 서버

  - 프록시 서버는 클라이언트가 자신을 통해서 다른 네트워크 서비스에 간적접으로 접속할 수 있게 해주는 컴퓨터 시스템 및 응용 프로그램을 가리킨다.
  - 서버와 클라이언트 사이에 중계기로서 대리로 통신을 수행하는 것을 가리켜 프록시, 그 중계 기능을 하는 것을 프록시 서버라고 부른다.

- 프록시 서버 작동방식

  - 프록시 서버 중 일부는 프록시 서버에 요청된 내용들을 캐시를 이용해 저장해 둔다.

- 프록시 서버 장점

  1. 전송 시간 절약
  2. 불필요한 외부 연결을 하지 않아도 된다.

  - 캐시 안에 있는 정보를 요구하는 요청에 대해서 원격 서버에 접속하여 데이터를 가져올 필요가 없게 됨으로 전송 시간 절약 및 불필요한 외부 연결을 하지 않아도 된다.

  3. 네트워크 병목 현상을 방지

  - 추가로 외부 트래픽을 줄일 수 있어 네트워크 병목 현상을 방지하는 효과가 있다.