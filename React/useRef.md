## useRef

- useRef는 DOM에 접근할 수 있게 해주는 녀석
- 어떠한 버튼을 클릭했을 때, focus를 하기 위해서 쓰거나, 임시 저장같은 역할을 할 수 있음
- 예를 들어, focus는 해당 함수명에 current.focus()라는 녀석을 이용해 초점을 맞추고 싶은 곳에 쓸 수 있음
- 컴포넌트가 리렌더링 될 때마다 기억할 수 있는 어떠한 값을 관리할 때도 사용 !
- 즉, useRef로 관리하는 값은 바뀌어도 컴포넌트가 리렌더링 되지 않는다 !

```Javascript
import React, { useRef } from "react";

const App = () => {
  // 1. Ref객체 만들기
  const here = useRef();
  2. focus( ) DOM API 호출
  setTimeout(() => here.current.focus(), 3000);
  return (
    <div>
      <h1>Hello</h1>
      // 2. 원하는 곳에 ref 값으로 설정하기
      <input ref={here} placeholder="how are you" />
    </div>
  );
};

export default App;
```
