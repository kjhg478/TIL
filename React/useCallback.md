## useCallback

- useMemo와 비슷하지만 useMemo는 특정 결과값을 재사용 할 때 사용하는 반면,
- useCallback은 특정 함수를 새로 만들지 않고 재사용하고 싶을 때 사용 !

---

- useCallback

  - 함수 안에 사용하는 상태 혹은 props가 있다면 꼭, deps배열안에 포함시켜야 함 !
  - 함수 내에서 해당 값들을 참조할 때 가장 최신 값을 참조할 것이라는 보장이 없기 때문 !
  - ex) useCallback(callback, [변경되는값])
    - 두번째 배열이 바뀌기전까지 함수 자체를 기억
    - 함수 생성 자체가 오래 걸리는 경우 쓰면 최적화에 도움됨
    - 변경되는 값이 없다면 state 값을 맨 처음 값만 기억 (console로 확인)
    - 변경되는 값이 있을 때 새로운 값을 기억할 수 있다.
    - 자식 컴포넌트에 함수를 props로 내릴때는 useCallback을 반드시 사용 (자식 리렌더링 방지)

- useMemo의 이벤트 핸들러 함수는 내부의 값이 변경될 때마다 재선언 된다.
  그러나 사실 이벤트 핸들러 함수는 파라미터로 전달받은 이벤트 객체(e)의 값에 따라 실행해주기만 하면 되기 떄문에 첫 마운트 될 때 한번만 선언하고 재사용 할 수 있다.

```Javascript
// App.js

import React, { useState, useCallback } from "react";

const onChangeHandler = useCallback(e => {
    if (e.target.id === "color") setColor(e.target.value);
    else setMovie(e.target.value);
  }, []);

```

- 만약 하위 컴포넌트가 React.memo() 같은 것으로 최적화 되어 있고 하위 컴포넌트에게 callback 함수를 props로 넘길 때,
  상위 컴포넌트에서 useCallback으로 함수를 선언하는 것이 유용하다라는 의미이다. 함수가 매번 재선언되면 하위 컴포넌트는 넘겨 받은 함수가 달라졌다고 인식하기 때문이다.
  - React.memo()로 함수형 컴포넌트 자체를 감싸면 넘겨 받는 props가 변경되지 않았을 때는 상위 컴포넌트가 메모리제이션된 함수형 컴포넌트(이전에 렌더링된 결과)를 사용하게 된다.
  - 함수는 자기 자신만이 동일하기 때문에 상위 컴포넌트에서 callback 함수를 (같은 함수더라도) 재선언한다면
    props로 callback 함수를 넘겨 받는 하위 컴포넌트 입장에서는 props가 변경 되었다고 인식한다.
