import { useTodoContext } from "@/context/TodoContext";
import { useFormsValidation } from "@/hooks/useFormsValidation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";

const EditTodoById = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  const todoId = router.query.id as string[];
  const { todos } = useTodoContext();
  useEffect(() => {
    if (todos.length == 0) {
      router.push("/my-todos");
    }
  }, [todos, router]);
  const dataById = todos.find(
    (todo) => todo.id === parseInt(todoId[0]),
  ) as TodoItem;
  const initialValue: bodyTodoItem = {
    task: dataById?.task,
    description: dataById?.description,
    category: dataById?.category,
    time: dataById?.time.substring(0, 10),
    priority: dataById?.priority,
    fulfillment: dataById?.fulfillment,
  };

  const updateTodo = async () => {
    const todoData = formik.values;
    try {
      await axios.put(
        `${process.env.NEXTAUTH_URL}/api/todos/${todoId}`,
        todoData,
      );
      router.push("/my-todos");
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormsValidation(updateTodo, initialValue);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="relative flex h-5/6 w-full max-w-screen-lg flex-col items-center rounded-2xl bg-primary bg-opacity-50 px-12 py-8">
        <h1 className="mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-4xl font-bold text-transparent">
          My To-Do-Lists
        </h1>
        <div className="flex h-full w-full max-w-screen-lg flex-col rounded-3xl bg-white px-12 py-8">
          <h2 className="my-3 text-lg font-semibold">Add a new to-do:</h2>
          <form
            onSubmit={formik.handleSubmit}
            className="flex h-full w-full gap-12"
          >
            <div className="required flex h-full w-full flex-col justify-between">
              <div className="flex h-auto justify-between ">
                <label className="text-xl font-normal" htmlFor="task">
                  Task :
                </label>
                <input
                  name="task"
                  type="text"
                  id="task"
                  className="w-60 rounded-md border border-black bg-gray-50 p-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="name for the task you’re going to do"
                  value={formik.values.task}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex h-auto justify-between">
                <label className="text-xl font-normal" htmlFor="description">
                  Description :
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="block h-24 w-60 resize-none rounded-lg border border-black bg-gray-50 p-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="a short description of the task - can be omitted"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex h-auto justify-between">
                <label className="text-xl font-normal" htmlFor="category">
                  Category :
                </label>
                <input
                  name="category"
                  type="text"
                  id="category"
                  className="w-60 rounded-md border border-black bg-gray-50 p-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="e.g. household, school, work"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex h-auto justify-between">
                <label className="text-xl font-normal" htmlFor="time">
                  Date :
                </label>
                <input
                  name="time"
                  type="date"
                  id="time"
                  className="w-60 rounded-md border border-black bg-gray-50 p-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="dd/mm/yyyy  - can be omitted"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="flex h-full w-full flex-col justify-between">
              <div className="flex h-3/6 w-full flex-col justify-between">
                <div className="w-full">
                  <label
                    className="inline-block w-28 text-xl font-normal"
                    htmlFor="priority"
                  >
                    Priority :
                  </label>
                  <select
                    name="priority"
                    id="priority"
                    className="p-2"
                    placeholder="Select your option"
                    onChange={formik.handleChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="w-full">
                  <label
                    className="inline-block w-28 text-xl font-normal"
                    htmlFor="fulfillment"
                  >
                    Fulfillment :
                  </label>
                  <input
                    name="fulfillment"
                    type="range"
                    id="fulfillment"
                    className=""
                    value={formik.values.fulfillment}
                    onChange={formik.handleChange}
                  />
                  <div className="relative ml-2 flex items-start py-4">
                    <input
                      name="completed"
                      id="2"
                      type="checkbox"
                      className="peer hidden"
                      checked={formik.values.fulfillment === 100}
                      readOnly
                    />
                    <label
                      htmlFor="2"
                      className="bg-brand-light text-brand-black peer-checked:decoration-brand-dark inline-flex w-auto items-center justify-between rounded-lg border border-violet-500 p-2 font-medium tracking-tight decoration-2 peer-checked:border-violet-400 peer-checked:bg-violet-700 peer-checked:font-medium peer-checked:text-white peer-checked:underline"
                    >
                      <div className="flex w-full items-center justify-center">
                        <div className="text-brand-black text-sm">
                          {formik.values.fulfillment === 100
                            ? "Task Completed"
                            : "On-going Task"}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-row items-center justify-evenly">
                <button
                  type="submit"
                  className="font rounded-xl border bg-primary px-12 py-2 text-center text-white transition hover:scale-105 hover:border-slate-300 hover:bg-secondary hover:text-black"
                >
                  Save
                </button>

                <button
                  type="button"
                  className="font rounded-xl border bg-white px-12 py-2 text-center text-primary transition hover:scale-105 hover:border-slate-300 hover:bg-secondary hover:text-black"
                  onClick={() => {
                    router.back();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTodoById;
