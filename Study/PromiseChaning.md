## Promise Chaining
- 프로미스를 여러 개 연결하여 사용할 수 있다. then() 메서드를 호출하고 나면 새로운 프로미스 객체가 반환된다.

- 예제코드
```Javascript
function getData() {
  return new Promise({
    // ...
  });
}

// then() 으로 여러 개의 프로미스를 연결한 형식
getData()
  .then(function(data) {
    // ...
  })
  .then(function() {
    // ...
  })
  .then(function() {
    // ...
  });

  // setTimeout 예제
new Promise(function(resolve, reject){
  setTimeout(function() {
    resolve(1);
  }, 2000);
})
.then(function(result) {
  console.log(result); // 1
  return result + 10;
})
.then(function(result) {
  console.log(result); // 11
  return result + 20;
})
.then(function(result) {
  console.log(result); // 31
});
```
- 프로미스 연결 사례
```Javascript
getData(userInfo)
  .then(parseValue)
  .then(auth)
  .then(diaplay);

var userInfo = {
  id: 'test@abc.com',
  pw: '****'
};

function parseValue() {
  return new Promise({
    // ...
  });
}
function auth() {
  return new Promise({
    // ...
  });
}
function display() {
  return new Promise({
    // ...
  });
}
```

- 출처 : 캡틴판교
