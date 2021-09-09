## DestructuringAssignment (구조 분해 할당)

- 구조 분해 할당
  - 객체 : 키를 가진 데이터 여러 개를 하나의 엔티티에 저장할 때
  - 배열 : 컬렉션에 데이터를 순서대로 저장할 때
  - 함수의 매개변수가 많거나 매개변수 기본값이 필요한 경우 등에서도 구조 분해를 이용하면 좋다.

```Javascript

    let arr = ["Bora", "Lee"]

    // 구조 분해 할당을 이용해
    // firstName엔 arr[0]을
    // surname엔 arr[1]을 할당하였습니다.
    let [firstName, surname] = arr;

    alert(firstName); // Bora
    alert(surname); // Lee

    // split 같은 반환 값이 배열인 메서드를 함께 활용해도 좋다.
    let [firstName, surname] = "Bora Lee".split(' ');

```

- **분해(destructuring)는 파괴(destructive)를 의미하지 않습니다.**

  - 구조 분해 할당이란 어떤 것을 복사한 이후에 변수로 '분해(destructurize)' 해준다는 의미 때문에 붙여졌다. (이 과정에서 분해 대상은 수정 또는 파괴되지 않는다.)

  ```Javascript

      // let [firstName, surname] = arr;
      let firstName = arr[0];
      let surname = arr[1];

  ```

- '...'로 나머지 요소 가져오기

  - 배열 앞쪽에 위치한 값 몇 개만 필요하고 그 이후 나머지 값들은 모아서 저장하고 싶을 때

  ```Javascript

      let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

      alert(name1); // Julius
      alert(name2); // Caesar

      // `rest`는 배열입니다.
      alert(rest[0]); // Consul
      alert(rest[1]); // of the Roman Republic
      alert(rest.length); // 2

  ```

  - rest는 나머지 배열 요소들이 저장된 새로운 배열이 된다. (rest 대신 다른 이름 사용 가능)

- 기본값

  - 할당하고자 하는 변수의 개수가 분해하고자 하는 배열의 길이보다 크더라도 에러가 발생하지 않는다.
  - 할당할 값이 없으면 undefined로 취급되기 때문입니다.

  ```Javascript
      let [firstName, surname] = [];

      alert(firstName); // undefined
      alert(surname); // undefined

      // = 을 이용해 할당할 값이 없을 때 기본으로 할당해 줄 값인 '기본값' 설정 가능

      let [name = "Guest", surname = "Anonymous"] = ["Julius"];

      alert(name); // Julius (배열에서 받아온 값)
      alert(surname); // Anonymus (기본값)

  ```
