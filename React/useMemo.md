## useMemo

- useMemo는 memoized된 값을 return하는 Hook이다. (인자로 함수와 의존값을 받는다.)
- 메모이제이션 : 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거
- Memo는 "memoized"를 의미하며, 이전에 계산 한 값을 재사용 한다는 의미 ! (메모리 사용)
- 성능 최적화를 위해 useMemo라는 Hook을 사용하여 재사용 가능

---

- useMemo
  - 첫 번째 파라미터에는 어떻게 연산할지 정의하는 함수
  - 두 번째 파라미터에는 deps 배열을 넣어주는데, 이 배열안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산
  - 아니라면 이전에 연산한 값을 재사용 !
  - ex) useMemo(callback, [변경되는 값])
    - 두번째 배열이 바뀌기 전까지 값을 기억
    - 함수 컴포넌트는 매번 함수가 새로 그려지며 실행되기 때문에 한번만 실행되면 되는 함수도 계속 호출되는 문제 발생
    - 변경되는 값이 없다면 한번만 실행 후, 값을 보관하는 역할로 쓸 수 있다.

```Javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

function NameTag(props) {
  return useMemo(
    () => <div>{props.name}</div>
  ,
    [props.name]
  )
}
```

- React.memo와 useMemo 모두 props가 변하지 않으면(이전 props와 동일하면) 인자로 넘긴 함수는 재실행되지 않고,
  이전의 메모이즈된 결과를 반환한다는 점에서 같다.
- 그러나 React.memo는 HOC, useMemo는 hook이다.
- React.memo는 클래스형, 함수형 컴포넌트 모두 사용 가능하지만, useMemo는 hook이기 때문에 함수형 컴포넌트 안에서만 사용 가능
