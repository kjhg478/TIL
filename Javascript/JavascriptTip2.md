## JavascriptTip2

- Optional Chaining

```Javascript

const bob = {
    name: 'Julia',
    age: 20,
};
const anna = {
    name: 'Julia',
    age: 20,
    job: {
        title: 'Software Enginerr',
    },
};

// Bad Code
const displayJobTitle = person => {
    if (person.job && person.job.title) {
        console.log(person.job.title);
    }
}

// Good Code

// 1.
const displayJobTitle = person => {
    if (person.job?.title) { // ?를 이용하면 job이 있다면 job안에 title이 있는지 검사하는 것이고, job이 없다면 바로 false로 됨
        console.log(person.job.title);
    }
}

// 2.
const displayJobTitle = person => {
    const title = person.job?.title ?? 'No job Yet'; // job이 있고 title이 있다면 그 값을 그대로 사용하나, 만약 job이 없거나 job이 있는데 title이 없다면 오른쪽 코드 출력!
    console.log(title);
}

```

- Template Literals (Template String)

```Javascript

const person = {
    name: 'Julia',
    score: 4,
};

// Bad code
console.log('Hello' + person.name + ', your current score is: ' + person.score);

// Good Code

// 1.
console.log(`Hello ${person.name}, Your current score is: ${person.score}`);

// 2.
const { name, score } = person;
console.log(`Hello ${name}, Your current score is: ${score}`);

// 3. 함수로 만들면 재사용도 가능 (확장성과 유지보수성)
const greetings = person => {
    const { name, score } = person;
    console.log(`Hello ${name}, Your current score is: ${score}`);
}
```

- Loops

```Javascript

const items = [1, 2, 3, 4, 5, 6];

// 1.
const evens = items.filter(num => num % 2 === 0);
const multiple = evens.map(num => num * 4);
const sum = multiple.reduce((a, b) => a + b, 0);
console.log(sum);

// 2.
const result = items
    .filter(num => num % 2 === 0)
    .map(num => num * 4)
    .reduce((a, b) => a + b, 0);
console.log(result);

```

- Promise => Async / await

```Javascript

// Bad Code
const displayUsers = () => {
    fetchUser()
        .then(user => {
            fetchProfile(user)
                .then(profile => {
                    updateUi(user, profile);
                });
        });
}

// Good Code
const displayUsers = async () => {
    const user = await fetchUser();
    const profile = await fetchProfile(user);
    updateUi(user, profile);
}

```

- Remove Duplicates

```Javascript

const item = [1, 2, 3, 4, 1, 2, 3];
console.log(item);

console.log([...new Set(item)]);

```

#### 출처 : 드림코딩 by 엘리
