## customHook

- 반복되는 로직을 쉽게 재사용하기 위해서 사용 ex) input을 관리하는 코드
- 커스텀 Hooks는 그 안에서, useState, useEffect, useReducer, useCallback 등
  Hooks를 사용하여 원하는 기능을 구현해주고, 컴포넌트에서 사용하고 싶은 값들을 반환해준다.

```Javascript
import { useState, useCallback } from 'react';

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  // change
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(form => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset];
}

export default useInputs;

// useInputs라는 Hook을 원하는 곳에서 호출하여 사용
```
