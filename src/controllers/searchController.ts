import { Request, Response } from "express";
import { DataFormatter } from "./../formatter/DataFormatter";
import { Pool } from "pg";
import { SearchRepository } from "./../repository/SearchRepository";
export class SearchController {
  repository: SearchRepository;
  formatter: DataFormatter;

  constructor(pool: Pool) {
    this.repository = new SearchRepository(pool);
    this.formatter = new DataFormatter(this.repository);
  }

  public searchProducts = async (
    req: Request<{ key: string }>,
    res: Response
  ) => {
    try {
      const keyword = req.params.key;
      const rawCustomersData = await this.repository.searchProducts(keyword);
      return res.status(200).send(rawCustomersData);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server error");
    }
  };

  public searchCustomers = async (
    req: Request<{ key: string }>,
    res: Response
  ) => {
    try {
      const keyword = req.params.key;
      const rawCustomersData = await this.repository.searchCustomers(keyword);
      return res.status(200).send(rawCustomersData);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server error");
    }
  };
}
