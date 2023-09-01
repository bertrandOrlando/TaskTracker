import connection from "@/../db";

export const getTodos = () => {
  // Database query for fetching todos
};

export const addTodo = (todoData: TodoItem) => {
  connection.query(
    `INSERT INTO to_do (Task,Description,Category,Time,Priority,Fulfillment) VALUES ("${todoData.task}", "${todoData.description}", "${todoData.category}", "${todoData.time}", "${todoData.priority}", ${todoData.fulfillment});`,
    (_err: unknown, rows: unknown) => {
      if (_err) {
        throw new Error(_err);
      } else {
        return rows;
      }
    }
  );
};
