## Interface, Type
- 메소드 : 객체내에서 선언된 함수

- 인터페이스 (기본값 - void), 타입 (재사용 가능)
    - 클래스 또는 객체를 위한 타입을 지정할 때 사용하는 문법
    - 행위를 작성하지 않고 인터페이스가 가져야 할 속성만 기술할 수 있음
    - 인터페이스를 타입으로 가지는 값은 인터페이스의 구조를 그 값으로 가지도록 강제된다.
    - 인터페이스 내에서 메소드도 사용 가능하다.
    - 작성 중인 코드에 대한 더 많은 정보를 타입스크립트에게 제공
    - 객체에 대한 타입을 설정할 때 인터페이스를 쓰면 인터페이스를 쭉, 타입이면 타입 일관성을 유지해야 한다.

```Typescript
interface PeopleInterface {
    name: string
    age: number
}
const me: PeopleInterface = {
    name: "jh",
    age: "28",
}

type PeopleType = {
    name: string
    age: number
}

const my: PeopleType = {
    name: "kjh",
    age: "28"
}

```
- 위 코드에서 볼 수 있듯이, interface는 type과 마찬가지로 객체의 타입을 지정하는 각 방법이다.
- interface와 type은 같은 듯 하면서도 확실히 다르다. interface는 선언적 확장이 가능하다.

```Typescript
interface me {
    name: string
}
interface me {
    age: number
}

// Error : Duplicate identifier 'me'.
type me = {
    name: string
}
type me = {
    age: number
}
```

- 이외에도 인터페이스는 extends 키워드로 확장할 수 있지만, 타입은 안된다.
- 공식 문서에는 가능한 인터페이스 사용을 권장하지만 상황에 따라서 맞게 쓰는게 중요할 것 같다.