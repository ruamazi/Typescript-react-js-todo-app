import { Dispatch, SetStateAction } from "react";
import { TodoType } from "../model";
import SingleCard from "./SingleCard";
import { Droppable } from "react-beautiful-dnd/";
import { ACTIVE_ID, DONE_ID } from "../model";

interface PropType {
  createdTodos: TodoType[];
  setCreatedTodos: Dispatch<SetStateAction<TodoType[]>>;
  completedTodos: TodoType[];
  setCompletedTodos: Dispatch<SetStateAction<TodoType[]>>;
}

const TodoList = ({
  createdTodos,
  setCreatedTodos,
  completedTodos,
  setCompletedTodos,
}: PropType) => {
  return (
    <div className="main-contianer">
      <Droppable droppableId={ACTIVE_ID}>
        {(provided) => (
          <div
            className="todos-wrapper"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h3>Active Tasks</h3>
            {createdTodos.map((eachTodo, index) => (
              <SingleCard
                key={eachTodo.id}
                singleTodo={eachTodo}
                createdTodos={createdTodos}
                setCreatedTodos={setCreatedTodos}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId={DONE_ID}>
        {(provided) => (
          <div
            className="completed-wrapper todos-wrapper"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h3>Completed Tasks</h3>
            {completedTodos.map((eachTodo, index) => (
              <SingleCard
                key={eachTodo?.id}
                singleTodo={eachTodo}
                createdTodos={completedTodos}
                setCreatedTodos={setCompletedTodos}
                index={index}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
