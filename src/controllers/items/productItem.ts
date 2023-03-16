import { Request, Response } from "express";
import { repository } from "./../../repository/pgRepository";
import dotenv from "dotenv";
dotenv.config();

export async function getProduct(req: Request<{ id: number }>, res: Response) {
  try {
    const id = req.params.id;


    const rawCustomerData = await repository.getProductById(id);

    return res.status(200).send(rawCustomerData);
  } catch (err) {
    return res.status(500).send("Server error");
  }
}
