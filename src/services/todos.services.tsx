import { addTodo } from "@/repository/todos.repository";

export const CreateTodo = (data: { data: TodoItem }) => {
  const todoData = data.data;
  if (
    todoData.task &&
    todoData.description &&
    todoData.category &&
    todoData.time &&
    todoData.priority &&
    typeof todoData.fulfillment === "number"
  ) {
    addTodo(todoData);
  } else {
    throw new Error("Some fields are required");
  }
};
