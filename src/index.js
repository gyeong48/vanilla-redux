import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addTodo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id));
};

const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text));
};

//원래 상태에서 변하게 하지 말고 새로운 상태를 만들어 반환해야 한다. 새로운 상태는 메모리 상에 새로운 주소를 할당 받는다.
//새로운 배열은 새로운 주소를 메모리상에사 할당 받는다. 이 때 리덕스가 상태가 변경된지 감지할 수 있다.
//원래 상태에 조작을 가하면 같은 메모리 주소를 사용하게 되는 것이므로 리덕스는 상태 변화를 감지하지 못한다.
//메모리 주소의 변화가 곧 상태의 변화 이므로 subscribe가 listenr를 통해 상태 변경되었을 때 할 행동이 작동될 수 있다.
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

const paintTodos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((todo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteTodo);
    li.id = todo.id;
    li.innerText = todo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintTodos);

const onSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  dispatchAddTodo(todo);
};

form.addEventListener("submit", onSubmit);
