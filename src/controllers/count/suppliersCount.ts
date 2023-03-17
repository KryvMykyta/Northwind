import { Request, Response } from "express";
import { repository } from "./../../repository/pgRepository";
import dotenv from "dotenv";
dotenv.config();

export async function getSuppliersCount(
  req: Request,
  res: Response
) {
  try {
    const suppliersCountData = await repository.getSuppliersCount();
    return res.status(200).send({
      data: suppliersCountData,
      sqlQueries: suppliersCountData.sqlQueries
    });
  } catch (err) {
    return res.status(500).send("Server error");
  }
}