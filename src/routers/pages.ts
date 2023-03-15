import { getCustomers } from '../controllers/pages/customersPage';
import { getEmployees } from '../controllers/pages/employeesPage';
import { getOrders } from '../controllers/pages/ordersPage';
import { getProducts } from '../controllers/pages/productsPage';
import { getSuppliers } from '../controllers/pages/suppliersPage';
import { Router } from 'express';

export const pagesRouter = Router()

pagesRouter.get("/suppliers/:page", getSuppliers)

pagesRouter.get("/products/:page", getProducts)

pagesRouter.get("/orders/:page", getOrders)

pagesRouter.get("/employees/:page", getEmployees)

pagesRouter.get("/customers/:page", getCustomers)