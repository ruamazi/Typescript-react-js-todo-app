import { v4 as uuidv4 } from "uuid";

export interface TodoType {
  id: number;
  todo: string;
  isDone: boolean;
}

export const ACTIVE_ID: string = uuidv4();
export const DONE_ID: string = uuidv4();

type ActionsType =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: number }
  | { type: "done"; payload: number };

export const TodoReducer = (state: TodoType[], action: ActionsType) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), todo: action.payload, isDone: false },
      ];
    case "remove":
      return state.filter((todo) => todo.id !== action.payload);
    case "done":
      return state.map((todo) =>
        todo.id !== action.payload ? { ...todo, isDone: !todo.isDone } : state
      );
    default:
      return state;
  }
};

// const TestComponent = () => {
//   const [ourState, dispatch] = useReducer(TodoReducer, [])
//   return (

//   )
// }

// export default TestComponent
