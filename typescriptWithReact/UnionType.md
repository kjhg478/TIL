## Union, TypeGuard, TypeAlias
- any의 사용은 최소화 하자
- 타입스크립트는 타입에 관한 더 많은 정보를 명시할수록 좋음

- Union
    - 제한된 타입들을 동시에 지정하고 싶을 때
    - 하나의 변수에 여러 타입을 지정할 수 있다.
    - ex) let someValue: number | string

```Typescript
let value: string | number = "foo";
value = 100;
value = "bar";
value = true;
// Error: Type "true" is not assignable to type 'string | number'

// Object에서도 union 타입을 사용할 수 있다. 
interface Car {
    benz: string;
    porsche: string;
}
interface CarBuy {
    buy: boolean;
    price: number;
}

type CarOrBuy = Car | CarBuy

const obj: CarOrBuy = {
    benz: "eClass",
    price: 100,
}

// Union Type 추출
interface Car {
    benz: string;
    porsche: string;
}
interface CarBuy {
    buy: boolean;
    price: number;
}

function useCarBuy(obj: Car | CarBuy): void {
    // in 연산자를 통해 오브젝트 뿐만 아니라 변수 타입을 추출할 수도 있다.
	// obj가 Car 타입인지 CarBuy 타입인지 판단
	if ('benz' in obj) {
		// bar 프로퍼티는 Hoge 타입
		console.log('Car', obj.Car);
	} else {
		// bar 프로퍼티는 Piyo 타입
		console.log('CarBuy', obj.price);
	}
}

// typeof를 사용한 추출
function func(value: string | number): number {
	// value는 string 타입이기 때문에 if 조건을 처리
	if ('string' === typeof value) {
		return value.length;

	// string 타입이 아닌 경우 else 조건을 처리
	} else {
		// value는 number타입
		return value;
	}
}

```

- null 체크
    - union 타입을 자주 사용하는 경우로 nullable 값을 설정하는 경우
    - 값이 존재할 때와 존재하지 않는 경우

```Typescript
function func(value: string | null): number {
	// value가 null이 아닌 경우 string 타입으로 사용
	if (value != null) {
		return value.length;
	} else {
		return 0;
	}
}

function func(value: string | null): number {
	return value != null && value.length || 0;
}

```