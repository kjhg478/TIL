## LocalStorage와 SessionStorage

---

#### Web Storage Object

- localStorage와 sessionStorage는 브라우저 내에 키-값 쌍을 저장할 수 있게 해줍니다.
- 이 둘을 사용하면 페이지를 새로 고침하고(sessionStorage의 경우), 브라우저를 다시 실행해도(localStorage의 경우) 데이터가 사라지지 않고 남아있습니다.
- 그럼 쿠키를 사용하면 브라우저에 데이터를 저장할 수 있는데, 왜 또 다른 객체를 사용해 데이터를 저장하는 걸까요?
  - 쿠키와 다르게 웹 스토리지 객체는 네트워크 요청 시 서버로 전송되지 않습니다.
    - 이런 특징 때문에 쿠키보다 더 많은 자료를 보관할 수 있습니다.
    - 대부분의 브라우저가 최소 2MB 혹은 그 이상의 웹 스토리지 객체를 저장할 수 있도록 해줍니다.
      그리고 개발자가 브라우저 내 웹 스토리지 구성 방식을 설정할 수 있습니다.
  - 쿠키와 또 다른점은 서버가 HTTP 헤더를 통해 스토리지 객체를 조작할 수 없다는 것입니다. 웹 스토리지 객체 조작은 모두 자바스크립트 내에서 실행
  - 웹 스토리지 객체는 도메인·프로토콜·포트로 정의되는 origin에 묶여있습니다. 따라서 프로토콜과 서브 도메인이 다르면 데이터에 접근할 수 없습니다.

---

#### Web Storage Object의 Method and Property

- setItem(key, value) : 키, 값 쌍을 보관합니다.
- getItem(key) : 키에 해당하는 값을 받아옵니다.
- removeItem(key) : 키와 해당 값을 삭제합니다.
- clear() : 모든 것을 삭제합니다.
- key(index) : 인덱스에 해당하는 키를 받아옵니다.
- length : 저장된 항목의 개수를 얻습니다.

- 두 스토리지 객체는 Map과 유사합니다. setItem, getItem, removeItem을 지원하지만 인덱스를 사용해 키에 접근할 수 있다는 점 (key(index))에서 차이가 있습니다.

---

#### LocalStorage

- origin이 같은 경우 데이터는 모든 탭과 창에서 공유됩니다.
- 브라우저나 OS가 재시작하더라도 데이터가 파기되지 않습니다.

```Javascript

localStorage.setItem('test', 1);
// 브라우저를 닫고 열어보고, 다른 창에서도 페이지를 열어봐도 같은 결과가 나옴

alert(localStorage.getItem('test')); // 1

```

- origin(domain, port, protocol)만 같다면 url 경로는 달라도 동일한 결과를 볼 수 있습니다.
- localStorage는 동일한 origin을 가진 모든 창에서 공유되기 때문이며, 한 창에 데이터를 설정하면 다른 창에서도 변동 사항을 볼 수 있습니다.

- 일반 객체처럼 사용하기

  - localStorage의 키를 얻거단 설정할 때, 아래처럼 일반 객체와 유사한 방법을 사용할 수 있습니다.

  ```Javascript

      localStorage.test = 2;

      alert(localStorage.test); // 2

      delete localStorage.test;

  ```

  - 그러나 추천하지는 않습니다.

    1. 사용자는 length나 toString, localStorage의 내장 메서드를 키로 설정할 수 있습니다.
       getItem, setItem은 정상적으로 작동해도, 일단 객체처럼 다룰 때 에러가 발생할 수 있습니다.

    2. 데이터를 수정하면 storage 이벤트가 발생하는데, 이 이벤트는 localStorage를 객체처럼 접근할 땐 일어나지 않습니다.

- 키 순회하기

  - localStorage는 키를 사용해 값을 얻고, 설정하고, 삭제할 수 있게 해줍니다.
  - 스토리지 객체는 iterable 객체가 아니기 때문에 배열처럼 다루어 키-값을 얻을 수 있습니다.

  ```Javascript

      for(let i=0; i<localStorage.length; i++) {
          let key = localStorage.key(i);
          alert(`${key}: ${localStorage.getItem(key)}`);
      }

  ```

  - 일반 객체를 다룰 떄처럼 for key in localStorage 반복문을 사용해도 전체 키-값을 얻을 수 있습니다.
  - 하지만 이 방법은 필요하지 않는 내장 필드까지 출력됩니다.

  ```Javascript
      // 좋지 않은 방법
      for(let key in localStorage) {
          alert(key); // getItem, setItem 같은 내장 필드까지 출력됩니다.
      }

      // hasOwnProperty를 이용하여 프로토타입에서 상속받은 필드를 골라내야 합니다.
      for(let key in localStorage) {
          if (!localStorage.hasOwnProperty(key)) {
              continue; // setItem, getItem 등의 키를 건너뜁니다.
          }
          alert(`${key}: ${localStorage.getItem(key)}`);
      }

      // Object.keys로 '자기 자신'의 키를 받아온 다음 순회하는 방법도 사용 가능
      // Object.keys는 해당 객체에서 정의한 키만 반환하고 프로토타입에서 상속받은 키는 무시하기 때문
      let keys = Object.keys(localStorage);
      for(let key of keys) {
          alert(`${key}: ${localStorage.getItem(key)}`);
      }

  ```

- 문자열만 사용
  - localStorage의 키와 값은 반드시 문자열이어야 합니다.
  - 숫자나 객체 등 다른 자료형을 사용하게 되면 문자열로 자동 변환됩니다.

---

#### SessionStorage

- sessionStorage 객체는 localStorage에 비해 자주 사용되진 않습니다.
- 제공하는 프로퍼티와 메서드는 같지만, 훨씬 제한적이기 때문입니다.
  - sessionStorage는 현재 떠 있는 탭 내에서만 유지됩니다.
  - 같은 페이지라도 다른 탭에 있으면 다른 곳에 저장되기 떄문입니다.
  - 하나의 탭에 여러 개의 frame이 있는 경우엔 동일한 origin에서 왔다고 취급하기 때문에 sessionStorage가 공유됩니다.
- 페이지를 새로 고침할 때 sessionStorage에 저장된 데이터는 사라지지 않습니다. 하지만 탭을 닫고 열 때는 사라집니다.

```Javascript

    sessionStorage.setItem('test', 1);

    alert(sessionStorage.getItem('test', 1)); // 새로 고침 후 : 1

```

- 하지만 다른 탭에서 본 페이지를 열고 실행하면 null이 반환됩니다.
- 이렇게 sessionStorage는 origin뿐만 아니라 브라우저 탭에도 종속되어 있습니다. 이런 제약 때문에 잘 사용되지 않습니다.

---

#### 정리하기

- 웹 스토리지 객체 localStorage와 sessionStorage를 사용하면 브라우저에 키-값 쌍을 저장할 수 있습니다.

  - 키와 값은 반드시 문자열이어야 합니다.
  - 제한 용량은 5MB 이상인데, 브라우저에 따라 다를 수 있습니다.
  - 파기되지 않습니다.
  - 오리진에 묶여있습니다.

- storage 이벤트
  - setItem, removeItem, clear를 호출할 때 발생
  - 연산(key, oldValue, newValue)과 관련된 데이터 전체와 문서 url, 스토리지 객체 storageArea를 가지고 있습니다.
  - 이벤트가 생성된 곳을 제외하고 스토리지에 접근하는 모든 window 객체에서 일어납니다.
    - sessionStorage는 탭 내에서
    - localStorage는 전역에서
