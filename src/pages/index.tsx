import TodoList from "@/components/TodoList";
import { useTodoContext } from "@/context/TodoContext";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function Home({ data }: { data: TodoItem[] }) {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

  const { todos, setTodos } = useTodoContext();
  const [filter, setFilter] = useState("all");
  const [signoutToggle, setSignoutToggle] = useState(false);
  useEffect(() => {
    setTodos(data);
  }, [data, setTodos]);

  const filterAll = async () => {
    setFilter("all");
    const data = await axios
      .get(`http://localhost:3000/api/todos`)
      .then((response) => response.data);
    setTodos(data);
  };
  const filterTodo = async () => {
    setFilter("todo");
    const data = await axios
      .get(`http://localhost:3000/api/todos?filter=todo`)
      .then((response) => response.data);
    setTodos(data);
  };
  const filterCompleted = async () => {
    setFilter("completed");
    const data = await axios
      .get(`http://localhost:3000/api/todos?filter=completed`)
      .then((response) => response.data);
    setTodos(data);
  };
  const removeTodo = async (id: number) => {
    await axios.delete(`http://localhost:3000/api/todos/${id}`);
    renderTodo();
  };
  const updateTodo = (id: number) => {
    router.push(`/editTodo/${id}`);
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
      <div className="relative flex h-5/6 w-full max-w-screen-lg flex-col items-center rounded-2xl bg-primary bg-opacity-50 px-12 py-8">
        <div
          className={`user-detail absolute right-5 top-5 rounded-xl bg-background p-2 transition-all ${
            signoutToggle ? "bg-opacity-100" : "bg-opacity-70"
          }`}
        >
          <button
            className="flex cursor-pointer flex-row items-center justify-center gap-2  bg-opacity-80 px-4 py-2"
            onClick={() => setSignoutToggle((e) => !e)}
          >
            <Image
              src={session?.user?.image as string}
              alt="user-profile"
              width={35}
              height={35}
              className="rounded-full"
            />
            <h3 className="font-semibold">
              {session?.user?.name?.split(" ")[0]}
            </h3>
          </button>
          {signoutToggle ? (
            <button
              className={`m-2 flex items-center justify-center gap-2 rounded-xl bg-primary bg-opacity-90 px-4 py-2 text-white transition hover:scale-105 `}
              onClick={() => {
                signOut();
                router.push("/");
              }}
            >
              <h3>SignOut</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          ) : (
            ""
          )}
        </div>

        <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-4xl font-bold text-transparent">
          My To-Do-Lists
        </h1>
        <section className="flex h-full w-full flex-col justify-between overflow-hidden">
          <div className="flex justify-stretch gap-20 p-8">
            <Link
              href={"./addTodo"}
              className="w-full rounded-2xl bg-white py-3 text-center text-lg text-black transition hover:scale-105"
            >
              Add a new to-do
            </Link>
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
            todoItems={todos}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        </section>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const session = await getServerSession(context.req, context.res, authOptions);
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // }
  const data = await axios
    .get("http://localhost:3000/api/todos")
    .then((response) => response.data);
  return {
    props: {
      data,
    },
  };
};
