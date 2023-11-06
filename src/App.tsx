import { useState, FormEvent } from "react";
import InputFeild from "./components/InputFeild";
import TodoType from "./model";
import TodoList from "./components/TodoList";

function App() {
  const [todo, setTodo] = useState<string>("");
  const [createdTodos, setCreatedTodos] = useState<TodoType[]>([]);

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

  return (
    <div className="App">
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList createdTodos={createdTodos} setCreatedTodos={setCreatedTodos} />
    </div>
  );
}

export default App;
