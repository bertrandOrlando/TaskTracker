import { NextApiRequest, NextApiResponse } from "next";
import connection from "@/../db";
import sql from "../../../../postgresql";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  // @ts-ignore
  const userID = session?.user?.id;

  if (req.method === "GET") {
    const todoID = req.query.id || "";
    const todos = await sql<
      TodoItem[]
    >`SELECT * FROM to_dos WHERE user_id = ${userID} AND id = ${todoID}`;
    res.status(200).json(todos);

    // connection.query(
    //   `SELECT * FROM to_do WHERE id = ${todoID}`,
    //   (err, rows) => {
    //     if (err) {
    //       res.status(400).json(err);
    //     } else {
    //       res.status(200).json(rows);
    //     }
    //   },
    // );
  } else if (req.method === "DELETE") {
    const todoID = req.query.id || "";
    await sql<
      TodoItem[]
    >`DELETE FROM to_dos WHERE user_id = ${userID} AND id = ${todoID}`;

    res.status(200).json("Successfully deleted Todo");

    // connection.query(`DELETE FROM to_do WHERE id = ${todoID}`, (err, rows) => {
    //   if (err) {
    //     res.status(400).json(err);
    //   } else {
    //     res.status(200).json(`Item with id ${todoID} Deleted!`);
    //   }
    // });
  } else if (req.method === "PUT") {
    const todoID = req.query.id || "";

    const { task, description, category, time, priority, fulfillment } =
      req.body as bodyTodoItem;

    const todoUpdate = {
      task,
      description,
      category,
      time,
      priority,
      fulfillment,
    };

    const todo = await sql`
      update to_dos set ${sql(
        todoUpdate,
        "task",
        "description",
        "category",
        "time",
        "priority",
        "fulfillment",
      )}
      where id = ${todoID}
    `;

    res.status(200).json(`Item with id ${todoID} successfullty updated!`);

    // connection.query(
    //   `UPDATE to_do SET task="${task}",description="${description}",category="${category}",time="${time.substring(
    //     0,
    //     10,
    //   )}",priority="${priority}",fulfillment=${fulfillment} WHERE id = ${todoID}`,
    //   (err, rows) => {
    //     if (err) {
    //       res.status(400).json(err);
    //     } else {
    //       res.status(200).json(`Item with id ${todoID} successfullty updated!`);
    //     }
    //   },
    // );
  }
}
