## styled-components

- Styled-Components

  - 리액트 라이브러리 중 가장 인기 있는 라이브러리
  - CSS in JS : JS안에 CSS를 작성하는 것을 의미

- Tagged Template Literal (``백틱, $, {expression})
  - 내장된 표현식을 허용하는 문자열 리터럴 (여러 줄로 이뤄진 문자열과 문자 보간 기능을 사용할 수 있다.)
  - 문자열 조합을 더욱 쉽게 할 수 있게 해주는 ES6 문법

```Javascript

const name = 'react';
const message = `hello ${name}`;

console.log(message);
// "hello react"


const red = '빨간색';
const blue = '파란색';
function favoriteColors(texts, ...values) {
   return texts.reduce((result, text, i) => `${result}${text}${values[i] ? `<b>${values[i]}</b>` : ''}`, '');
}
favoriteColors(`제가 좋아하는 색은 ${red}과 ${blue}입니다.`)
// 제가 좋아하는 색은 <b>빨간색</b>과 <b>파란색</b>입니다.
```

```Javascript

const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  background: ${props => props.color || 'black'};
  border-radius: 50%;
  ${props =>
    props.huge &&
    css`
      width: 10rem;
      height: 10rem;
    `}
`;

function App() {
  return <Circle color="red" huge />;
}

// 직접 해보는걸로
```
