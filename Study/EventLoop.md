# EventLoop

```Javascript
    // 1. 콘솔에 출력되는 return 값은?
    const test = async()=>{return "hello"};
    test();

    // 2. 콘솔에 출력되는 순서는 ?

    const foo = async()=>{
    const first = await console.log("first")    //a
    const second = await console.log("second") //b
    const hi = ()=>{
                console.log("HI")  //c
            }
    hi();
    const third = await console.log("third") //d
    }
    foo();

    // 3. 콘솔에 출력되는 순서는 ?

    const foo = async()=>{
    const first = await console.log("first")    //a
    const second = await console.log("second") //b
    const hi = ()=>{
                console.log("HI")  //c
            }
    hi();
    const third = await console.log("third") //d
    }
    foo();

    // 4. 콘솔에 출력되는 순서는 ?

    const foo = async()=>{
    const first = await console.log("first")    //a
    const second = await console.log("second") //b
    const hi = ()=>{
                console.log("HI")  //c
            }
    hi();
    const third = await console.log("third") //d
    }
    foo();

    // 5. 콘솔에 출력되는 순서는?

    something.get() 호출 시 response는 console.log("A")가 출력
    const foo = () =>{
    const first = await something.get().then(()=>console.log("B"))
    // await안에서의 then 매크로 태스크 큐로 분리된다.
    const second = await console.log("C")
    }
    foo();

```

- EventLoop
  - 비동기끼리도 우선순위가 있다.
  - 실행순서
    1. CallStack (동기)
    2. Micro Task Queue
       - Promise
       - async await
    3. Macro Task Queue
       - 그 외의 비동기 작업
       - ex) setTimeout, setInterval, setImmediate, I/O, UI 렌더링
