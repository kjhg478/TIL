## Callback 함수
- 비동기 처리의 문제를 해결하기 위해 callback 함수를 사용할 수 있다.
- 콜백 함수를 연속해서 사용할 때 발생하는 콜백 지옥과 같은 단점
- 콜백 지옥을 해결하려면 콜백 함수를 분리해주면 되지만 조금 더 편하게 비동기 처리를 쓸 수 있는 함수들이 있다.
-----------------------------------------------------------------
- 비동기 형태로 전환하여 작업이 진행되는 동안 다른 작업도 하고 싶을 때
```Javascript
function work() {
    setTimeout(()=> {
        const start = Date.now();
        for(let i = 0; i < 100000000; i++) {}
        const end = Date.now();
        console.log(end - start + 'ms');
    }, 0);
}
console.log('작업 시작');
work();
console.log('다음 작업');

```
- work 함수가 끝난 다음에 어떤 작업을 처리하고 싶을 때

```Javascript
function work(callback) {
  setTimeout(() => {
    const start = Date.now();
    for (let i = 0; i < 1000000000; i++) {}
    const end = Date.now();
    console.log(end - start + 'ms');
    callback();
  }, 0);
}

console.log('작업 시작!');
work(() => {
  console.log('작업이 끝났어요!')
});
console.log('다음 작업');
```