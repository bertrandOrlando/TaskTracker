import Todo from "@/component/Todo";
import axios from "axios";
import { GetServerSideProps } from "next";
import connection from "../../db";

export default function Home({ data }: { data: TodoItem[] }) {
  const todoItems: TodoItem[] = data;
  // const todoItems: TodoItem[] = [
  //   {
  //     id: 1,
  //     task: "Complete project proposal",
  //     description: "Write and finalize project proposal document.",
  //     category: "Work",
  //     dateTime: "2023-08-18 14:00",
  //     priority: "High",
  //     fullfilment: 0,
  //   },
  //   {
  //     id: 2,
  //     task: "Grocery shopping",
  //     description: "Buy groceries for the week.",
  //     category: "Personal",
  //     dateTime: "2023-08-19 10:30",
  //     priority: "Low",
  //     fullfilment: 100,
  //   },
  //   {
  //     id: 3,
  //     task: "Complete project proposal",
  //     description: "Write and finalize project proposal document.",
  //     category: "Work",
  //     dateTime: "2023-08-18 14:00",
  //     priority: "High",
  //     fullfilment: 0,
  //   },
  //   {
  //     id: 4,
  //     task: "Grocery shopping",
  //     description: "Buy groceries for the week.",
  //     category: "Personal",
  //     dateTime: "2023-08-19 10:30",
  //     priority: "Low",
  //     fullfilment: 0,
  //   },
  //   {
  //     id: 5,
  //     task: "Complete project proposal",
  //     description: "Write and finalize project proposal document.",
  //     category: "Work",
  //     dateTime: "2023-08-18 14:00",
  //     priority: "High",
  //     fullfilment: 0,
  //   },
  //   {
  //     id: 6,
  //     task: "Grocery shopping",
  //     description: "Buy groceries for the week.",
  //     category: "Personal",
  //     dateTime: "2023-08-19 10:30",
  //     priority: "Low",
  //     fullfilment: 0,
  //   },
  // ];

  return (
    <div className="w-full h-screen bg-gradient-to-r from-homeBg-0 to-homeBg-1 flex justify-center items-center ">
      <div className="bg-white bg-opacity-50 max-w-screen-lg w-full h-5/6 rounded-2xl px-12 py-8 flex flex-col items-center">
        <h1 className="font-bold text-4xl bg-gradient-to-r from-cyan-500 to-teal-700 text-transparent bg-clip-text">
          My To-Do-Lists
        </h1>
        <section className="w-full flex flex-col justify-between ">
          <div className="py-8 flex justify-stretch gap-20">
            <button className="bg-white w-full text-black text-lg py-3 rounded-2xl transition hover:scale-105">
              Add a new to-do
            </button>
            <div className="flex justify-stretch gap-5 w-full">
              <button className="bg-white w-full text-black text-lg py-3 rounded-2xl transition hover:scale-105">
                All
              </button>
              <button className="bg-white w-full text-black text-lg py-3 rounded-2xl transition hover:scale-105">
                To-do
              </button>
              <button className="bg-white w-full text-black text-lg py-3 rounded-2xl transition hover:scale-105">
                Completed
              </button>
            </div>
          </div>
          <div className="w-full h-[350px] p-4 bg-white rounded-3xl flex flex-col">
            <div className="flex justify-evenly items-center border-b-4 pb-2">
              <span className="w-28 font-semibold text-xl text-center">
                Task
              </span>
              <span className="w-52 font-semibold text-xl text-center">
                Description
              </span>
              <span className="w-24 font-semibold text-xl text-center">
                Category
              </span>
              <span className="w-28 font-semibold text-xl text-center">
                When
              </span>
              <span className="w-16 font-semibold text-xl text-center">
                Priority
              </span>
              <span className="w-28 font-semibold text-xl text-center">
                Fullfilment
              </span>
              <span className="w-16 font-semibold text-xl text-center"></span>
            </div>
            <div className="h-full w-full overflow-y-scroll my-2">
              {todoItems.map((item) => {
                return <Todo key={item.id} {...item} />;
              })}
            </div>
          </div>
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
