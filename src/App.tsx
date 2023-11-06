import { useState, FormEvent } from "react";
import InputFeild from "./components/InputFeild";
import { ACTIVE_ID, TodoType } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd/";

function App() {
  const [todo, setTodo] = useState<string>("");
  const [createdTodos, setCreatedTodos] = useState<TodoType[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoType[]>([]);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (todo) {
      setCreatedTodos([
        ...createdTodos,
        { id: Date.now(), todo, isDone: false },
      ]);
    }
    setTodo("");
  };

  const handleDrag = (result: DropResult) => {
    const { source, destination } = result;
    console.log(source, destination);

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add;
    let active = createdTodos;
    let complete = completedTodos;
    if (source.droppableId === ACTIVE_ID) {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === ACTIVE_ID) {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    console.log(complete);
    console.log(active);

    setCompletedTodos(complete);
    setCreatedTodos(active);
  };

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <div className="App">
        <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          createdTodos={createdTodos}
          setCreatedTodos={setCreatedTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
