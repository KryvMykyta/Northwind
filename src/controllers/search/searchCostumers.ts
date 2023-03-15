import { Request, Response } from "express";
import { PgRepository } from "./../../repository/pgRepository";

export async function searchCustomers(
  req: Request<{ key: string }>,
  res: Response
) {
  try {
    const keyword = req.params.key;
    const repository = new PgRepository(process.env.CONN_STRING as string);
    const rawCustomersData = await repository.searchCustomers(keyword);
    return res.status(200).send(rawCustomersData);
  } catch (err) {
    return res.status(500).send("Server error");
  }
}
