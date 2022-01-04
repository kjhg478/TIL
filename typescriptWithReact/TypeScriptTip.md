## TypeScript Tip

---

### 1. enum 보다는 union type

- eunm을 사용하고 컴파일 해보면 객체가 생성되며, 런타임에 영향을 줍니다.
- 타입스크립트를 사용하는 가장 큰 이유는 정적 타입을 사용하기 위함인데 정적 타입 정보가 런타임에 영향을 준다는 사실
- enum을 선언하면 enum 자체가 타입이 되는데 타입스크립트에서는 enum은 변경될 수 있기 때문에 지양하는게 좋다. (새로운 버그가 생길 수 있음)

  - ts에서 enum 그 자체가 타입이다. (enum은 상수다. 고정값임에도 불구하고 변경이 가능하기 때문에)

  1. 숫자 열겨형은 유형이 안전하지 않다.

  ```Typescript
      enum zeroOrOne {
          Zero = 0,
          One = 1
      }
      const zeroOrOne: ZeroOrOne = 2; // no error
  ```

  2. 문자열 열겨형 선언은 중복될 수 있다.

  ```Typescript
          enum Day {
          Sunday = 'Sunday',
          Monday = 'Monday',
          Tuesday = 'Tuesday',
          Wednesday = 'Wednesday',
          Thursday = 'Thursday',
          Friday = 'Friday',
          Saturday = 'Saturday'
      }
  ```

```Typescript

    enum Fruit {
        Apple,
        Banna,
        Orange,
    }

    // union type
    type Fruit = "apple" | "banana" | "orange";

```

- const enum을 사용하면 런타임에 영향을 주진 않지만 그럼에도 unionType을 쓰는 것이 좋다.
- 생산성과도 관련이 있는데, enum은 값을 입력하기 위해 import 코드를 작성하지만 union type은 import를 할 필요가 없다.

```Typescript
    // enum 으로 정의한 경우 import 가 필요합니다
    import { Fruit } from '../type.ts';
    <FruitDetail fruit={Fruit.Apple}>

    // union type 으로 정의한 경우 import 는 필요하지 않습니다
    <FruitDetail fruit="apple">
```

---

### 2. 외부 패키지의 타입 치환하기

- 외부 패키지가 제공하는 타입을 수정하고 싶은 경우, 만약 외부 패키지가 제공하는 기능을 확장하면 타입도 일부 수정이 필요할 수도 있습니다.
- 외부 패키지 입장에서 타입을 미리 알 수 없는 경우도 있는데 react-redux에 useSelector로 한번 보겠습니다.

- common 이라는 속성은 우리가 정의해서 사용하는 속성입니다. useSelector에게 타입 정보를 제공한 적이 없으므로 에러가 납니다.

```Typescript

    const toast = useSelector(state => state.common.toast); // common 에러

```

- 한 가지 방법은 useSelector를 사용할 때마다 타입을 명시하는 방법이 있습니다.
- 하지만 이 방법은 useSelector를 사용할 때마다 타입 코드를 입력해줘야 하는데 반복작업이 싫습니다.

```Typescript

    const toast = useSelector((state: MyState) => state.common.toast);

```

- 다른 방법은 useTypedSelector.ts 라는 파일을 만들고 사용하는 것입니다.
- 이렇게 하면 한 가지 규칙이 생긴 상태로 사용할 수 있습니다.

```Typescript

    export default function useTypedSelector<R>(selector: (state: MyState) => R): R {
        return useSelector(selector);
    }

```

- 마지막 방법으로 react-redux의 DefaultRootState 타입을 치환하는 것입니다.
- react-redux는 DefaultRootState 타입을 정의해서 사용하고 있는데, 이 타입을 우리가 사용하는 타입으로 바꿔줄 수 있습니다.

```Typescript

    interface DefaultMyState {
        common: { ... };
    }
    declare module "react-redux" {
        interface DefaultRootState extends DefaultMyState {}
    }

```

---

### 3. index signature 보다는 mapped type

- ## index signature
- mapped type
  - 기존에 정의되어 있는 타입을 새로운 타입으로 변환해주는 문법을 의미 (자바스크립트 map() API 함수를 타입에 적용한 것과 같은 효과)

```Ts

// index signature
const PRICE_MAP: { [fruit: string]: number } = {
    apple: 1000,
    banana: 1500,
    orange: 2000,
};

// mapped type
const PRICE_MAP: { [fruit in Fruit]: number } = {
    apple: 1000,
    banana: 1500,
    orange: 2000,
};

function getDiscountedPrice(fruit: Fruit, discount: number) {
    return PRICE_MAP[fruit] - discount;
}

```

- 만일, Fruit 타입에 새로운 과일 mango가 추가됐을 때, PRICE_MAP에 망고의 가격 정보도 추가해야 합니다.
- index signature를 사용했다면 가격 정보를 추가하지 않아도 오류가 나지 않습니다.
- mapped type을 사용했다면 컴파일 에러가 나므로 실수를 방지할 수 있습니다.
