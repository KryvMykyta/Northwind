import { DataFormatter } from "../../formatter/DataFormatter";
import { Request, Response } from "express";
// import { PgRepository } from "../../repository/pgRepository";
import { repository } from "./../../repository/pgRepository";
import dotenv from "dotenv";
dotenv.config();

export async function getOrders(req: Request<{ page: number },{},{},{count?: string}>, res: Response) {
  try {
    const {page} = req.params
    const {count} = req.query
    const formatter = new DataFormatter();
    const firstIdQuery = await repository.getFirstOrderId();
    const { data } = firstIdQuery;
    const {first} = data[0]
    const ordersPage = await repository.ordersPage(first, page);
    const formattedResponse = formatter.formatOrdersPageResponse(ordersPage, firstIdQuery.sqlQueries[0]);

    const totalPagesData = await formatter.addTotalPages(formattedResponse.sqlQueries, page,"orders", count)

    return res.status(200).send({
      data: formattedResponse.data,
      totalPages: totalPagesData.totalPages,
      currentPage: page,
      sqlQueries: totalPagesData.sqlQueries
    });

    // return res.status(200).send(formattedRespones);
  } catch (err) {
    return res.status(500).send("Server error");
  }
}
