import { composeWithDevTools } from "@redux-devtools/extension";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { createStore } from "redux";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

//redux toolkit은 state를 직접 변경해도 된다.
//createReducer를 사용할 때 두가지 선택지가 있다. state를 변경 하던지, 새로운 상태를 반환하던지
//여기서 중요한 부분은 변경을 할 때는 반환을 하면 안된다. 그리고 반환을 하려면 꼭 새로운 상태의 state를 반환해야하 한다.
//redux toolkit이 내부에서 순수 redux를 사용할 때 처럼 코드를 실행해준다.
const reducer = createReducer([], (builder) => {
  builder
    .addCase(addToDo, (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    })
    .addCase(deleteToDo, (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    });
});

const store = createStore(reducer, composeWithDevTools());
store.subscribe(() => {});

export const actionCreators = {
  addToDo,
  deleteToDo,
};
export default store;
