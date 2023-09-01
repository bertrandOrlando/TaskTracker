import Todo from "@/component/Todo";
import TodoList from "@/component/TodoList";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useState } from "react";

export default function Home({ data }: { data: TodoItem[] }) {
  const [todoItems, setTodoItems] = useState<TodoItem[]>(data);
  const [filter, setFilter] = useState("all");

  const filterAll = async () => {
    setFilter("all");
    const data = await axios
      .get(`http://localhost:3000/api/todos`)
      .then((response) => response.data);
    setTodoItems(data);
  };
  const filterTodo = async () => {
    setFilter("todo");
    const data = await axios
      .get(`http://localhost:3000/api/todos?filter=todo`)
      .then((response) => response.data);
    setTodoItems(data);
  };
  const filterCompleted = async () => {
    setFilter("completed");
    const data = await axios
      .get(`http://localhost:3000/api/todos?filter=completed`)
      .then((response) => response.data);
    setTodoItems(data);
  };
  const removeTodo = async (id: number) => {
    await axios.delete(`http://localhost:3000/api/todos/${id}`);
    renderTodo();
  };
  const updateTodo = async (id: number, todoData: bodyTodoItem) => {
    await axios.put(`http://localhost:3000/api/todos/${id}`, { ...todoData });
    renderTodo();
  };
  const renderTodo = () => {
    switch (filter) {
      case "all":
        filterAll();
        break;
      case "todo":
        filterTodo();
        break;
      case "completed":
        filterCompleted();
        break;
      default:
        break;
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex h-5/6 w-full max-w-screen-lg flex-col items-center rounded-2xl bg-primary bg-opacity-50 from-primary px-12 py-8">
        <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-4xl font-bold text-transparent">
          My To-Do-Lists
        </h1>
        <section className="flex h-full w-full flex-col justify-between overflow-hidden">
          <div className="flex justify-stretch gap-20 p-8">
            <button className="w-full rounded-2xl bg-white py-3 text-lg text-black transition hover:scale-105">
              Add a new to-do
            </button>
            <div className="flex w-full justify-stretch gap-5">
              <button
                className={`${
                  filter === "all"
                    ? "bg-indigo-700 font-bold text-white"
                    : "bg-white text-black"
                } w-full  rounded-2xl py-3 text-lg transition hover:scale-105`}
                onClick={filterAll}
              >
                All
              </button>
              <button
                className={`${
                  filter === "todo"
                    ? "bg-indigo-700 font-bold text-white"
                    : "bg-white text-black"
                } w-full  rounded-2xl py-3 text-lg transition hover:scale-105`}
                onClick={filterTodo}
              >
                To-Do
              </button>
              <button
                className={`${
                  filter === "completed"
                    ? "bg-indigo-700 font-bold text-white"
                    : "bg-white text-black"
                } w-full  rounded-2xl py-3 text-lg transition hover:scale-105`}
                onClick={filterCompleted}
              >
                Completed
              </button>
            </div>
          </div>
          <TodoList
            todoItems={todoItems}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        </section>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await axios
    .get("http://localhost:3000/api/todos")
    .then((response) => response.data);
  return {
    props: {
      data,
    },
  };
};
