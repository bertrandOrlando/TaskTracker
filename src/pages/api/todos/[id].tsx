import { NextApiRequest, NextApiResponse } from "next";
import connection from "@/../db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    console.log(req.query);
    const todoId = req.query.id;
    connection.query(`DELETE FROM to_do WHERE id = ${todoId}`, (err, rows) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(`Item with id ${todoId} Deleted`);
      }
    });
  } else if (req.method === "PUT") {
  }
}
