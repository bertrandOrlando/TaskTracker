type TodoItem = {
  id: number;
} & bodyTodoItem;

type AddTodo = {
  user_id: string;
} & bodyTodoItem;

type bodyTodoItem = {
  task: string;
  description: string;
  category: string;
  time: string;
  priority: string;
  fulfillment: number;
};
