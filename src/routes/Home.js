import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import ToDo from "../components/ToDo";

const Home = ({ toDos, addToDo }) => {
  const [text, setText] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addToDo(text);
    setText("");
  };

  return (
    <div>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Add Your To Do"
          value={text}
          onChange={onChange}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {toDos.map((todo) => (
          <ToDo {...todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { toDos: state };
};

const mapDistpathToProps = (dispatch) => {
  return {
    addToDo: (text) => dispatch(actionCreators.addToDo(text)),
  };
};

export default connect(mapStateToProps, mapDistpathToProps)(Home);
