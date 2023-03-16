import { repository } from "./../../repository/pgRepository";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

export async function getCustomer(req: Request<{ id: string }>, res: Response) {
  try {
    const id = req.params.id;
    const rawCustomerData = await repository.getCustomerById(id);
    return res.status(200).send(rawCustomerData);
  } catch (err) {
    return res.status(500).send("Server error");
  }
}
