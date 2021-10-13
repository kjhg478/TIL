## EventHandler

#### 웹에서의 클릭이벤트 전파

- progagation: 전파, 확산
- 자바스크립트의 이벤트는 가장 하위 뎁스의 엘리먼트부터 실행되고 상위로 전파되는 방식으로 실행됩니다.
- 사용자가 마우스로 웹페이지 내의 버튼을 클릭했을 때 버튼만 반응했다고 생각합니다.
- 하지만 웹페이지 내부에서는 버튼을 감싸고 있는 부모 태그들 또한 클릭 이벤트에 반응하게 됩니다. 이것을 Bubble Up(버블업)이라고 합니다.

```Html
  <ul onClick>
    <li onClick>
      <a onClick></a>
    </li>
  </ul>

```

- 위 구조는 a태그를 클릭했을 때, a 태그의 onClick -> li 태그의 onClick -> ul 태그의 onClick을 실행하게 됩니다.
- 만약 ul 태그에 클릭 이벤트가 있을 경우 a 태그를 클릭하는 순간에는 의도하지 않은 ul 태그의 클릭 이벤트가 실행됩니다.
- 이 때, stopPropagation을 이용하여 이벤트 전파를 중지할 수 있습니다.

#### event.stopProgagation()

- 상위 엘리먼트로의 이벤트 전파(이벤트 버블링)를 막기 위한 메서드
- 이벤트 캡처링과 버블링에 있어 현재 이벤트 이후의 전파를 막습니다.
- 부모태그로의 이벤트 전파를 중지하라는 의미

#### event.preventDefault()

- html에서 표준으로 제공하는 태그의 기본 이벤트 발생을 막는 메서드 (a, submit, button 각각 페이지 이동이나 form 데이터 전송 등의 기본 이벤트)
- preventDefault를 이해하기 위해서는 a태그를 유심히 봐야 합니다. a 태그는 내부적으로 href="#" 속성을 가지고 있습니다.
- a태그의 onClick을 달았을 경우, click 이벤트 또한 가지고 있기 때문에 a태그는 두 가지 행동을 하게 됩니다.
  1. click 이벤트
  2. 브라우저에게 href에 표시된 것으로 이동
- href="#" 속성을 넣고 웹브라우저는 이동하지 말아라라는 의도로 설정할 수 있지만 href="#" 속성은 웹브라우저가 다른 곳으로 이동하지는 않지만
  스크롤이 있는 곳에서는 페이지 상단으로 이동하게 됩니다. href="#~~~"으로 사용하는 것을 앵커(닻)라고 하는데 웹 브라우저의 최상단을 가리키는 앵커입니다.
- 이 브라우저의 행동을 막기 위해서 사용하는 것이 preventDefault입니다. a 태그처럼 클릭 이벤트 외에 별도의 브라우저 행동을 막기 위해 사용됩니다.

#### SyntheticEvent 그리고 nativeEvent

- 리액트에서 이벤트가 발생할 시, 이벤트 핸들러는 SuntheticEvent의 인스턴스를 전달한다.
- 일반적으로 우리가 사용하는 event 객체는 native event 객체가 아니라 래핑된 이벤트 객체인 SuntheticEvent를 사용

- SyntheticEvent

  - storPropagation과 preventDefault를 포함하여 브라우저의 기본 이벤트(nativeEvent)와 동일한 인터페이스를 보유
  - 리액트에서는 우리가 nativeEvent를 필요로 할 때 사용할 수 있도록 이벤트 안에 nativeEvent 객체를 부여했기 때문에 접근해서 사용 가능

- event.nativeEvent.stopImmediatePropagation()
  - 이벤트가 버블링되는 것을 방지하고 요소에서 동일한 이벤트 유형의 리스너가 트리거 되는 것을 방지합니다.
