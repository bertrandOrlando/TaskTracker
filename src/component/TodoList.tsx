import Todo from "./Todo";

const TodoList = (
  props: { todoItems: TodoItem[] } & {
    removeTodo: (id: number) => Promise<void>;
  } & {
    updateTodo: (id: number, todoData: bodyTodoItem) => Promise<void>;
  },
) => {
  const { todoItems, removeTodo, updateTodo } = props;
  return (
    <div className="flex h-full w-full flex-col overflow-auto rounded-3xl bg-[#F8EEF4] p-4">
      <div className="flex items-center justify-evenly border-b-4 pb-2">
        <span className="w-28 text-center text-xl font-semibold">Task</span>
        <span className="w-52 text-center text-xl font-semibold">
          Description
        </span>
        <span className="w-24 text-center text-xl font-semibold">Category</span>
        <span className="w-28 text-center text-xl font-semibold">When</span>
        <span className="w-20 text-center text-xl font-semibold">Priority</span>
        <span className="w-28 text-center text-xl font-semibold">
          Fullfilment
        </span>
        <span className="w-16 text-center text-xl font-semibold"></span>
      </div>
      <div className="my-2 h-full w-full overflow-y-scroll">
        {todoItems.map((item) => {
          return (
            <Todo
              key={item.id}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
