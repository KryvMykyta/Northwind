import { getSuppliersCount } from "./../controllers/count/suppliersCount"
import { Router } from "express"
import { getProductsCount } from "./../controllers/count/productsCount"
import { getOrdersCount } from "./../controllers/count/ordersCount"
import { getCustomersCount } from "./../controllers/count/customersCount"
import { getEmployeesCount } from "./../controllers/count/employeesCount"

export const countRouter = Router()

countRouter.get("/suppliers", getSuppliersCount)

countRouter.get("/products", getProductsCount)

countRouter.get("/orders", getOrdersCount)

countRouter.get("/customers", getCustomersCount)

countRouter.get("/employees", getEmployeesCount)