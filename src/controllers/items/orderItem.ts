import { DataFormatter } from "../../formatter/DataFormatter";
import { Request, Response } from "express";
import { repository } from "./../../repository/pgRepository";
import dotenv from "dotenv";
dotenv.config();

export async function getOrder(req: Request<{ id: number }>, res: Response) {
  try {
    const id = req.params.id;
    const formatter = new DataFormatter();

    const rawTopOrderInfo = await repository.getOrderById(id);
    const productsInOrder = await repository.getOrderProductsById(id);

    const response = formatter.formatOrderResponse(
      rawTopOrderInfo,
      productsInOrder
    );

    return res.status(200).send(response);
  } catch (err) {
    console.log(err)
    return res.status(500).send("Server error");
  }
}
