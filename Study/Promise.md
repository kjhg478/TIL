## Promise 함수
- 자바스크립트 비동기 처리에 사용되는 객체입니다.
- 프로미스는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용한다. (일반적으로 웹 애플리케이션을 구현할 때 서버에서 데이터를 요청하고 받아올 때)
- 데이터를 받아오기도 전에 데이터를 다 받아온 것 처럼 데이터를 표시하려고 하면 오류가 발생하거나 오류가 뜨는데 이같은 문제를 해결할 때
-----------------------------------------------------------------
- 프로미스 함수
```Javascript
function getData(callback) {
  // new Promise() 추가
  return new Promise(function(resolve, reject) {
    $.get('url 주소/products/1', function(response) {
      // 데이터를 받으면 resolve() 호출
      resolve(response);
    });
  });
}

// getData()의 실행이 끝나면 호출되는 then()
getData().then(function(tableData) {
  // resolve()의 결과 값이 여기로 전달됨
  console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
});

```
- 프로미스의 3가지 상태 (여기서 상태란 프로미스의 처리 과정을 의미 new Promise()로 생성하고 종료될 때까지 3가지 상태를 갖는다.)
    - Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
    - Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
    - Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태

#### Pending(대기)
```Javascript
new Promise();

```
- 이렇게 메서드를 호출하면 대기 상태가 된다.

- new Promise() 메서드를 호출할 때 콜백 함수를 선언할 수 있고, 콜백 함수의 인자는 resolve, reject가 있다.
```Javascript
new Promise(function(resolve, reject) {

});
```

#### Fullfilled(이행)
- 콜백 함수의 인자 resolve를 아래와 같이 실행하면 이행(Fullfilled) 상태가 된다.
```Javascript
new Promise(function(resolve, reject) {
    resolve();
})
```
- 이행 상태가 되면 then()을 이용하여 처리 결과 값을 받을 수 있다.
```Javascript
function getData() {
    return new Promise(function(resolve, reject) {
        var data = 100;
        resolve(data);
    });
}

// resolve()의 결과값 data를 resolvedData로 받음
getData().then(function(resolvedData) {
    console.log(resolveData);
})
```

#### Rejected(실패)
- new Promise()로 프로미스 객체를 생성하면 콜백 함수 인자로 reject를 호출하면 실패 상태가 된다.
```Javascript
new Promise(function(resolve, reject) {
    reject();
})
```
- 이렇게 실패 상태가 되면 실패한 이유(실패 처리 결과값)를 catch()로 받을 수 있다.
```Javascript
function getData() {
    return new Promise(function(resolve, reject){
        reject(new Error("Request is failed"));
    });
}

// reject()의 결과 값 Error를 받음
getData().then().catch(function(err) {
    console.log(err);
})
```

- 출처 : 캡틴판교
