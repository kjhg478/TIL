## Enum, Literal
- Enum
    - 연관된 아이템들을 함께 묶어서 표현할 수 있는 수단
    - 런타임시 존재하는 실제 객체를 의미
    - 숫자 열거형 (Numeric Enum) 속에 존재하는 값의 순서에 따라 번호를 매김
    - String Enum을 위해서는 값에 문자열을 할당해주면 됨 (조금 더 읽기 쉬운 값을 주는 장점이 있음)

- Literla Type
    - 집합 타입의 구체적인 하위 타입 ("Hello World"는 string이지만, string은 "Hello World가 아님")
    - 파이프 라인(|)으로 구분
    - ex) "male" | "female" | "genderNetural"

```Typescript
// 숫자 열거형 (Numeric Enums)
enum Direction {
    Up = 1,
    Down = 2,
    Left = 3,
    Right = 4,
}
// 문자열 열거형 (String Enums)
enum Direction {
    Up = "Up",
    Down = "Down",
    Left = "Left",
    Right = "Right"
}

```
-------------------------------------------------

#### 리터럴 타입 (Literal Type)

```Typescript
// 문자열 리터럴 타입 (String Literal Types)
type Easing = "ease-in" | "ease-out" | "ease-in-out;

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      // ...
    } else if (easing === "ease-out") {
    } else if (easing === "ease-in-out") {
    } else {
      // 하지만 누군가가 타입을 무시하게 된다면
      // 이곳에 도달하게 될 수 있습니다.
    }
  }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy");

function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... 추가적인 중복 정의들 ...
function createElement(tagName: string): Element {
  // ... 여기에 로직 추가 ...
}

// 숫자형 리터럴 타입 (Numeric Literal Types)
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
  return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}

const result = rollDice();

/** loc/lat 좌표에 지도를 생성합니다. */
declare function setupMap(config: MapConfig): void;
// ---생략---
interface MapConfig {
  lng: number;
  lat: number;
  tileSize: 8 | 16 | 32;
}

setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16 });
```