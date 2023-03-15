import { Request, Response } from "express";
import { PgRepository } from "../../repository/pgRepository";
import dotenv from "dotenv";
dotenv.config();

export async function getSupplier(req: Request<{ id: number }>, res: Response) {
  try {
    const id = req.params.id;
    const repository = new PgRepository(process.env.CONN_STRING as string);
    const rawCustomerData = await repository.getSupplierById(id);
    return res.status(200).send(rawCustomerData);
  } catch (err) {
    return res.status(500).send("Server error");
  }
}
