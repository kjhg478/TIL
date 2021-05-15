## ReduxToolkit
- 리덕스를 사용할 땐 많은 양의 코드를 써야 하는 듯한 느낌이 듬
- reduxToolkit은 적은양의 코드로 redux 코드를 짤 수 있게 도와줌
- createAction
    - 두 개의 object (type, payload) : 액션에게 보내고 싶어하는 정보와 함께 payload도 같이 보내짐
- createReducer : state를 mutate하기 쉽게 만들어줌
    - 첫 번째 아규먼트는 initaialState
    - createReducer를 사용할 땐, 새로운 state를 리턴해줘도 되고 state를 mutate(변이)해도 된다.

```Javascript
import { createStore } from "redux";
import { createAction, createReducer } from "@reduxjs/toolkit";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

/* const reducer = (state = [], action) => {
  switch (action.type) {  
    case addToDo.type:
      return [{ text: action.payload, id: Date.now() }, ...state];
    case deleteToDo.type:
      return state.filter(toDo => toDo.id !== action.payload);
    default:
      return state;
  }
}; */

const reducer = createReducer([], {
  [addToDo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() });
  },
  [deleteToDo]: (state, action) =>
    state.filter(toDo => toDo.id !== action.payload)
});

const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  deleteToDo
};

export default store;

```