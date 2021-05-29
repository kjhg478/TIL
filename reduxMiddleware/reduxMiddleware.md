## reduxMiddleware
- 주로 비동기 작업을 처리 할 때 사용 ex) API 요청
- 리덕스 미들웨어는 하나의 함수이다.

```Javascript
const middleware = store => next => action => {
    // 작업
}

function middleware(store) {
    return function (next) {
        return function (action) {
            // 작업
        }
    }
}

```

- 첫번째 store는 리덕스 스토어 인스턴스
- 이 안에 dispatch, getState, subscribe 내장 함수들이 들어있다.
- 두번째 next는 액션을 다음 미들웨어에게 전달하는 함수이다. next(action) 이런 형태로 처리되며 다음 미들웨어가 없다면 리듀서에게 액션을 전달해줌
- 세번째 action은 현재 처리하고 있는 액션 객체