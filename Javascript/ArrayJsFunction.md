## Array - Javascript Function

- find
  - 배열에서 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환하고, 그런 요소가 없으면 undefined를 반환한다.

```Javascript

const array1 = [5, 12, 8, 130, 44];

const found = array1.find(element => element > 10);

console.log(found);
// expected output: 12

```

- indexOf
  - 배열에서 지정된 요소를 찾을 수 있는 첫 번째 인덱스를 반환하고 존재하지 않으면 -1을 반환

```Javascript

const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// expected output: 1

// start from index 2
console.log(beasts.indexOf('bison', 2));
// expected output: 4

console.log(beasts.indexOf('giraffe'));
// expected output: -1


```

- includes

  - 배열이 특정 요소를 포함하고 있는지 판별 (true / false)

```Javascript

const array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// expected output: true

console.log(pets.includes('at'));
// expected output: false

```

- indexOf / includes
  - indexOf는 해당 index 자체를 찾아 splice를 이용한 제거에 유리
  - includes는 return으로 true/false 처리에 유리
