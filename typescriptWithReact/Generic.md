## Generic
- 재사용성이 높은 컴포넌트를 만들 때 자주 활용되는 특징입니다. 특히, 한 가지 타입보다 여러 가지 타입에서 동작하는 컴포넌트를 생성하는데 사용됨
- 파라미터 타입을 any로 가져온 것 처럼 어떤 값이든 넣어줄 수 있는데, 제네릭은 타입이 지켜지면서 사용할 수 있음 (String, Number든 각 타입에 맞게)
```Typescript
const getText = text => {
    return text;
}
getText("hi");
getText(10);
getText(true);

const getText<T>(text: T): T {
    return text;
}
getText<string>("hi");
getText<number>(10);
getText(boolean)(true);

function logText(text: string): string {
  return text;
}
function logText(text: any): any {
  return text;
}

function logText<T>(text: T): T {
  return text;
}

// #1
const text = logText<string>("Hello Generic");
// #2
const text = logText("Hello Generic");

```
