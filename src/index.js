import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const ADD = "ADD";
const MINUS = "MINUS";

//reducer라고 불리는 함수는 애플리케이션의 데이터(상태)를 수정하고 그 결과를 반환한다.
//데이터를 변경할 때는 dispatch(action)를 사용해서 reducer()에게 요청한다.
//이 때 어떻게 데이터를 변경할 것인가 소통하는 방법이 action이라는 object의 type를 통해서 소통한다.(임의로 속성명 바꾸면 안됨)
//그리고 데이터의 변화를 subscribe(listener)를 사용해서 상태 변경시 어떻게 할 것인가 정의해 놓은 listener를 통해 반영해 준다.
//redux 제공 api -> createStore(), dispatch(), subscribe()
//사용자 정의 함수 reducer(상태를 수정하는 함수), action(변경 방식에 대한 객체), listener(상태 변경시 발생하는 이벤트 정의)

const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier);

const handleAdd = () => {
  countStore.dispatch({ type: ADD });
};

const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);
