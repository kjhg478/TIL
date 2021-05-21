## reduxMiddleware
- 주로 비동기 작업을 처리 할 때 사용 ex) API 요청
- 리덕스 미들웨어는 하나의 함수이다.

#### redux-saga
- generator에 기반한 미들웨어 라이브러리
- 액션을 모니터링 하고 있다가, 특정 액션이 발생하면 이에 따라 특정 작업을 하는 방식으로 사용
- 특정 자바스크립트 실행 및 액션을 디스패치 하거나 현재 상태를 불러오는 것

- generator 문법
    - 함수의 흐름을 특정 구간에 멈춰놓았다가 다시 실행할 수 있다.
    - 결과값을 여러번 내보낼 수 있다.

- redux-saga/effects : 리덕스 사가 미들웨어가 작업을 명령하는 것
    - delay : 몇초동안 기다려라
    - put : 특정 액션을 디스패치 해라 (take로 액션을 캐치해서 api 호출을 call로 실행하며, 성공/실패 여부에 따라 리덕스 스토어에 반영)
    - call : 함수의 동기적 호출을 할 때 사용 (call에 넘겨진 함수가 promise를 리턴하면 그 값이 resolved 될 때까지 call()을 호출한 부분에서 실행이 멈춤)
    - fork : 함수의 비동기적인 호출을 할 때 사용 (순서 상관없이)
    - takeLatest : 액션 호출 시 같은 액션이 실행중이면 그 액션은 파기되고 마지막 호출만 실행
    - takeEvery : takeLatest와 다르게 모든 액션마다 실행된다.
    - select() : state에서 데이터를 꺼내오기 위한 함수