//vanilla js todoList는 데이터가 존재하지 않는다. 단지 html을 수정하는 것이다.
//예를 들어 우리가 todo를 삭제하고 싶다면 데이터(상태)가 없기 때문에 그 일을 수행할 수 없다.
//이 때 배열을 사용하여 데이터를 만들고, 로컬 저장소에 데이터를 저장하면 비로서 애플리케이션에 데이터가 존재하게 된다.
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const createTodo = (todo) => {
  const li = document.createElement("li");
  li.innerText = todo;
  ul.appendChild(li);
};

const onSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  createTodo(todo);
};

form.addEventListener("submit", onSubmit);
