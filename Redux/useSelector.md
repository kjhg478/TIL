## useSelector

- 리액트 컴포넌트에서 리덕스 상태를 조회해서 사용할 때 최적화를 하기 위해 사용
- useSelector를 사용해서 리덕스 스토어의 상태를 조회할 때 만약 상태가 바뀌지 않았으면 리렌더링 하지 않는다.

### useSelector

- 리덕스 스토어 state에 접근할 수 있게 해준다.
- 즉, 리덕스 스토어 전체를 유일한 인자값으로 받고 함수 내부에서 이 인자값을 토대로 필요한 state만 골라 리턴하면 된다.

```Javascript

const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff
}));

```

- useSelector Hook을 통해 매번 렌더링 될 때마다 새로운 객체 { number, diff }를 만드는 것이기 때문에 상태가 바뀌었는지 바뀌지 않았는지 확인을 할 수 없어서 낭비 렌더링이 이루어짐
- useSelector를 최적화 하기 위해선 두 가지 방법이 있다.

  1. useSelector를 여러 번 사용

  ```Javascript
      const number = useSelector(state => state.counter.number);
      const diff = useSelector(state => state.counter.diff);
      // 이렇게 하면 해당 값들 하나라도 바뀌었을 때만 컴포넌트가 리렌더링 된다.
  ```

  2. react-redux의 shallowEqual 함수를 useSelector의 두 번째 인자로 전달해주는 것.

  - useSelector Hook의 두 번째 매개변수는 컴포넌트 렌더링 여부를 판단하는 역할을 합니다.
  - 이 매개변수가 없을 땐 참조값만 비교하는 단순 비교 함수가 사용됩니다. 따라서 선택자 함수가 객체 리터럴을 반환하면 컴포넌트가 불필요하게 렌더링 되는 문제를 발생
  - 이 때, react-redux의 shallowEqual 함수를 이용할 수 있습니다.다.
  - useSelector의 두 번째 파라미터는 equalityFn 입니다. (equalityFn?: (left: any, right: any) => boolean, shallowEqual<T>(left: T, right: any): boolean;)
  - 이전 값과 다음 값을 비교하여 true가 나오면 리렌더링을 하지 않고 false가 나오면 리렌더링을 합니다. (shallowEqual은 react-redux에 내장되어 있는 함수)

  ```Javascript
      import React from 'react';
      import { useSelector, useDispatch, shallowEqual } from 'react-redux';
      import Counter from '../components/Counter';
      import { increase, decrease, setDiff } from '../modules/counter';

      function CounterContainer() {
      // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
      // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
      const { number, diff } = useSelector(
          state => ({
          number: state.counter.number,
          diff: state.counter.diff
          }),
          shallowEqual
      );

      function CounterContainer() {
        const { number, diff } = useSelector(
            state => ({
            number: state.counter.number,
            diff: state.counter.diff
            }),
            (left, right) => {
                return left.diff === right.diff && left.number === rifght.number;
            }
        );
        // 이 역할을 shallowEqual이 역할을 대신 해준다.
  ```
