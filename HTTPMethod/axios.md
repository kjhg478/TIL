## axios

- Axios는 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리

- Axios
  - 요청 객체에 Url이 있다.
  - 써드 파티 라이브러리로 설치가 필요
  - 자동으로 Json 데이터 형식으로 변환 됨
  - data 속성을 사용
  - Promise API 사용
  - 요청과 응답 데이터의 변형

```Javascript

// axios.get
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345')
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

// axios.post
axios.post('/signup', { id: 'Fred', password: 'Flintstone' })
  .then(function (response) {
    console.log(response); })
  .catch(function (error) {
    console.log(error); });

// axios.all();
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()]) // <-- 이쪽
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
```
