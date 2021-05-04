## React 
-----------------------------------------
- Rendering : HTML, CSS, JAVASCRIPT 등 개발자가 작성한 문서를 브라우저에서 그래픽 형태로 출력하는 과정
- 리액트 컴포넌트는 기본적으로 부모컴포넌트가 리렌더링 되면 자식 컴포넌트 또한 리렌더링이 된다. (바뀐 내용이 없더라도 동일)
- 물론, 실제 DOM에 변화가 반영되는 것은 바뀐 내용이 있는 컴포넌트에만 해당된다. (하지만 Virtual DOM에는 모든걸 다 렌더링 하고 있음)

- Fragments : 리액트에서 컴포넌트가 여러 엘리먼트를 반환하는 것은 흔한 패턴이다.
- Fragements는 DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화 할 수 있다.