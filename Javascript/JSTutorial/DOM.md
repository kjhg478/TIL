## DOM

- DOM 탐색하기
  - DOM을 이용하면 요소와 요소의 콘텐츠에 무엇이든 할 수 있습니다.
  - 무언가 하기 전, 당연히 조작하고자 하는 DOM 객체에 접근하는 것이 선행되어야 합니다.
  - DOM에 수행하는 모든 연산은 document 객체에서 시작합니다. (document 객체는 DOM에 접근하기 위한 '진입점')
  - 진입점을 통과하면 어떤 노드에도 접근할 수 있습니다.

![image](https://user-images.githubusercontent.com/31474272/128269569-2fc9edde-e33e-4732-8fd6-a0696cb17a52.png)

- 트리 상단의 documentElement와 body
  - DOM 트리 상단의 노드들은 document가 제공하는 프로퍼티를 사용해 접근할 수 있습니다.
  - <html> = document.documentElement
      - document를 제외하고 DOM 트리 꼭대기에 있는 문서 노드는 <html> 태그에 해당하는 document.documentElement 입니다.
  - <body> = document.body
      - document.body는 <body> 요소에 해당하는 DOM 노드로, 자주 쓰이는 노드 중 하나입니다.
  - <head> = document.head
      - head 태그는 document.head로 접근할 수 있습니다.
  - DOM에서 null 값은 '존재하지 않음'이나 '해당하는 노드가 없음'을 의미

```Javascript
<html>

<head>
  <script>
    alert( "HEAD: " + document.body ); // null, 아직 <body>에 해당하는 노드가 생성되지 않았음
  </script>
</head>

<body>

  <script>
    alert( "BODY: " + document.body ); // HTMLBodyElement, 지금은 노드가 존재하므로 읽을 수 있음
  </script>

</body>
</html>

```

- childNodes, firstChild, lastChild로 자식 노드 탐색하기
  - 자식 노드(child node, children)는 바로 아래의 자식 요소를 나타냅니다.
    자식 노드는 부모 노드의 바로 아래에서 중첩 관계를 만듭니다. <head>와 <body>는 <html>요소의 자식 노드입니다.
  - 후손 노드(descendants)는 중첩 관계에 있는 모든 요소를 의미합니다. 자식 노드, 자식 노드의 모든 자식 노드 등이 후손 노드

```Javascript

<html>
<body>
  <div>시작</div>

  <ul>
    <li>
      <b>항목</b>
    </li>
  </ul>
</body>
</html>

```

- <body>는 <div>와 <ul>, 몇 개의 빈 텍스트 노드를 자식 노드로 갖는다.
    - <div>나 <ul>같은 <body>의 자식 요소뿐만 아니라 <ul>의 자식 노드인 <li>와 <b>같이 더 깊은 곳에 있는 중첩 요소도 <body>의 후손 노드가 됩니다.
    - childNodes 컬렉션은 텍스트 노드를 포함한 모든 자식 노드를 담고 있습니다.

- firstChild와 lastChild 프로퍼티를 이용하면 첫 번째, 마지막 자식 노드에 빠르게 접근이 가능합니다.

  - 이 프로퍼티들은 단축키 같은 역할을 하며, 자식 노드가 존재하면 아래 비교문은 항상 참이 됩니다.
  - elem.childNodes[0] === elem.firstChild
  - elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
  - 자식 노드의 존재 여부를 검사할 땐 함수 elem.hasChildNodes()를 사용할 수도 있다.

- DOM트리

  - HTML을 지탱하는 것은 태그(tag)입니다.
  - 문서 객체 모델(DOM)에 따르면, 모든 HTML 태그는 객체입니다. 태그 하나가 감싸고 있는 '자식' 태그는 중첩 태그라고 부릅니다. (태그 내의 문자 역시 객체)
  - 이런 모든 객체들은 자바스크립트를 통해 접근할 수 있고, 페이지를 조작할 때 이 객체를 사용합니다.
  - document.body는 <body>태그를 객체로 나타낸 것

- 트리에 있는 노드는 모두 객체
  - 태그는 요소 노드(element node) (혹은 그냥 요소)이고, 트리 구조를 구성합니다. <html>은 루트 노드가 되고, <head>와 <body>는 루트 노드의 자식이 됩니다.
  - 요소 내의 문자는 텍스트 노드가 됩니다.
  - 텍스트 노드에서 새 줄(new line)과 공백은 글자나 숫자처럼 항상 유효한 문자로 취급됩니다.
  - HTML 안의 모든 것은 (주석이라도) DOM을 구성합니다.
  - 노드 타입은 총 열 두가지인데, 실무에선 주로 네 가지 노드를 다룹니다.
    1. DOM의 '진입점'이 되는 문서(document)노드
    2. HTML 태그에서 만들어지며, DOM 트리를 구성하는 블록인 요소 노드 (element node)
    3. 텍스트를 포함하는 텍스트 노드 (text node)
    4. 화면에 보이지 않지만, 정보를 기록하고 자바스크립트를 사용해 이 정보를 DOM으로부터 읽을 수 있는 주석 노드
