## AsyncAwait
- async await은 자바스크립트의 비동기 처리 문법
- 기존 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완하고 가독성이 좋게 코드 작성을 도와줌
---------------------------------------------------------
- async await
    - 먼저 함수의 앞에 async라는 예약어를 붙인다.
    - 그리고 함수의 내부 로직 중 HTTP 통신을 하는 비동기 처리 코드 앞에 await를 붙인다.
    - 주의해야 할 점은 비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 await이 의도한대로 동작한다. (axios 등 프로미스를 반환하는 API 호출 함수)

- 예제코드
```Javascript
function fetchItems() {
  return new Promise(function(resolve, reject) {
    var items = [1,2,3];
    resolve(items)
  });
}

async function logItems() {
  var resultItems = await fetchItems();
  console.log(resultItems); // [1,2,3]
}
```
---------------------------------------------------------
- async await 실용 예제
```Javascript
function fetchUser() {
  var url = 'https://jsonplaceholder.typicode.com/users/1'
  return fetch(url).then(function(response) {
    return response.json();
  });
}

function fetchTodo() {
  var url = 'https://jsonplaceholder.typicode.com/todos/1';
  return fetch(url).then(function(response) {
    return response.json();
  });
}

async function logTodoTitle() {
  var user = await fetchUser();
  if (user.id === 1) {
    var todo = await fetchTodo();
    console.log(todo.title); // delectus aut autem
  }
}
```
- fetchUser()를 이용하여 사용자 정보 호출
- 받아온 사용자 아이디가 1이면 할 일 정보 호출
- 받아온 할 일 정보의 제목을 콘솔에 출력
- 위 코드를 promise나 callback으로 처리 시, 코드가 훨씬 더 길어졌을 텐데 가독성과 편리하게 비동기 처리 가능 !
---------------------------------------------------------
- async await 예외 처리
    - try catch를 이용해 에러 처리를 할 수 있다.
    - 네트워크 통신 오류 뿐만 아니라 간단한 타입 오류, 일반적인 오류까지도 catch로 잡아 낼 수 있다.

```Javascript
async function logTodoTitle() {
  try {
    var user = await fetchUser();
    if (user.id === 1) {
      var todo = await fetchTodo();
      console.log(todo.title); // delectus aut autem
    }
  } catch (error) {
    console.log(error);
  }
}
```

- 출처 : 캡틴판교
