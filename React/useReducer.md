## useReducer

- useState의 대체 함수이며, (state, action) => newState의 형태로 reducer를 받고 dispatch 메서드와 짝의 형태로 현재 state를 반환
  - useState 말고도 useReducer를 이용해 Hook 함수를 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있다.
  - reducer는 현재 상태와 액션 객체를 파라미터로 받아와 새로운 상태를 반환해주는 함수
  - 다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우
  - 다음 state가 이전 state에 의존적인 경우에 보통 useState보다 useReducer를 선호
  - useReducer는 자세한 업데이트를 트리거 하는 컴포넌트의 성능을 최적화 할 수 있게 하는데, 콜백 대신 dispatch를 전달 할 수 있기 때문

---

- useReducer
  - 첫 번째 파라미터는 reducer함수이고, 두 번째 파라미터는 초기 상태이다.
  - ex) const [state, dispatch] = useReducer(reducer, initialState)
  - state는 우리가 앞으로 컴포넌트에서 사용할 수 있는 상태
  - dispatch는 액션을 발생시키는 함수 dispatch ({type:'INCREMENT'}); 이런식으로 사용
  - combineReducers
    - 리덕스는 state를 한 곳에 모아두고 적재적소에 쓰기 위한 존재
    - state들을 한 파일에 치중하면 코드가 너무 많아서 관리하기 힘들 수 있다.
    - 각 기능에 해당하는 액션을 모아둔 store들이 있고 그 store들을 하나로 모아주는 역할
    - 이것이 곧 root store가 된다. (rootReducer)

```Javascript

const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
/*  const [state, dispatch] = useReducer(
        reducer,
        {count: initialState}
      );
    초기 state의 구체화 : useReducer state의 초기화에는 두 가지 방법이 있는데, 가장 간단한 방법은 초기 state를 두 번째 인자로 전달하는 것
*/
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

```
