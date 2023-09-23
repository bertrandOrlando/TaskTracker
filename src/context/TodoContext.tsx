import {
  useContext,
  createContext,
  useState,
  FC,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type todoContextType = {
  todos: TodoItem[];
  setTodos: Dispatch<SetStateAction<TodoItem[]>>;
  userID: string;
  setUserID: Dispatch<SetStateAction<string>>;
};

export const TodoContext = createContext<todoContextType>({
  todos: [],
  setTodos: () => {},
  userID: "",
  setUserID: () => {},
});

export const TodoProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [userID, setUserID] = useState<string>("");
  return (
    <TodoContext.Provider value={{ todos, setTodos, userID, setUserID }}>
      {children}
    </TodoContext.Provider>
  );
};
export function useTodoContext() {
  return useContext(TodoContext);
}
