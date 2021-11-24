## 이벤트 위임 (EventDelegation)

- 이벤트 위임
  - 이벤트 위임이란 동적으로 노드를 생성하고 삭제할 때 각 노드에 대해 이벤트를 추가 하지 않고,
    상위 노드에서 하위 노드의 이벤트를 제어하는 방식

```Javascript

// 리스트 추가 기능
var addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addList);

function addList() {
  var ul = document.getElementById("sampleList");
  var li = document.createElement("li");
  var listOrder = ul.children.length + 1;
  li.setAttribute("id", "list" + listOrder);
  li.appendChild(document.createTextNode("추가 리스트 " + listOrder));
  ul.appendChild(li);
}

// 리스트 삭제 기능
var lists = document.querySelectorAll('li');
lists.forEach(function(li) {
  li.addEventListener('click', deleteList);
});

function deleteList() {
  var id = event.target.id;
  document.getElementById(id).classList.toggle('remove');
}

// 새로 추가된 리스트는 클릭해도 삭제 기능이 동작하지 않음 (새롭게 추가된 리스트는 이벤트 리스너가 등록되지 않았기 때문)
// 이럴 때 이벤트 위임패턴을 사용하여 해결 가능!

```

```Javascript

// 리스트 추가 기능
var addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addList);

function addList() {
  var ul = document.getElementById("sampleList");
  var li = document.createElement("li");
  var listOrder = ul.children.length + 1;
  li.setAttribute("id", "list" + listOrder);
  li.appendChild(document.createTextNode("추가 리스트 " + listOrder));
  ul.appendChild(li);
}

// 리스트 삭제 기능
// var lists = document.querySelectorAll('li');
// lists.forEach(function(li) {
//  li.addEventListener('click', deleteList);
// });

var lists = document.getElementById("sampleList");
lists.addEventListener('click', deleteList);

function deleteList() {
  var id = event.target.id;
  document.getElementById(id).classList.toggle('remove');
}


```

- 이벤트 위임을 위한 코드
  - 화면의 모든 li에 이벤트 리스너를 추가하는 대신 li 상위 요소인 ul 태그에,
    이벤트 리스너를 연결 하고, 하위에서 발생한 클릭 이벤트를 감지 하는 것

### 정리

    - 이벤트 위임의 발생 원리는 자식 요소에서 발생한 이벤트가 부모 요소로 전파되는 이벤트 버블링을 이용한 것
    - 이벤트 위임이 필요없는 하위 요소가 있을 경우, 불필요한 이벤트가 발생할 수 있기 때문에 이 부분에 따로 이벤트 처리를 해줘야 함
