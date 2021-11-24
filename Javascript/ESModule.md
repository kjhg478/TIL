# ESModule

### 모듈

- 모듈 덕분에 코드들이 작은 파일로 나누어질 수 있다.
- import & export가 가능

### Named Export

- 많은 것들을 export & import 하고 싶을 때

```Javascript
  // export
  export const plus = (a, b) => a + b;
  export const minus = (a, b) => a - b;
  export const divide = (a, b) => a / b;

  // import
  import { plus, minus, divide } from './math';
  // import 된 이름은 반드시 export한 것과 같아야 한다.

  // as import
  import { plus as add } from './math';

```

### default export

- 각 파일마다 단 한개의 default export만 존재할 수 있다.

```Javascript
  // export
  const plus = (a, b) => a + b;
  const minus = (a, b) => a - b;
  const divide = (a, b) => a / b;

  export default { plus, minus, divide };

  // import
  import math from './math';
  // want name
  import myMath from './math';

  math.plus(2, 2);

  // default export, named export를 한 줄에 섞을 수도 있다.
  const connectToDB = () => { db };
  export const getUrl = () => { get };
  export default connectToDB;

  // import
  import connect, { getUrl } from "./db";

```

### star export

- 모든 exported된 내용을 import 하고 싶을 때
- 단, default export가 없는 파일에서 가능

```Javascript
  // export
  export const plus = (a, b) => a + b;
  export const minus = (a, b) => a - b;
  export const divide = (a, b) => a / b;

  // * = everything math란 모듈에서 모든걸 import해서 myMath라는 객체에 넣는다는 뜻
  import * as myMath from './math';
  myMath.plus(2, 2);

```

### Dynamic import

- 실제로 유저가 사용할 모듈만 import 가능

```Javascript
  // way1
  function doMath() {
    import("./math").then(math => math.plus(2, 2));
  }
  btn.addEventListener("click", doMath);

  // way2
  async function doMath() {
    const math = await import("./math");
    math.plus(2, 2);
  }
  btn.addEventListener("click", doMath);

```
