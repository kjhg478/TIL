## JSTechnic

#### 1. Arrow Function

```Javascript

function sayHello(name) {
    console.log('Hello', name);
}

// change
sayHello = name => console.log('Hello', name);

```

#### 2. Default Parameter

```Javascript

function volume(l, w, h) {
  if (w === undefined)
    w = 3;
  if (h === undefined)
    h = 4;
  return l * w * h;
}

// change
volume = (l, w = 3, h = 4 ) => (l * w * h);
volume(2) // 24 = 2 * 3 * 4  (l=2)

```

#### 3. Object.entries(), Object.keys(), Object.values()

```Javascript

// Object.entries()
const credits = { producer: 'John', director: 'Jane', assistant: 'Peter' };
const arr = Object.entries(credits);
console.log(arr);
/*
[ [ 'producer', 'John' ],
  [ 'director', 'Jane' ],
  [ 'assistant', 'Peter' ]
]
*/

// Object.keys()
const credits = { producer: 'John', director: 'Jane', assistant: 'Peter' };
const arr = Object.values(credits);
console.log(arr);
// [ 'producer', 'director', 'assistant' ]

// Object.values()
const credits = { producer: 'John', director: 'Jane', assistant: 'Peter' };
const arr = Object.values(credits);
console.log(arr);
// [ 'John', 'Jane', 'Peter' ]

```

#### 4. Entries to Objects

- Entries 처럼 배열에 짝으로 키/값이 저장된 것을 다시 객체로 만듦

```Javascript

const list = arr.map(person => Object.assign(...person.map(([key, value]) => ({[key]:value}))))
// [{..}, {..}, {..}, ...]
// 0: {p: 'r', J: 'o'}
// 1: {d: 'i', J: 'a'}
// 2: {a: 's', P: 'e'}

```

#### 5. Short-circuit evaluation (|| operator)

- if 조건문 없이 값 설정, 확인 가능
- 연산자 || 기준으로 왼쪽값이 false(undefined, null, '', 0, false 등)일 시, 값이 true인 오른쪽값을 리턴한다. (왼쪽값 || 오른쪽값)
- 즉, 오른쪽에 있는 값을 기본값으로 설정한다고 생각하자

```Javascript

let person = {
  name: 'Jack',
  age: 34
}
console.log(person.job || 'unemployed');
// 'unemployed'
// person.job = false, 'unemployed' = true

let person = {
  name: 'Jack',
  age: 34,
  job: 'teacher'
}
console.log(person.job || 'unemployed');
// teacher
// person.job = true, 'unemployed' = true
// 'unemployed'가 true인지 확인하기 전에 person.job이 true이기 때문에 바로 그 값을 리턴한다.


let a;
let b = null;
let c = undefined;
let d = 4;
let e = 'five';

let f = a || b || c || d || e;

console.log(f);
// 4
// e까지 도달하기 전에 d가 true이기 때문에 4 출력

```

- Null, Undefined일 때, 기본값 설정 가능

```Javascript

let dbHost;
if (process.env.DB_HOST) {
  dbHost = process.env.DB_HOST;
} else {
  dbHost = 'localhost';
}

// change
const dbHost = process.env.DB_HOST || 'localhost';

```

- Null, Undefined, 또는 빈값이 아닌것을 확인하면서, 변수를 다른 변수에 저장하고 싶을 때

```Javascript

if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
     let variable2 = variable1;
}

// change
const variable2 = variable1  || 'new';
console.log(variable2 === 'new'); // true

```

#### 6. Create tally with .reduce()

- 배열 안 각 요소 개수를 객체로 변환하기

```Javascript

const fruitBasket = ['banana', 'cherry', 'orange', 'apple', 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ];

const count = fruitBasket.reduce( (tally, fruit) => {
  tally[fruit] = (tally[fruit] || 0) + 1 ; // tally[fruit]가 없으면 = 0, 있으면 +1을 해준다. 기본값이 0
  // tally[fruit] = (tally[fruit] + 1) || 1  : tally[fruit]가 있으면 + 1을 해준다 없으면 tally[fruit] = 1 (기본값)
  return tally;
} , {}) // 두 번째 인수로 초기값

console.log(count)
// { banana: 2, cherry: 3, orange: 3, apple: 2, fig: 1 }

```

#### 7. Flatten array of arrays with .reduce()

- 중첩배열 평탄화

```Javascript

const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

const flat = data.reduce((total, amount) => {
  return total.concat(amount);
}, []);

console.log(flat) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

```

- 배열 안, 객체 안에 있는 배열의 정보 가져오기

```Javascript

const data = [
  {a: 'happy', b: 'robin', c: ['blue','green']},
  {a: 'tired', b: 'panther', c: ['green','black','orange','blue']},
  {a: 'sad', b: 'goldfish', c: ['green','red']}
];

const colors = data.reduce((total, amount) => {
  amount.c.map( color => {
      total.push(color);
  })
  return total;
}, [])

console.log(colors)
//['blue','green','green','black','orange','blue','green','red']

// 중복 없는 결과값을 리턴하려면

const uniqueColors = data.reduce((total, amount) => {
  amount.c.map( color => {
    if (total.indexOf(color) === -1){  // indexOf -1 일 경우 배열 안에 없다는 뜻이다
     total.push(color);
    }
  });
  return total;
}, []);

console.log(uniqueColors); // [ 'blue', 'red', 'green', 'black', 'orange']

```

#### 8. Pipeline of functions with .reduce()

- 여러 함수들을 입력한 값에 순차적으로 적용하기

```Javascript

function increment(input) { return input + 1;}
function decrement(input) { return input — 1; }
function double(input) { return input * 2; }

let pipeline = [increment, double, decrement];
const result = pipeline.reduce(function(total, func) {
  return func(total);
}, 1);

console.log(result) // 입력한 값: 1  result = 3
// increment : 1 + 1  = 2
// double : 2 * 2 = 4
// decrement : 4 - 1 = 3

```

#### 참고 블로그 : https://velog.io/@jha0402/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BD%94%EB%93%9C-%ED%85%8C%ED%81%AC%EB%8B%89-%EB%AA%A8%EC%9D%8C%EC%A7%91
