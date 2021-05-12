## Redux
- Javascript Application들의 상태를 관리하는 방법
- Redux와 React와는 별개 ! (앵귤러, 뷰등도 사용 가능) 리덕스는 리액트에 의존하는 라이브러리가 아님
- store : 데이터를 저장하는 곳
    - action : redux에서 function을 부를 때 쓰는 두 번째 파라미터 또는 아규먼트로 reducer와 소통하기 위한 방법 
        - reducer와 소통하는 방법으로 Object여야 하며 그 key 이름은 항상 type 이여야 한다 (바꿀 수 없다.)
        - reducer를 만들 땐 switch문으로 하는 게 좋다 ! (공식문서에도 switch, but if문도 상관없음)
        - store를 사용하는 방법은 (store변수명).dispatch({key:value)를 입력해서 액션을 보낼 수 있다.
    - dispatch : reducer에게 action을 보내는 방법
    - subscribe : store 안에 있는 변화들을 알 수 있게 해줌 (store변수명).subscribe(func); : store 안의 변화를 감지하면 func tlfgod
- CreateStore : store를 만들고 reducer를 요구한다.
- Reducer : data를 modify 해주는 함수로 reducer가 return하는 것은 application에 있는 data가 됨
    - 현재 상태의 application과 함께 불려지는 Function( + with action ) return하는 것은 application의 state가 됨

### type을 "string"으로 바로 쓰는 대신에 constant 즉, const variable로 타입을 지정해서 사용하기 --> 에러 발견에 매우 용이

- 예제코드

```Javascript
import {createStore} from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action) => {
    switch (action.type) {
        case ADD:
            return count + 1;
        case MINUS:
            return count - 1;
        default:
            return count;
    }
}

const countStore = createStore(countModifier);

const onChange = () => {
    number.innerText = countStore.getState();
}
countStore.subscribe(onChange);

const handleAdd = () => {
    countStore.dispatch({type : ADD})
}
const handleMinus = () => {
    countStore.dispatch({type : MINUS});
}

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

```



