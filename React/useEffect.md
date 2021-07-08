## useEffect

- 처음 화면에 나타나게 될 때 (마운트) 특정 작업 가능
- 화면이 사라질 때 (언마운트) 특정 작업 가능
- 업데이트 될 때 (특정 props가 바뀔 때) 특정 작업 가능

---

- useEffect
  - 첫 번째 파라미터에는 함수, 두 번째 파라미터에는 의존값이 들어있는 배열 (deps)을 넣는다.
  - 만약, deps 배열을 비우면, 컴포넌트가 처음 나타날때만 useEffect에 등록한 함수가 호출됨
  - useEffect는 함수를 반환 할 수 있는데 이를 cleanUp 함수라고 부른다. (cleanUP 함수는 useEffect에 대한 뒷정리를 해줌)
    - deps가 비어있는 경우에는 컴포넌트가 사라질 때 cleanUp 함수가 호출
  - deps에 특정 값을 넣게 된다면, 컴포넌트가 처음 마운트될 때도 호출이 되고, 지정한 값이 바뀔 때에도 호출이 됨
    - deps 안에 특정 값이 있다면 언마운트시에도 호출이 되고, 값이 바뀌기 직전에도 호출

```Javascript
useEffect(() => {
    console.log("마운트 될 때");
}, []);

useEffect(() => {
    console.log("렌더링 될 때");
});
// 잘 쓰지 않음

useEffect(() => {
    console.log(name);
    console.log("업데이트");
}, [name]);

useEffect(() => {
    return () => {
        console.log("클린업");
    };
}, []);

useEffect(() => {
console.log('user 값 설정');
console.log(user);
return () => {
    console.log('user 값 바뀌기 전');
    console.log(user);
};
}, [user]);
```
