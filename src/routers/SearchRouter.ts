import { Router } from "express";
import { Pool } from "pg";
import { searchController } from "./../controllers/searchController";

export class SearchRouter {
  router: Router;
  path: string;
  controller: searchController;

  constructor(path: string, pool: Pool) {
    (this.router = Router()), (this.path = path);
    this.controller = new searchController(pool);
    this.router.get("/products/:key", this.controller.searchProducts);
    this.router.get("/customers/:key", this.controller.searchCustomers);
  }
}
