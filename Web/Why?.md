## Why?

#### React

- 강력한 커뮤니티
  - facebook
  - 레퍼런스 많음 (이슈 해결)
- 확장성
  - next.js
  - gastby
- RN(React Native)
  - 문법은 비슷하지만 React Interface와 ReactNative Interface는 차이가 있다.
- 경쟁상대?

  - React
    - 라이브러리
    - 자유도가 높음
    - 업데이트 주기가 빠르고 유저지원과 고객지원 및 문서화도 잘 되어있음
  - Vue
    - 프레임워크
    - 기능이 이미 다 정해져 있음
    - 순수 오픈소스로서 활용
  - Angular

    - 앵귤러가 바라보는 아키텍처가 리액트와 많이 다름 (해결하고자 하는 문제가 다름)
    - 리액트는 UI 자체에 대해 포커싱
    - 앵귤러는 Web Application을 만드는 행위에 좀 더 포커싱

  - 리액트를 대체할만한 것이 없다. (똑같은 결과물을 낼 수 있지만 과정이 다름)
  - 뷰나 앵귤러를 써도 렌더링 퍼포먼스 최적화를 충분히 잘할 수 있다.

#### Function Component

```Javascript

// 클래스형
// class선언 및 해야줘야 할 것들이 많음
// 객체지향측면으로 봤을 땐 필요하지만 React관점에서 jsx 엘리먼트를 만드는 과정에서는 불필요한 일들을 여러번 한다고 느낌
class Test extends React.Component {
    constructor() {
        super()
        // Javascript에서 super는 부모클래스 생성자의 참조이며, 자바스크립트는 언어적 제약사항으로서 생성자에서 super를 호출하기 전에는 this를 사용할 수 없습니다.

        this.state = {
            name: "react"
        };
    }
    render() {
        return (
            <div>Component</div>
            <div>{this.state.name}</div>
        )
    }
}

// 함수형
const Test = () => {
    const [name, setName] = useState("react");
    return (
        <div>{name}</div>
        <div>Component</div>
    )
}

export default function App() {
    return (
        <div>
            <h1>Hello React</h1>
        </div>
    );
}

```

- 함수형이 클래스형보다 훨씬 직관적 (동일한 컴포넌트임에도 불구하고)
- 실행속도가 더 빠름
- 그럼 왜 진작에 함수형컴포넌트를 쓰지 않았는가?
  - 리액트에는 기본적으로 중요한 라이프사이클이 있다.
  - 컴포넌트가 화면내에서 리액트 컴포넌트의 변화들을 캐치할 수 있어야 하지만 함수형 컴포넌트가 이런 것들이 되지 않았었음 (Component Render 시점, re-render)
  - React Hooks 등장
    - Hooks는 A라는 액션이 실행될 때 A라는 액션과 동시에 같이 실행되는 함수를 정의한 것
- Hooks는 함수로 뺄 수 있다 (CustomHooks)
  - useEffect내에서 실행해야 하는 함수를 별도의 파일로 만들어서 customHooks로 만들고 여러 파일에서 import해와서 쓸 수 있음
  - 하나의 비즈니스 로직을 여러 컴포넌트에서 재활용할 수 있음

#### Typescript

```Typescript

// type.ts
export interface UserData {
    name: string;
    company: string;
    age?: number;
}

export interface UserAPIData {
    userData: [UserData];
}

// App.tsx
import React from 'react';
import { UserAPIData } from "./type";

const MOCK_API: UserAPIData = {
    userData: [
        {
            name: "JongHun",
            company: "React"
        }
    ]
}

const User = ():JSX.Element => {
    const {name, company} = MOCK_API.userData[0];

    return (
      <div>
        <h1>{name}</h1>
        <h2>{company}</h2>
      </div>
    )
}


export default function App() {
    return <User />;
}

// 하나의 사이클 완성

```

- Data가 어떻게 생겼는지
- interface가 어떻게 생겼고 어떻게 정의하면 되는지 정확히 알 수 있음
- 자바스크립트에서 API가 어떻게 생겼지 탐색하면서 들어가는 것이 아닌,
  처음에 interface 정의를 잘 해놓고 그 interface를 갖다 쓰기만 하면 되는 형태로 사용하여 생산성의 도움을 줄 수 있다.

#### GraphQL

- graphQL

  - GraphQL의 중요한 가치는 graphql의 형태만 보더라도 이 데이터가 어떻게 생겼는지 이 테이블이 어떻게 생겼는지 알 수 있다.
  - 즉, 스키마를 정의하는 행위가 곧 쿼리이기 때문에 스키마를 어떻게 정의하느냐에 따라서 데이터를 가져오는 모양이 동일하다.

- Client에서 가져올 데이터를 직접 스키마 정의를 할 수 있다.
- Client 개발을 할 때, read에 들어가는 리소스를 많이 줄여줄 수 있다.

#### 정리하기

1. 렌더링의 대한 이해

   - 렌더링을 어떻게 하고, 렌더링의 어떤 방식이 있는지
   - CSR, SSR, SSG의 차이점

2. MSA, MFA, BFF 프론트엔드를 둘러싸고 있는 다양한 Architectures들

   - 프론트엔드 기술 관점보다 개발을 하는 관점에서 알고 모르고의 차이가 크다.

3. 리액트, 함수형 컴포넌트, 타입스크립트, 그래프큐엘의 대한 Why?

   - 좀 더 깊이있는 지식에 대해서는 스스로 학습
