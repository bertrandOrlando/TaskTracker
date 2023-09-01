import { NextApiRequest, NextApiResponse } from "next";
import connection from "@/../db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const todoId = req.query.id;
    connection.query(
      `SELECT * FROM to_do WHERE id = ${todoId}`,
      (err, rows) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(rows);
        }
      },
    );
  } else if (req.method === "DELETE") {
    const todoId = req.query.id;
    connection.query(`DELETE FROM to_do WHERE id = ${todoId}`, (err, rows) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(`Item with id ${todoId} Deleted!`);
      }
    });
  } else if (req.method === "PUT") {
    const todoId = req.query.id;
    console.log(req.body);
    const { task, description, category, time, priority, fulfillment } =
      req.body as bodyTodoItem;
    connection.query(
      `UPDATE to_do SET task="${task}",description="${description}",category="${category}",time="${time.substring(
        0,
        10,
      )}",priority="${priority}",fulfillment=${fulfillment} WHERE id = ${todoId}`,
      (err, rows) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(`Item with id ${todoId} successfullty updated!`);
        }
      },
    );
  }
}
