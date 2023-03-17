import { DataFormatter } from "../../formatter/DataFormatter";
import { Request, Response } from "express";
import { repository } from "./../../repository/pgRepository";
import dotenv from "dotenv";
dotenv.config();

export async function getCustomers(
  req: Request<{ page: number},{},{},{count?: string }>,
  res: Response
) {
  try {
    const {page} = req.params
    const {count} = req.query
    const rawCustomersData = await repository.customersPage(page);
    const formatter = new DataFormatter();
    const formattedData = formatter.addAvatarCustomer(rawCustomersData.data);

    const totalPagesFormat = await formatter.addTotalPages(rawCustomersData.sqlQueries, page, "customers", count)

    return res.status(200).send({
      data: formattedData,
      totalPages: totalPagesFormat.totalPages,
      currentPage: page,
      sqlQueries: totalPagesFormat.sqlQueries,
    });
  } catch (err) {
    return res.status(500).send("Server error");
  }
}
