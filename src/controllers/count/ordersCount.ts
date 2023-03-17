import { Request, Response } from "express";
import { repository } from "./../../repository/pgRepository";
import dotenv from "dotenv";
dotenv.config();

export async function getOrdersCount(
  req: Request,
  res: Response
) {
  try {
    const ordersCountData = await repository.getOrdersCount();
    return res.status(200).send({
      data: ordersCountData,
      sqlQueries: ordersCountData.sqlQueries
    });
  } catch (err) {
    return res.status(500).send("Server error");
  }
}