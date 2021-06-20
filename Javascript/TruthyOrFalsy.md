## TruthyOrFalsy

```Javascript

console.log(!undefined)
console.log(!null)
console.log(!0)
console.log(!'')
console.log(!NaN)

// 이 5개를 제외한 나머지는 모두 Truthy한 값 !
```

## 단축 평가 논리 계산법

- 특정 값이 유효할 때 어떤 값을 조회해야만 하는 상황

```Javascript

console.log(true && 'hello'); // hello
console.log(false && 'hello'); // false
console.log('hello' && 'bye'); // bye (hello는 truthy한 값);

const person = {
    name : 'jongHunKim'
};

function getName(person) {
    return person && person.name;
    // if (name) {
    //     return person.name;
    // }
    // return undefined;
}

const name = getName(person);
console.log(name);

// 주로 어떠한 값이 없을 때 그거 대신에 이거 사용할래 할 때 유용
console.log(false || 'hello') // hello
console.log('' || '이름없다') // 이름없다
console.log(null || '널이다') // 널이다.
// undefined, 0
// || 연산자에서는 falsy 한 값일때 오른쪽 값을 바라봄
// truthy힌 값은 안봄

const nameLessPerson = {
    name: '',
};

const getName = person => {
    const name = person && person.name;
    return name || '이름이 없습니다.';
    // if (!name) {
    //     return '이름이 없습니다.';
    // }
    // return name;
};

const name = getName(nameLessPerson);
console.log(name);


```
