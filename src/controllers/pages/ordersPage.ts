import { DataFormatter } from "../../formatter/DataFormatter";
import { Request, Response } from "express";
// import { PgRepository } from "../../repository/pgRepository";
import { repository } from "./../../repository/pgRepository";
import dotenv from "dotenv";
dotenv.config();

export async function getOrders(req: Request<{ page: number }>, res: Response) {
  try {
    const page = req.params.page;
    // const repository = new PgRepository(process.env.CONN_STRING as string);
    const formatter = new DataFormatter();
    const firstIdQuery = await repository.getFirstOrderId();
    const { data } = firstIdQuery;
    const {first} = data[0]
    const ordersPage = await repository.ordersPage(first, page);
    const formattedRespones = formatter.formatOrdersPageResponse(ordersPage, {
      sql: firstIdQuery.sqlQueries[0].sql,
      sqlType: firstIdQuery.sqlQueries[0].sqlType,
      resultsCount: firstIdQuery.sqlQueries[0].resultsCount,
      timeStart: firstIdQuery.sqlQueries[0].timeStart,
      timeTaken: firstIdQuery.sqlQueries[0].timeTaken,
    });

    return res.status(200).send(formattedRespones);
  } catch (err) {
    return res.status(500).send("Server error");
  }
}
