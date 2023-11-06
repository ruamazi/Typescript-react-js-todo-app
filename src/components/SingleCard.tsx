import {
  useState,
  Dispatch,
  SetStateAction,
  FormEvent,
  useRef,
  useEffect,
} from "react";
import { AiFillEdit, AiFillDelete, AiOutlineSave } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { TodoType } from "../model";
import { Draggable } from "react-beautiful-dnd";

type PropType = {
  createdTodos: TodoType[];
  setCreatedTodos: Dispatch<SetStateAction<TodoType[]>>;
  singleTodo: TodoType;
  index: number;
};

const EditeOne = ({
  singleTodo,
  setCreatedTodos,
  createdTodos,
  index,
}: PropType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedOne, setEditedOne] = useState<string>(singleTodo.todo);
  const focusRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number): void => {
    if (!editMode) {
      setCreatedTodos(
        createdTodos.map((todo) =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
    }
  };
  const handleDelete = (id: number): void => {
    setCreatedTodos(createdTodos.filter((eachTodo) => eachTodo.id !== id));
  };

  const handleEdit = (id: number, e: FormEvent): void => {
    e.preventDefault();
    if (!singleTodo.isDone) {
      setEditMode(!editMode);
    }
    setCreatedTodos(
      createdTodos.map((t) => (t.id === id ? { ...t, todo: editedOne } : t))
    );
  };

  useEffect(() => {
    if (editMode) {
      focusRef.current?.focus();
    }
  }, [editMode]);

  return (
    <Draggable draggableId={singleTodo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todo-card"
          onSubmit={(e) => handleEdit(singleTodo.id, e)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {editMode ? (
            <input
              type="text"
              defaultValue={singleTodo.todo}
              onChange={(e) => setEditedOne(e.target.value)}
              ref={focusRef}
            />
          ) : singleTodo.isDone ? (
            <s className="single-todo-text"> {singleTodo.todo} </s>
          ) : (
            <p className="single-todo-text"> {singleTodo.todo} </p>
          )}

          <div className="icons-wrapper">
            <span
              className="icon edit-icon"
              onClick={(e) => handleEdit(singleTodo.id, e)}
            >
              {editMode ? <AiOutlineSave /> : <AiFillEdit />}
            </span>
            <span
              className="icon delete-icon"
              onClick={() => handleDelete(singleTodo.id)}
            >
              <AiFillDelete />
            </span>
            <span
              className="icon done-icon"
              onClick={() => handleDone(singleTodo.id)}
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default EditeOne;
