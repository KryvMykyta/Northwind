import { Request, Response } from "express";
import { repository } from "./../../repository/pgRepository";
import dotenv from "dotenv";
dotenv.config();

export async function getEmployeesCount(
  req: Request,
  res: Response
) {
  try {
    const employeesCountData = await repository.getEmployeesCount();
    return res.status(200).send({
      data: employeesCountData,
      sqlQueries: employeesCountData.sqlQueries
    });
  } catch (err) {
    return res.status(500).send("Server error");
  }
}