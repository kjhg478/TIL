## Capturing (캡처링)

- 버블링 이외에도 '캡처링이라는 흐름이 존재하며, 실제 코드에선 자주 쓰이지 않지만 종종 유용한 경우가 있다.

- 표준 DOM 이벤트에서 정의한 이벤트 흐름엔 3가지 단계가 있다.
  1. 캡처링 단계 - 이벤트가 하위 요소로 전파되는 단계
  2. 타깃 단계 - 이벤트가 실제 타깃 요소에 전달되는 단계
  3. 버블링 단계 - 이벤트가 상위 요소로 전파되는 단계

![image](https://user-images.githubusercontent.com/31474272/127935786-ccd2999a-298f-464c-b51b-e67ef63e3f10.png)

- <td>를 클릭하면 이벤트가 최상위 조상에서 시작해 아래로 전파되고(캡처링 단계), 이벤트가 타깃 요소에 도착해 실행된 후(타깃 단계), 다시 위로 전파됩니다.(버블링 단계)
  이런 과정을 통해 요소에 할당된 이벤트 핸들러가 호출됩니다.
- on<event> 프로퍼티나 HTML 속성, addEventListener(event, handler)를 이용해 할당된 핸들러는 캡처링에 대해 전혀 알 수 없습니다.
- 이 핸들러들은 두 번째 혹은 세 번째 단계의 이벤트 흐름(타깃, 버블링 단계)에서만 동작합니다.

- 캡처링 단계에서 이벤트 잡기

```Javascript

elem.addEventListener(..., {capture: true})
elem.addEventListener(..., true)

```

- caputre 옵션
  - false이면 (default 값) 핸들러는 버블링 단계에서 동작
  - true면 핸들러는 캡처링 단계에서 동작

```Javascript

<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`캡쳐링: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`버블링: ${elem.tagName}`));
  }
</script>

```

- P를 클릭하면 다음과 같은 순서로 이벤트가 전달됩니다.

  1. HTML -> BODY -> FORM -> DIV (캡처링 단계, 첫 번째 리스너)
  2. P (타깃 단계, 캡처링과 버블링 둘 다에 리스너를 설정했기 때문에 두 번 호출됩니다.)
  3. DIV -> FORM -> BODY -> HTML (버블링 단계, 두 번째 리스너)

- 각 핸들러는 아래와 같은 event 객체의 프로퍼티에 접근할 수 있습니다.
  - event.target : 이벤트가 발생한 가장 안쪽의 요소
  - event.currentTarget (=this) : 이벤트를 핸들링 하는 현재 요소 (핸들러가 실제 할당된 요소)
  - event.eventPhase : 현재 이벤트 흐름 단계 (캡처링=1, 타깃=2, 버블링=3)
