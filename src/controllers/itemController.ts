import { Request, Response } from "express";
import { DataFormatter } from "./../formatter/DataFormatter";
import { Pool } from "pg";
import { ItemRepository } from "./../repository/ItemRepository";
export class itemController {
  repository: ItemRepository;
  formatter: DataFormatter;

  constructor(pool: Pool) {
    this.repository = new ItemRepository(pool);
    this.formatter = new DataFormatter(this.repository);
  }

  public getCustomer = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const id = req.params.id;
      const rawCustomerData = await this.repository.getCustomerById(id);
      return res.status(200).send(rawCustomerData);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server error");
    }
  };

  public getEmployee = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const id = req.params.id;
      const rawCustomerData = await this.repository.getEmployeeById(id);
      return res.status(200).send(rawCustomerData);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server error");
    }
  };

  public getOrder = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const id = req.params.id;

      const rawTopOrderInfo = await this.repository.getOrderById(id);
      const productsInOrder = await this.repository.getOrderProductsById(id);

      const response = this.formatter.formatOrderResponse(
        rawTopOrderInfo,
        productsInOrder
      );

      return res.status(200).send(response);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server error");
    }
  };

  public getProduct = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const id = req.params.id;
      const rawCustomerData = await this.repository.getProductById(id);

      return res.status(200).send(rawCustomerData);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server error");
    }
  };

  public getSupplier = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const id = req.params.id;
      const rawCustomerData = await this.repository.getSupplierById(id);
      return res.status(200).send(rawCustomerData);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server error");
    }
  };
}
