import { Dispatch, SetStateAction } from "react";
import TodoType from "../model";
import SingleCard from "./SingleCard";

interface PropType {
  createdTodos: TodoType[];
  setCreatedTodos: Dispatch<SetStateAction<TodoType[]>>;
}

const TodoList = ({ createdTodos, setCreatedTodos }: PropType) => {
  return (
    <div className="todos-wrapper">
      {createdTodos.map((eachTodo) => (
        <SingleCard
          key={eachTodo.id}
          singleTodo={eachTodo}
          createdTodos={createdTodos}
          setCreatedTodos={setCreatedTodos}
        />
      ))}
    </div>
  );
};

export default TodoList;
