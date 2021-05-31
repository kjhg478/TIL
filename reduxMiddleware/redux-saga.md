## redux-saga

- generator에 기반한 미들웨어 라이브러리
- 액션을 모니터링 하고 있다가, 특정 액션이 발생하면 이에 따라 특정 작업을 하는 방식으로 사용
- 특정 자바스크립트 실행 및 액션을 디스패치 하거나 현재 상태를 불러오는 것
- redux-saga의 장점

  - 비동기 작업을 할 때 기존 요청 취소 가능
  - 특정 액션이 발생했을 때 이에 따라 다른 액션이 디스패치되게끔 하거나, 자바스크립트 코드 실행 가능
  - 웹소켓을 사용하는 경우, Channel 이라는 기능을 사용하여 더욱 효율적으로 코드를 관리 할 수 있다. [참고](https://medium.com/@pierremaoui/using-websockets-with-redux-sagas-a2bf26467cab)
  - API 요청이 실패했을 때 재요청하는 작업을 할 수 있다.

- generator 문법
  - 함수의 흐름을 특정 구간에 멈춰놓았다가 다시 실행할 수 있다.
  - 결과값을 여러번 내보낼 수 있다.
  - 함수에서 값을 여러번에 걸쳐서 반환하는 것은 불가능하지만, 이 함수는 값을 순차적으로 반환 가능

```Javascript
// generator 함수는 function* 이라는 키워드를 사용
function* generatorFunction() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}
// generator 함수를 호출한다고 해서 해당 함수 안의 코드가 바로 시작되지는 않고, generator.next()를 통해 호출 가능

```

- redux-saga/effects : 리덕스 사가 미들웨어가 작업을 명령하는 것
  - delay : 몇초동안 기다려라
  - put : 특정 액션을 디스패치 해라 (take로 액션을 캐치해서 api 호출을 call로 실행하며, 성공/실패 여부에 따라 리덕스 스토어에 반영)
  - call : 함수의 동기적 호출을 할 때 사용 (call에 넘겨진 함수가 promise를 리턴하면 그 값이 resolved 될 때까지 call()을 호출한 부분에서 실행이 멈춤)
  - fork : 함수의 비동기적인 호출을 할 때 사용 (순서 상관없이)
  - takeLatest : 액션 호출 시 같은 액션이 실행중이면 그 액션은 파기되고 마지막 호출만 실행
  - takeEvery : takeLatest와 다르게 모든 액션마다 실행된다.
  - select() : state에서 데이터를 꺼내오기 위한 함수

```Javascript
// modules/counter.js

import { delay, put } from 'redux-saga/effects';

// 액션 타입
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';

// 액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

function* increaseSaga() {
  yield delay(1000); // 1초를 기다립니다.
  yield put(increase()); // put은 특정 액션을 디스패치 해줍니다.
}
function* decreaseSaga() {
  yield delay(1000); // 1초를 기다립니다.
  yield put(decrease()); // put은 특정 액션을 디스패치 해줍니다.
}

export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 액션을 처리
  yield takeLatest(DECREASE_ASYNC, decreaseSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
}

// 초깃값 (상태가 객체가 아니라 그냥 숫자여도 상관 없습니다.)
const initialState = 0;

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}

```

```Javascript

// modules/index.js

import { combineReducers } from 'redux';
import counter, { counterSaga } from './counter';
import posts from './posts';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ counter, posts });
export function* rootSaga() {
  yield all([counterSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;

```

```Javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer, { rootSaga } from './modules';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware(); // 사가 미들웨어를 만듭니다.

const store = createStore(
  rootReducer,
  // logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk.withExtraArgument({ history: customHistory }),
      sagaMiddleware, // 사가 미들웨어를 적용하고
      logger
    )
  )
); // 여러개의 미들웨어를 적용 할 수 있습니다.

sagaMiddleware.run(rootSaga); // 루트 사가를 실행해줍니다.
// 주의: 스토어 생성이 된 다음에 위 코드를 실행해야합니다.

ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();

```
