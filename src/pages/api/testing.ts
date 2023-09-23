import { NextApiRequest, NextApiResponse } from "next";
import sql from "../../../postgresql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const users = await sql`select 5 as id `;
  // users = Result [{ name: "Walter", age: 80 }, { name: 'Murray', age: 68 }, ...]
  res.status(200).json(users);
}
