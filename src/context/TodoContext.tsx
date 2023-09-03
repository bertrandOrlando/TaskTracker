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
};

export const TodoContext = createContext<todoContextType>({
  todos: [],
  setTodos: () => {},
});

export const TodoProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
export function useTodoContext() {
  return useContext(TodoContext);
}
