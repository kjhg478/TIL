## AccessLimiter
- 생성자 (Constructor)
    - 모든 클래슨느 생성자를 가짐
    - 클래스의 인스턴스 즉, 클래스로부터 객체를 생성할 때, 호출되며 객체의 초기화를 담당

- 접근 제한자
    - 기본값은 Public
    - 클래스 속 멤버 변수(프로퍼티)와 메소드에 적용될 수 있는 키워드
    - 클래스 외부로부터의 접근을 통제
    - public : 클래스의 외부에서 접근 가능
    - private : 클래스 내에서만 접근 가능 (비공개 멤버)
    - protected : 클래스 내부, 상속받은 자식 클래스에서 접근 가능
    - private일 때, 변수명 앞에 '_'표시, 개발자들끼리 암묵적인 약속 방법

- Getter / Setter
    - 비공개로 설정된 객체의 멤버 변수에 접근하여 값을 읽거나 쓰기 위해서 사용
    - 클래스 내에서 Get과 Set 키워드를 사용하여 Getter, Setter를 선언

```Typescript
get fullName() { return this._fullName; }
set fullName() { return this._fullName = value; }

// Constructor 매개변수에 AccessModifiers를 직접 적용 가능
constructor (
    private _fullName: string,
    private _age: number,
    private _jobTitle: string,
    public workingHoursPerWeek: number ) {
}

get fullName () {
    return this._fullName;
}

set fullName (value: string) {
    return this._fullName = value;
}

```