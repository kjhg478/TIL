## input

- input의 개수가 여러개가 됐을 때, useState를 여러번 사용하고 onChance도 여러개 만들어서 구현할 수 있지만 좋은 방법은 아님
- 리액트에서 여러개의 input 상태를 관리하려면 객체를 복사하여 써야함 ( 불변성 유지 )
- input에 name을 설정하고 이벤트가 발생했을 때 값을 참조하는 것, useState에서는 문자열이 아니라 객체 형태의 상태를 관리
- 리액트에서 스타일을 지정할 때, {{}} 쓰는 이유는 자바스크립트 값이기 때문에 두번 감싼 것 ! (안에 있는 중괄호가 객체이고 그 객체를 감싸는 중괄호 !)

```Javascript
import React, { useState } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: '',
      nickname: '',
    })
  };


  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;

// 리액트 상태에서 객체를 수정해야 할 때에는
inputs[name] = value;
// 이렇게 직접 수정은 안되며, 새로운 객체를 만들어서 새로운 객체에 변화를 주고, 이를 상태로 사용해야 함
setInputs({
  ...inputs,
  [name]: value
});

```
