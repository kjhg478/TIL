## Bubbling(버블링)

- Example

```Javascript
<div onclick="alert('div에 할당한 핸들러!')">
  <em><code>EM</code>을 클릭했는데도 <code>DIV</code>에 할당한 핸들러가 동작합니다.</em>
</div>
```

- 버블링
  - 한 요소에 이벤트가 발생하면, 이 요소에 할당된 핸들러가 동작하고 이어서 부모 요소의 핸들러가 동작합니다.
    가장 최상단의 조상 요소를 만날 때까지 이 과정이 반복되면서 요소 각각에 할당된 핸들러가 동작합니다.

```Javascript
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>

```

- 가장 안쪽의 <p>를 클릭하면?
  1. <p>에 할당된 onClick 핸들러가 동작합니다.
  2. 바깥의 <div>에 할당된 핸들러가 동작합니다.
  3. 그 바깥의 <form>에 할당된 핸들러가 동작합니다.
  4. document 객체를 만날 때 까지, 각 요소에 할당된 onClick 핸들러가 동작합니다.
  - 즉, <p>요소를 클릭하면 p -> div -> form 순서로 3개의 alert 창이 뜹니다.
  - 이런 흐름을 '이벤트 버블링'이라고 하며, 이벤트가 제일 깊은 곳에 있는 요소에서 시작해 부모 요소로 거슬러 올라가며 발생하는 모양이 물속 거품과 닮았다고 하여 버블링이라고 부릅니다.
  - 거의 모든 이벤트는 버블링 됩니다. (거의? focus 이벤트와 같이 버블링 되지 않는 이벤트도 있습니다.)

#### event.target

    - 부모 요소의 핸들러는 이벤트가 정확히 어디서 발생했는지 등ㅇ에 대한 자세한 정보를 얻을 수 있다.
    - 이벤트가 발생한 가장 안쪽의 요소는 target(타깃) 요소라고 불리고, event.target을 사용해 접근할 수 있습니다.
        - event.target과 this(event.currentTarget)의 차이
            1. event.target은 실제 이벤트가 시작된 '타깃' 요소입니다. 버블링이 진행되어도 변하지 않습니다.
            2. this는 '현재' 요소로, 현재 실행 중인 핸들러가 할당된 요소를 참조합니다.

    - Example)
        - 핸들러는 form.onClick 하나밖에 없지만 이 핸들러에서 폼 안의 모든 요소에서 발생하는 클릭 이벤트를 잡아내고(catch) 있습니다.
        클릭 이벤트가 어디서 발생했든 상관없이 <form> 요소까지 이벤트가 버블링 되어 핸들러를 실행 시키기 때문
        - form.onClick 핸들러 내의 this와 event.target은 ?
            1. this(event.currentTarget) : <form> 요소에 있는 핸들러가 동작했기 때문에 <form> 요소를 가리킵니다.
            2. event.target : 폼 안쪽에 실제 클릭한 요소를 가리킵니다.
