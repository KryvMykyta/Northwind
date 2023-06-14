import { Router } from "express";
import { Pool } from "pg";
import { SearchController } from "./../controllers/searchController";

export class SearchRouter {
  router: Router;
  path: string;
  controller: SearchController;

  constructor(path: string, pool: Pool) {
    (this.router = Router()), (this.path = path);
    this.controller = new SearchController(pool);
    this.router.get("/products/:key", this.controller.searchProducts);
    this.router.get("/customers/:key", this.controller.searchCustomers);
  }
}
