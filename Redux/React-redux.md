## React-redux
- 리액트는 컴포넌트들로 구성되어 있다. (App 컴포넌트와 하위 컴포넌트들로 구성)
- App에서는 Global State를 사용하고, 하위 컴포넌트에서는 Local State를 사용한다.
- 이 때, 전역과 지역 state를 사용해야 하기 때문에 state를 공요해야 하는 상황이 발생한다.
- 그것을 쉽게 해결하기 위해 redux를 사용 !
- 쉽게 얘기해서 Shared State를 저장하는 store라고 표현할 수 있다.
- 리액트에 리덕스를 연결해서 모아둔 state들은 모든 리액트 파일에서 접근이 가능해야 한다.
- Provider를 감싸줌으로써 자식 컴포넌트들은 store에 접근이 가능해짐