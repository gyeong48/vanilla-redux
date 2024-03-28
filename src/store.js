import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
  return {
    type: ADD,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE,
    id: parseInt(id),
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

//순수 리덕스를 사용할 때 우리가 직접 렌더링을 해주었다.
//리액트는 변화되는 부분만 리렌더링 한다. 그래서 리액트의 기술과 함께 리덕스를 사용할 수 있도록
//react-redux 라이브러리를 사용한다.
store.subscribe(() => {});

export const actionCreators = {
  addToDo,
  deleteToDo,
};
export default store;
