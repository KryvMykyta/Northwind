import { Request, Response } from "express";
import { repository } from "./../../repository/pgRepository";
import dotenv from "dotenv";
dotenv.config();

export async function getProductsCount(
  req: Request,
  res: Response
) {
  try {
    const productsCountData = await repository.getCount("products");
    return res.status(200).send({
      data: productsCountData,
      sqlQueries: productsCountData.sqlQueries
    });
  } catch (err) {
    return res.status(500).send("Server error");
  }
}