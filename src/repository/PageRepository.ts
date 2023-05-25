import { RepositoryBase } from "./RepositoryBase";

import {
  customers,
  employees,
  orderDetail,
  orders,
  products,
  supplies,
} from "../schemas/pgSchema";
import { sql } from "drizzle-orm/sql";
import { eq, asc, and, gte, lt } from "drizzle-orm/expressions";

export class PageRepository extends RepositoryBase {
  public getFirstOrderId = async () => {
    const startTime = new Date();
    const totalQuery = this.db
      .select({ first: orders.orderID })
      .from(orders)
      .limit(1)
      .orderBy(asc(orders.orderID));

    const { sql: sqlString } = totalQuery.toSQL();

    const queryResponse = await totalQuery;
    const endTime = new Date();
    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };
  public customersPage = async (page: number) => {
    const startTime = new Date();
    const customersQuery = this.db
      .select({
        id: customers.customerID,
        company: customers.companyName,
        name: customers.contactName,
        title: customers.contactTitle,
        city: customers.city,
        country: customers.country,
      })
      .from(customers)
      .orderBy(customers.customerID)
      .limit(20)
      .offset((page - 1) * 20);

    const { sql } = customersQuery.toSQL();

    const queryResponse = await customersQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public productsPage = async (page: number) => {
    const startTime = new Date();
    const productsQuery = this.db
      .select({
        id: products.productID,
        name: products.productName,
        qt: products.quantityPerUnit,
        price: products.unitPrice,
        stock: products.unitsInStock,
        orders: products.unitsOnOrder,
      })
      .from(products)
      .orderBy(products.productID)
      .limit(20)
      .offset((page - 1) * 20);

    const { sql } = productsQuery.toSQL();

    const queryResponse = await productsQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public suppliersPage = async (page: number) => {
    const startTime = new Date();
    const suppliesQuery = this.db
      .select({
        id: supplies.supplierID,
        companyName: supplies.companyName,
        name: supplies.contactName,
        title: supplies.contactTitle,
        city: supplies.city,
        country: supplies.country,
      })
      .from(supplies)
      .orderBy(supplies.supplierID)
      .limit(20)
      .offset((page - 1) * 20);

    const { sql } = suppliesQuery.toSQL();

    const queryResponse = await suppliesQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public employeesPage = async (page: number) => {
    const startTime = new Date();
    const employeesQuery = this.db
      .select({
        id: employees.employeeID,
        name: sql<string>`CONCAT(${employees.firstName}, ' ' , ${employees.lastName})`.as(
          "name"
        ),
        phone: employees.homePhone,
        title: employees.title,
        city: employees.city,
        country: employees.country,
      })
      .from(employees)
      .orderBy(employees.employeeID)
      .limit(20)
      .offset((page - 1) * 20);

    const { sql: sqlString } = employeesQuery.toSQL();

    const queryResponse = await employeesQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public ordersPage = async (first: number, page: number) => {
    const startTime = new Date();
    const ordersQuery = this.db
      .select({
        TotalProductsPrice:
          sql<number>`SUM(${orderDetail.unitPrice} * ${orderDetail.quantity})`.as(
            "TotalProductsPrice"
          ),
        TotalProductsItems: sql<number>`SUM(${orderDetail.quantity})`.as(
          "TotalProductsItems"
        ),
        TotalProducts: sql<number>`COUNT(${orderDetail.orderID})`.as(
          "TotalProducts"
        ),
        OrderId: orders.orderID,
        Shipped: orders.shippedDate,
        ShipName: orders.shipName,
        City: orders.shipCity,
        Country: orders.shipCountry,
      })
      .from(orders)
      .leftJoin(orderDetail, eq(orders.orderID, orderDetail.orderID))
      .where(
        and(
          gte(orders.orderID, Number(first) + (page - 1) * 20),
          lt(orders.orderID, Number(first) + page * 20)
        )
      )
      .groupBy(
        orders.orderID,
        orders.shippedDate,
        orders.shipName,
        orders.shipCity,
        orders.shipCountry
      )
      .orderBy(asc(orders.orderID));

    const { sql: sqlString } = ordersQuery.toSQL();

    const queryResponse = await ordersQuery;
    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select where left join",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };
}
