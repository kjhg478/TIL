## redux-thunk
- 비동기 작업을 처리 할 때 가장 많이 사용하는 미들웨어
- 액션 객체가 아닌 함수를 디스패치 할 수 있다.

```Javascript
const thunk = store => next => action => typeof action === 'function' ? action(store.dispatch, store.getState) : next(action)

// 함수를 디스패치 할 때 해당 함수에서 dispatch와 getState를 파라미터로 받아와 주어야 함 이 함수를 만들어주는 함수를 thunk 함수
```
