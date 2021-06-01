## contextAPI 활용

- 특정 함수를 특정 컴포넌트를 거쳐서 원하는 컴포넌트에 전달하는 작업이 흔히 발생 (3~4개 이상의 컴포넌트를 거쳐서 전달하면 매우 번거로움)
- 이 때, 리액트의 contextAPI와 dispatch를 함께 사용하여 복잡한 구조 해결 가능 !
- 프로젝트 안에서 전역적으로 사용할 수 있는 값을 관리 !
- 여기서 값은 함수, 외부 라이브러리 인스턴스, DOM일 수도 있음

---

- ex) const UserDispatch = React.createContext(null)
  - 파라미터에 context의 기본값 설정 가능 !
  - context를 쓸 때, 따로 지정하지 않을 경우 사용되는 기본값
  - context를 쓸 때, 따로 지정하지 않을 경우 사용되는 기본값
  - context를 만들면 context 안에 Provider 라는 컴포넌트가 들어있는데 이를 통해 context의 값을 정할 수 있다.
  - ex) <UserDispatch.Provider value={dispatch} />
    - 이렇게 Provider에 의하여 감싸진 컴포넌트 중 어디서든지 context의 값을 다른 곳에서 바로 조회하여 사용할 수 있다.

```Javascript
// GrandParent
import React, { createContext, useMemo, useState } from 'react';
import Parent from './Parent';

export const UserContext = createContext({
  setLoggedIn: () => {},
  setLoading: () => {},
});
const GrandParent = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const value = useMemo(() => ({ setLoggedIn, setLoading }), [setLoggedIn, setLoading]);
  return (
    <UserContext.Provider value={value}>
      <Parent />
      <div>{loggedIn ? '로그인' : '로그인안해'}</div>
      <div>{loading ? '로딩중' : '로딩안해'}</div>
    </UserContext.Provider>
  );
};
export default GrandParent;

// parent
import React from 'react';
import Children from './Children';

const Parent = () => {
  return <Children />;
};
export default Parent;

// children
import React, { useContext } from 'react';
import { UserContext } from './GrandParent';

const Children = () => {
  const { setLoading, setLoggedIn } = useContext(UserContext);
  return (
    <>
      <button onClick={() => setLoading((prev) => !prev)}>로딩토글</button>
      <button onClick={() => setLoggedIn((prev) => !prev)}>로딩토글</button>
    </>
  );
};
export default Children;

```

#### useContext를 쓸 때 주의할 사항

    - Provider에 제공한 value가 달라지면 useContext를 쓰고 있는 모든 컴포넌트가 리렌더링 된다.
    - value안에 setLoading과 setLoggedin이 들어있고, 앞으로 개수가 더 늘어나게 될 경우
      하나라도 바뀌면 객체로 묶여있어 전체가 리렌더링 됨
    - 자주 바뀌는 것들을 별도의 컨텍스트로 묶거나 (여러 개 사용가능, Provider로 잘 감싸줘야 함)
      자식 컴포넌트들을 적절히 분리해 pureComponent, React.memo 등으로 감싸주는 방법
