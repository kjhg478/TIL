## React SetState

---

- Array에 이전값에 계속해서 값을 추가하고 싶어 Spread Operator를 쓰려고 했으나 먹히지 않았다.
  - Templete Literal로 작성된 코드여서 그런듯 하다.
  - 그래서 setState(prev => prev)로 callBack함수를 넣어주어 추가를 해주었다.

```Js

// way 1
useEffect(() => {
    let startOfMonth = moment(date).daysInMonth();
    const monthDate = moment(date).format("YYYY-MM");


    while (startOfMonth > 0) {
      const getItem = window.localStorage.getItem(`Date_${monthDate}-${startOfMonth}`);
      if (getItem !== null) {
        console.log(startOfMonth)
        // 이 부분
        setText((prev) => [...prev, `Date_${monthDate}-${startOfMonth}`]);
      }
      startOfMonth--;
    }
  }, [date]);
  console.log(text);


// way 2
useEffect(() => {
    let startOfMonth = moment(date).daysInMonth();
    const monthDate = moment(date).format("YYYY-MM");


    while (startOfMonth > 0) {
      const getItem = window.localStorage.getItem(`Date_${monthDate}-${startOfMonth}`);
      // 이 부분
      let data = `Date_${monthDate}-${startOfMonth}`;

      if (getItem !== null) {
        setText((prev) => [...prev, data]);
      }
      startOfMonth--;
    }
  }, [date]);
	console.log(text);

```

- 문제

  - console.log로 text값을 보면 ['Date_2022-01-26', 'Date_2022-01-24']로 결과값이 나와야 한다.
    - 그러나 계속해서 ['Date_2022-01-26', 'Date_2022-01-0'] 이런식으로 결과값이 나오는 것이였다.
  - 리액트에서 setState가 비동기로 동작한다는 사실은 이미 알고 있었다.
  - 하 문제가 뭘까 하다가.. way2번에 있는 저 data값을 따로 빼주어 결과를 해보니 해결이 되었다.

- 원인

  - setText(prev =>) 이렇게 값을 넣는순간 바깥에 있는 스코프랑 실행시점이 다르다. (data 생성 시점)
  - setText의 인자로 실행되는 함수의 실행시점이 setText가 불려지는 시점과 다르다.
  - 정리해보면 setText가 비동기로 작동되면서, 동기 코드인 while문의 평가가 끝나고나서, setText 함수가 실행이 된다.

    - 그렇기 때문에 startOfMonth값이 0이 된 상태에서 만드는거라 0이 찍힌다.

  - way2번으로 작동이 잘 됐던 이유는 let data와 startOfMonth가 0이 아닐때 생성을 하게 되므로 메모리에 보관이 되어 있다.
  - while문 블록 안에 let이 선언되어 있으므로 data는 항상 새로운 값을 만들고 있게 된다.
  - 그래서 setText가 비동기로 나중에 호출이 되었지만 그전에 만들어둔 클로저를 통해 그 때 생성된 값이 전달되게 된다.

---

### 참고 코드

```Js

const [count, setCount] = useState(0);

useEffect(() => {
    let number = 0;
    console.log("before setCount", number);
    setCount(() => {
        console.log("inner setCount: number ?", number);
        return number + 1;
    });
    number = number - 1;
    console.log("after setCount", number);
}, []);

console.log(count, "countState);

```
