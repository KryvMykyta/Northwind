import { DataFormatter } from "../../formatter/DataFormatter";
import { Request, Response } from "express";
// import { PgRepository } from "../../repository/pgRepository";
import { repository } from "./../../repository/pgRepository";
import dotenv from "dotenv";
dotenv.config();

export async function getProducts(
  req: Request<{ page: number }>,
  res: Response
) {
  try {
    const page = req.params.page;
    // const repository = new PgRepository(process.env.CONN_STRING as string);
    const rawCustomersData = await repository.productsPage(page);
    return res.status(200).send(rawCustomersData);
  } catch (err) {
    return res.status(500).send("Server error");
  }
}
