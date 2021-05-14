## connect
- connect : 애플리케이션에 store를 제공했으므로 리액트를 store에 연결해야 한다.
    - 이 때, store와 교류할 수 있는 방법은 action을 dispatch하고 state를 업데이트 하는 것
    - 이전에 action을 dispatch 할 때, store.dispatch()를 state값을 얻을 때, store.getState()를 사용했다.
    - connect는 이 두 작업을 하게 된다.
#### mapStateToProps and mapDispatchToProps
- 둘 다 객체를 반환하며, 
- mapStateToprops : store의 state를 인수로 받아서 props와 매핑되는 방식을 만들 객체를 반환
- mapDispatchToProps : dispatch action이 props와 매핑되는 방식을 만들 객체를 반환

- 예제코드
```Javascript
import {connect} from 'react-redux'
 
const AddContact = ({newContact, addContact}) => {
  return (
    <div>
      {newContact.name} <br />
      {newContact.email} <br />
      {newContact.phone} <br />
       
      Are you sure you want to add this contact?
      <span onClick={addContact}> Yes </span>
    </div>
  )
}
 
const mapStateToProps = state => {
  return {
    newContact : state.contacts.newContact
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    addContact : () => dispatch(addContact())
  }
}
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContact)

```

#### 