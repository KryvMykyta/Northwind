import { Router } from "express";
import { Pool } from "pg";
import { PagesController } from "./../controllers/pagesController";

export class PagesRouter {
  router: Router;
  path: string;
  controller: PagesController;

  constructor(path: string, pool: Pool) {
    (this.router = Router()), (this.path = path);
    this.controller = new PagesController(pool);
    this.router.get("/products/:page", this.controller.getProducts);
    this.router.get("/customers/:page", this.controller.getCustomers);
    this.router.get("/orders/:page", this.controller.getOrders);
    this.router.get("/suppliers/:page", this.controller.getSuppliers);
    this.router.get("/employees/:page", this.controller.getEmployees);
  }
}
