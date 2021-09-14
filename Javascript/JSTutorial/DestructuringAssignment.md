## DestructuringAssignment (구조 분해 할당)

- 구조 분해 할당

  - 객체 : 키를 가진 데이터 여러 개를 하나의 엔티티에 저장할 때
  - 배열 : 컬렉션에 데이터를 순서대로 저장할 때
  - 함수의 매개변수가 많거나 매개변수 기본값이 필요한 경우 등에서도 구조 분해를 이용하면 좋다.

- 배열 분해하기

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

- 객체 분해하기

  ```Javascript
    // way 1
    let options = {
      title: "Menu",
      width: 100,
      height: 200
    };

    let { title, width, height } = options;

    // way 2

    let { width: w, height: h, title } = options;

    // width -> w
    // height -> h
    // title

    // way 3 : defaultValue
    let { width = 100, height = 200, title } = options;

    let { width: w = 100, height: h = 200, title } = options;

    // way 4 : '...'
    let { title, ...rest } = options;
    console.log(rest.width); // 100
    console.log(rest.height); // 200

  ```

- 중첩 구조 분해

  - 객체나 배열이 다른 객체나 배열을 포함하는 경우, 좀 더 복잡한 패턴을 사용하면 중첩 배열이나 객체의 정보를 추출할 수 있는데, 이를 중첩 구조 분해라고 한다.

  ```Javascript

    let options = {
      size: {
        width: 100,
        height: 200
      },
      items: ["Cake", "Donut"],
      extra: true
    };

    // 코드를 여러 줄에 걸쳐 작성해 의도하는 바를 명확히 드러냄
    let {
      size: {
        width,
        height
      },
      items: [item1, item2], // items는 여기에 할당
      title = "Menu" // 분해하려는 객체에 title 프로퍼티가 없으므로 기본값을 사용
    } = options;
  ```

- 함수 매개변수

  ```Javascript
    // way 1 : 가독성이 떨어지고 인수의 순서가 틀려 문제가 발생할 수 있음
    function showMenu(title = "Untitled", width = 200, height = 100, items = []) {

    }
    // 기본값을 사용해도 괜찮은 경우 아래와 같이 undefined를 여러 개 넘겨줘야 합니다.
    showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])

    // way 2 : refactoring
    // 함수에 전달할 객체
    let options = {
      title: "My menu",
      items: ["Item1", "Item2"]
    };

    // 똑똑한 함수는 전달받은 객체를 분해해 변수에 즉시 할당함
    function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
      // title, items – 객체 options에서 가져옴
      // width, height – 기본값
      alert( `${title} ${width} ${height}` ); // My Menu 200 100
      alert( items ); // Item1, Item2
    }

    showMenu(options);

    // way 3 : 중첩 객체와 콜론 조합
    let options = {
      title: "My menu",
      items: ["Item1", "Item2"]
    };

    function showMenu({
      title = "Untitled",
      width: w = 100,  // width는 w에,
      height: h = 200, // height는 h에,
      items: [item1, item2] // items의 첫 번째 요소는 item1에, 두 번째 요소는 item2에 할당함
    }) {
      alert( `${title} ${w} ${h}` ); // My Menu 100 200
      alert( item1 ); // Item1
      alert( item2 ); // Item2
    }

    showMenu(options);

  ```

  #### 함수 매개변수를 구조 분해할 땐, 반드시 인수가 전달된다고 가정되고 사용된다

  - 모든 인수에 기본값을 할당해 주려면 빈 객체를 명시적으로 전달해야 한다.

  ```Javascript
    showMenu({}); // 모든 인수에 기본값 할당

    showMenu(); // 에러 발생 가능성

    function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
      alert( `${title} ${width} ${height}` );
    }

    showMenu(); // Menu 100 200

  ```
