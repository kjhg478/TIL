## JavascriptTip

- Nulish Coalescing Operator
  - leftCode ?? rightCode (왼쪽 코드가 null, undefined일 때만 오른쪽 코드가 실행됨)

```Javascript

// Bad Code
function printMessage(text) {
    let message = text;
    if (text == null || text == undefined) {
        message = 'Nothing to display';
    }
    console.log(message);
}

printMessage('Hello'); // Hello
printMessage(undefined); // Nothing to display
printMessage(null); // null

// undefined 일 때만 default Message가 할당된다.

// Good Code
function printMessage(text) {
    const message = text ?? 'Nothing to display';
    // Nulish Coalescing Operator
    console.log(message) // 이 때는 null, undefined일 때 다 실행됨
}

```

- Object Destructuring

```Javascript

const person = {
    name: 'Hun',
    age: '28',
    phone: '01011111111',
};

// Bad code
const displayPerson = person => {
    // 1. way
    displayAvatar(person.name);
    displayName(person.name);
    displayProfile(person.age, person.phone);
    // 2. way
    const name = person.name;
    const age = person.age;
    const phone = person.phone;
    displayAvatar(name);
    displayName(name);
    displayProfile(age, phone);
}

// Good Code
const displayPerson = person => {
    const {name, age, phone} = person;
    displayAvatar(name);
    displayName(name);
    displayProfile(age, phone);
}

```

- Spread Syntax : Object

```Javascript

const item = { type: 'shirts', size: 'M' };
const detail = { price: 20, made: 'Korea', gender: 'M' };

// Bad Code
item['price'] = detail.price;

const newObject = new Object();
newObject['type'] = item.type;
newObject['size'] = item.size;
newObject['price'] = detail.price;
newObject['made'] = detail.made;

const newObject2 = {
    type: item.type,
    size: item.size,
    price: detail.price,
    made: detail.made,
    gender: detai.gender,
};

// Good Code

// 1.
const shorts = Object.assign(item, detail);

// 2.
const shorts2 = {...item, ...detail, price: 40}; // 기존에 있는 모든값을 유지하면서 price만 업데이트

```

- Spread Syntax : Array

```Javascript

let fruits = ['apple', 'banana', 'melon'];

// fruits.push()
fruits = [...fruits, 'grape'];

// fruits.unshift()
fruits = ['mango', ...fruits];

const fruits2 = ['strawberry', 'pineapple', 'peach'];
let combined = fruits.concat(fruits2);
combined = [...fruits, 'cherry', ...fruits2];

```

#### 출처 : 드림코딩 by 엘리
