## React.memo

- React.memo는 Higher-Order Components(HOC)이다. (HOC는 컴포넌트를 인자로 받아 새로운 컴포넌트를 다시 return 해주는 함수)
- 컴포넌트의 props가 바뀌지 않는다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화를 해줄 수 있음
- 리액트는 먼저 컴포넌트를 렌더링 한 뒤, 이전 렌더된 결과와 비교하여 DOM 업데이트를 결정한다.
  (만약 결과가 이전과 다르다면 React는 DOM을 업데이트 한다.)
- 컴포넌트가 React.memo()로 wrapping 될 때, 리액트는 컴포넌트를 렌더링하고 결과를 메모이징한다.
  그리고 다음 렌더링 때, props가 같다면 리액트는 메모이징 된 내용을 재사용한다.
- React.memo()를 사용하기 가장 좋은 케이스는 함수형 컴포넌트가 같은 props로 자주 렌더링 될거라 예상 될 때

---

- React.memo
  - export default React.memo(CreateUser); 이런식으로 감싸주면 됨
  - useCallback, useMemo, React.memo는 컴포넌트의 성능을 실제로 개선할 수 있는 상황에서만 사용 !

[출처](https://dmitripavlutin.com/use-react-memo-wisely)

```Javascript
export function Movie({ title, releaseDate }) {
  return (
    <div>
      <div>Movie title: {title}</div>
      <div>Release date: {releaseDate}</div>
    </div>
  );
}

export const MemoizedMovie = React.memo(Movie);

```

- React.memo(Movie)는 새로 메모이징된 컴포넌트인 MemoizedMovie를 반환한다.
- MemoizedMovie의 렌더링 결과는 메모이징 되어 있다. 만약 title이나 releaseDate 같은 props가 변경되지 않는다면 다음 렌더링 때 메모이징 된 내용을 그대로 사용

### React.memo() 와 콜백 함수

- 함수 객체는 일반 객체와 동일한 비교 원칙을 따른다.

```Javascript
//ex1)
/* 별도로 두번째 인자를 넘기지 않을 경우 props가 변하지 않는다면 재렌더링 되지 않음 */
const NameTag = React.memo(
  (props) => <div>{props.name}</div>
);

/* 만약 두번째 인자로 특정 props.name값이 같지 않을때만 재렌더링 하도록 커스텀 비교 함수를 넣어주고 싶을 때 */
const NameTag = React.memo(
  (props) => <div>{props.name}</div>
,
  (prevProps, nextProps) => prevProps.name === nextProps.name
)

// ex2)
// logout
function Logout({ username, onLogout }) {
  return <div onClick={onLogout}>Logout {username}</div>;
}

const MemoizedLogout = React.memo(Logout);

// myapp
function MyApp({ store, cookies }) {
  return (
    <div className="main">
      <header>
        <MemoizedLogout
          username={store.username}
          onLogout={() => cookies.clear()}
        />
      </header>
      {store.content}
    </div>
  );
}
// 동일한 username 값이 전달되더라도, MemoizedLogout은 새로운 onLogout 콜백 함수 때문에 리렌더링을 하게된다.
// 이 문제를 해결하기 위해 onLogout props의 값을 매번 동일한 콜백 인스턴스로 설정해야 한다. useCallback()을 이용해 콜백 인스턴스를 보존시킬 수 있다.

const MemoizedLogout = React.memo(Logout);

function MyApp({ store, cookies }) {
  const onLogout = useCallback(() => {
    cookies.clear();
  }, []);
  return (
    <div className="main">
      <header>
        <MemoizedLogout username={store.username} onLogout={onLogout} />
      </header>
      {store.content}
    </div>
  );
}
// useCallback(() => { cookies.clear() }, [])은 항상 같은 함수 인스턴스를 반환한다.
```
