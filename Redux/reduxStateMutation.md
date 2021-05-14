## reduxStateMutation
- mutate state를 절대 쓰면 안된다 ! mutate하는 게 아니라 새로운 objects를 리턴 해야 한다.
    - react는 상황이 바뀌면 UI를 다시 렌더링 하는데, 새로운 것을 만드는 대신 변경하면 Javascript가 객체가 다른지 알기 어렵다.
    - 직접적으로 변경하려면 render() 설정들이 작동을 하지 않아 리렌더링이 되지 않음!
- 즉, 상태를 수정하는 것이 아니라 새로운 것(새로운 state)을 return해야 한다.
- mutation의 예
```Javascript
    const friends = ["dal"];
    friends.push("lynn");
    console.log(friends);
    // mutation
```

- 예제코드
```Javascript
import {creatStore} from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DLELTE_TODO = "DELETE_TODO";

const addToDo = text = > {
    return {
        type:ADD_TODO,
        text
    };
};

const deleteToDo = id => {
    return {
        type: DELETE_TODO, 
        id
    };
};

const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            // return [{text:action.text id: Date.now()}, ...state] 
        // 공식문서에는 reducer 안에서 Date.now()를 쓰지 않길 권장 /  ...state와 위치를 바꾸면서 출력 위치 조정 가능
            const newToDoObj = {text: action.text, id:Date.now()};
            return [newToDoObj, ...state];
        case DELETE_TODO:
            // return state.filter(toDo => toDo.id !== action.id);
            const cleaned = state.filter(toDo => toDo.id !== action.id);
            return cleaned;
        default:
            return state;
    }
};

const store = createStore(reducer);

store.subscribe(()=>console.log(store.getState()));

const dispatchDeleteToDo = text => {
    store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = e => {
    const id = parseInt(e.target.parentNode.id);
    store.dispatch(deleteTodo(id));
};

const paintToDos = () => {
    const toDos = store.getState();
    ul.innerHTML = "";
    toDos.forEach(toDo => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.innerText = "DEL";
        btn.addEventListener("click", dispatchDeleteToDo);
        li.id = toDo.id;
        li.innerText = toDo.text;
        li.appendChild(btn);
        ul.appendChild(li);
    });
};

store.subscribe(paintToDos);

const onSubmit = e => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    dispatchAddTodo(toDo);
};

form.addEventListener("submit", onSubmit);

```
