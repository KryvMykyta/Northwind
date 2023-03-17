import { Request, Response } from "express";
import { repository } from "./../../repository/pgRepository";
import dotenv from "dotenv";
dotenv.config();

export async function getCustomersCount(
  req: Request,
  res: Response
) {
  try {
    const customersCountData = await repository.getCustomersCount();
    return res.status(200).send({
      data: customersCountData,
      sqlQueries: customersCountData.sqlQueries
    });
  } catch (err) {
    return res.status(500).send("Server error");
  }
}