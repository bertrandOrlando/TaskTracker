import { NextApiRequest } from "next/types";
import connection from "../../db";

export const todo = (
  method: string,
  query: { sort_by: string; sort?: string }
) => {};
