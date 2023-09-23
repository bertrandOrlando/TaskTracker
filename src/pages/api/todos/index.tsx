// import { NextApiRequest, NextApiResponse } from "next";
// import { GetTodos, CreateTodo } from "@/services/todos.services";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { method } = req;

//   if (method === "GET") {
//     try {
//       const data = GetTodos();
//       res.status(200).json(data);
//     } catch (err) {
//       res.status(404).json(err);
//     }
//   } else if (method === "POST") {
//     try {
//       await CreateTodo(req.body);
//       res.status(200).json("Successfully added new Todo");
//     } catch (error) {
//       console.log(error);
//       res.status(400).json(error);
//     }
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import connection from "@/../db";

import sql from "@/../postgresql";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  // @ts-ignore
  const userID = session?.user?.id;
  try {
    if (req.method === "GET") {
      if (req.query.sort_by === "priority") {
        if (req.query.sort === "1") {
          const todos = await sql<
            TodoItem[]
          >`SELECT * FROM to_dos WHERE user_id = ${userID} ORDER BY priority ASC`;
          res.status(200).json(todos);
          // connection.query(
          //   "SELECT * from to_do ORDER BY priority ASC",
          //   (_err, rows) => {
          //     if (_err) {
          //       res.status(400).json(_err);
          //     } else {
          //       res.status(200).json(rows);
          //     }
          //   },
          // );
        } else if (req.query.sort === "-1") {
          const todos = await sql<
            TodoItem[]
          >`SELECT * FROM to_dos WHERE user_id = ${userID} ORDER BY priority DESC`;
          res.status(200).json(todos);
          // connection.query(
          //   "SELECT * from to_do ORDER BY priority DESC",
          //   (_err, rows) => {
          //     if (_err) {
          //       res.status(400).json(_err);
          //     } else {
          //       res.status(200).json(rows);
          //     }
          //   },
          // );
        }
      } else if (req.query.sort_by === "time") {
        if (req.query.sort === "1") {
          const todos = await sql<
            TodoItem[]
          >`SELECT * FROM to_dos WHERE user_id = ${userID} ORDER BY time ASC`;
          res.status(200).json(todos);
          // connection.query(
          //   "SELECT * from to_do ORDER BY time ASC",
          //   (_err, rows) => {
          //     if (_err) {
          //       res.status(400).json(_err);
          //     } else {
          //       res.status(200).json(rows);
          //     }
          //   },
          // );
        } else if (req.query.sort === "-1") {
          const todos = await sql<
            TodoItem[]
          >`SELECT * FROM to_dos WHERE user_id = ${userID} ORDER BY time DESC`;
          res.status(200).json(todos);
          // connection.query(
          //   "SELECT * from to_do ORDER BY time DESC",
          //   (_err, rows) => {
          //     if (_err) {
          //       res.status(400).json(_err);
          //     } else {
          //       res.status(200).json(rows);
          //     }
          //   },
          // );
        }
      } else if (req.query.filter === "completed") {
        const todos = await sql<
          TodoItem[]
        >`SELECT * FROM to_dos WHERE user_id = ${userID} AND fulfillment = 100`;
        res.status(200).json(todos);
        // connection.query(
        //   "SELECT * from to_do WHERE fulfillment = 100",
        //   (_err, rows) => {
        //     if (_err) {
        //       res.status(400).json(_err);
        //     } else {
        //       res.status(200).json(rows);
        //     }
        //   },
        // );
      } else if (req.query.filter === "todo") {
        const todos = await sql<
          TodoItem[]
        >`SELECT * FROM to_dos WHERE user_id = ${userID} AND fulfillment != 100`;
        res.status(200).json(todos);
        // connection.query(
        //   "SELECT * from to_do WHERE fulfillment != 100",
        //   (_err, rows) => {
        //     if (_err) {
        //       res.status(400).json(_err);
        //     } else {
        //       res.status(200).json(rows);
        //     }
        //   },
        // );
      } else {
        const todos = await sql<
          TodoItem[]
        >`SELECT * FROM to_dos WHERE user_id = ${userID}`;
        res.status(200).json(todos);
        // connection.query("SELECT * from to_do;", (_err, rows) => {
        //   if (_err) {
        //     res.status(400).json(_err);
        //   } else {
        //     res.status(200).json(rows);
        //   }
        // });
      }
    } else if (req.method === "POST") {
      const todoData = req.body as AddTodo;
      if (
        todoData.task &&
        todoData.description &&
        todoData.category &&
        todoData.time &&
        todoData.priority &&
        todoData.user_id &&
        typeof todoData.fulfillment === "number"
      ) {
        try {
          await sql`insert into to_dos ${sql(
            todoData,
            "task",
            "description",
            "category",
            "time",
            "priority",
            "fulfillment",
            "user_id",
          )};`;

          res.status(200).json("Successfully add Todo");
        } catch (error) {
          res.status(400).json(error);
        }
        // connection.query(
        //   `INSERT INTO to_do (Task,Description,Category,Time,Priority,Fulfillment) VALUES ("${todoData.task}", "${todoData.description}", "${todoData.category}", "${todoData.time}", "${todoData.priority}", ${todoData.fulfillment});`,
        //   (_err, rows) => {
        //     if (_err) {
        //       res.status(400).json(_err);
        //     } else {
        //       res.status(200).json(rows);
        //     }
        //   },
        // );
      } else {
        res.status(400).json("Some fields are required");
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}
