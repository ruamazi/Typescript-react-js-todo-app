import { Dispatch, SetStateAction, FormEvent, useRef } from "react";

interface PropType {
  todo: string;
  setTodo: Dispatch<SetStateAction<string>>;
  handleAdd: (e: FormEvent) => void;
}

const InputFeild = ({ todo, setTodo, handleAdd }: PropType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="inpF-container">
      <form
        onSubmit={(e) => {
          handleAdd(e);
          inputRef.current?.blur();
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a Task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="btn">Go</button>
      </form>
    </div>
  );
};

export default InputFeild;
