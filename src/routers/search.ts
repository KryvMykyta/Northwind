import { searchCustomers } from "../controllers/search/searchCostumers";
import { searchProducts } from "../controllers/search/searchProducts";
import { Router } from "express";

export const searchRouter = Router()

searchRouter.get('products/:key', searchProducts)

searchRouter.get('customers/:key', searchCustomers)