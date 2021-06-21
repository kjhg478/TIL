## ParamOrArgument

- 파라미터 : 함수에서 받아오는 값
- 인자 : 함수를 사용할 때 넣어주는 것

```Javascript

const sum = () => {
    return rest.reduce((acc, current) => acc + current, 0);
}
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(sum(...numbers));
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8));

// const subtract(x,  y) {
//     return x - y
// }

// const numbers = [1, 2];
// const result = subtract(...numbers);
// console.log(result);


```
