## Promise Error
- 프로미스 에러 처리 방법은 2가지(then, catch)가 있지만 가급적 catch()로 처리하는 것이 더 효율적
- then()의 경우 오류를 제대로 잡아내지 못하는 경우 발생

- 예제코드
```Javascript
// then()의 두 번째 인자로는 감지하지 못하는 오류
function getData() {
  return new Promise(function(resolve, reject) {
    resolve('hi');
  });
}

getData().then(function(result) {
  console.log(result);
  throw new Error("Error in then()"); // Uncaught (in promise) Error: Error in then()
}, function(err) {
  console.log('then error : ', err);
});
}

// catch()로 오류를 감지하는 코드
function getData() {
  return new Promise(function(resolve, reject) {
    resolve('hi');
  });
}

getData().then(function(result) {
  console.log(result); // hi
  throw new Error("Error in then()");
}).catch(function(err) {
  console.log('then error : ', err); // then error :  Error: Error in then()
});
```

- 출처 : 캡틴판교
