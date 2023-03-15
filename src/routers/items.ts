import { getCustomer } from "../controllers/items/customerItem"
import { getEmployee } from "../controllers/items/employeeItem"
import { getOrder } from "../controllers/items/orderItem"
import { getProduct } from "../controllers/items/productItem"
import { getSupplier } from "../controllers/items/supplierItem"
import { Router } from "express"

export const itemRouter = Router()

itemRouter.get("/supplier/:id", getSupplier)

itemRouter.get("/product/:id", getProduct)

itemRouter.get("/order/:id", getOrder)

itemRouter.get("/customer/:id", getCustomer)

itemRouter.get("/employee/:id", getEmployee)