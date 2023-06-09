import { Router } from "express";
import { Pool } from "pg";
import { ItemController } from "./../controllers/itemController";

export class ItemRouter {
  router: Router;
  path: string;
  controller: ItemController;

  constructor(path: string, pool: Pool) {
    (this.router = Router()), (this.path = path);
    this.controller = new ItemController(pool);
    this.router.get("/product/:id", this.controller.getProduct);
    this.router.get("/customer/:id", this.controller.getCustomer);
    this.router.get("/order/:id", this.controller.getOrder);
    this.router.get("/supplier/:id", this.controller.getSupplier);
    this.router.get("/employee/:id", this.controller.getEmployee);
  }
}
