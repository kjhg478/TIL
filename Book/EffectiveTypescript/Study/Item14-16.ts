// todo리스트 페이지를 만든다고 가정하고 타입을 지정해보자

type UserInfo = {
  id: string;
  userId: string;
  name: string;
  phoneNumber: string;
};

type State = "SUCCESS" | "FAIL" | "DOING";

type TodoListProps = {
  itemId: string;
  items: string[];
  status: State;
  UserInfo: UserInfo;
};

// 이때 UserInfo의 속성 중 userId,name,phoneNumber를 다른 곳에서도 사용해야할 때 방법

//A 반복
type MyPagePropsA = {
  userId: string;
  name: string;
  phoneNumber: string;
};

//B UserInfo 항목 이용

type MyPagePropsB = {
  userId: UserInfo["userId"];
  name: UserInfo["name"];
  phoneNumber: UserInfo["phoneNumber"];
};

//C 타입 매핑
type MyPagePropsC = { [K in "userId" | "name" | "phoneNumber"]: UserInfo[K] };

//D 제네릭 Pick 사용
// Pick<Type,Key of Type>
type MyPagePropsD = Pick<UserInfo, "userId" | "name" | "phoneNumber">;

const printInfo = (userId: string) => {
  const userInfo = {
    id: "P1V6cQJpbc4&list=RDMMP1V6cQJpbc4",
    userId: "imymemine",
    name: "Tate",
    phoneNumber: "021-556-1111",
    hiddenType: "hidden",
  };
  return userInfo;
};

type CopyMyPageType = ReturnType<typeof printInfo>;

type Copy = Partial<MyPagePropsA>;

// Item 15

type Vec3D1 = Record<"x" | "y" | "z", number>;
type Vec3D2 = { [k in "x" | "y" | "z"]: number };
type ABC = { [k in "a" | "b" | "c"]: k extends "b" ? string : number };

// Item 16

console.log(typeof []); // object

const x = [1, 2, 3];
console.log(x[0]); // 1
console.log(x["1"]); // 2
console.log(Object.keys(x)); // ['0', '1', '2']

// 배열은 객체이므로 키는 숫자가 아니라 문자열입니다.
