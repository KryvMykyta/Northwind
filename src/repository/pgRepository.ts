import { tables } from "./../types/types";
import { shippers } from "./../schemas/pgSchema";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  customers,
  employees,
  orderDetail,
  Orders,
  products,
  supplies,
} from "../schemas/pgSchema";
import { sql } from "drizzle-orm/sql";
import { eq, asc, ilike, and, gte, lt } from "drizzle-orm/expressions";
import dotenv from "dotenv";
dotenv.config();

export class PgRepository {
  CONN_STRING: string;
  db: NodePgDatabase;

  constructor(connectionString: string) {
    this.CONN_STRING = connectionString;
    const poolConnection = new Pool({
      connectionString: this.CONN_STRING,
    });
    const db = drizzle(poolConnection);
    this.db = db;
  }

  public getCount = async (table: tables) => {
    const startTime = new Date();
    let queryRequest, sqlString, endTime, queryResponse;
    switch (table) {
      case "customers":
        queryRequest = this.db
          .select({
            count: sql<number>`COUNT (*)`.as("count"),
          })
          .from(customers);
        sqlString = queryRequest.toSQL().sql;
        queryResponse = await queryRequest;
        endTime = new Date();
        break;
      case "employees":
        queryRequest = this.db
          .select({
            count: sql<number>`COUNT (*)`.as("count"),
          })
          .from(employees);
        sqlString = queryRequest.toSQL().sql;
        queryResponse = await queryRequest;
        endTime = new Date();
        break;
      case "orders":
        queryRequest = this.db
          .select({
            count: sql<number>`COUNT (*)`.as("count"),
          })
          .from(Orders);
        sqlString = queryRequest.toSQL().sql;
        queryResponse = await queryRequest;
        endTime = new Date();
        break;
      case "products":
        queryRequest = this.db
          .select({
            count: sql<number>`COUNT (*)`.as("count"),
          })
          .from(products);
        sqlString = queryRequest.toSQL().sql;
        queryResponse = await queryRequest;
        endTime = new Date();
        break;
      case "suppliers":
        queryRequest = this.db
          .select({
            count: sql<number>`COUNT (*)`.as("count"),
          })
          .from(supplies);
        sqlString = queryRequest.toSQL().sql;
        queryResponse = await queryRequest;
        endTime = new Date();
        break;
    }
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


  public getCustomerById = async (id: string) => {
    const startTime = new Date();
    const customerQuery = this.db
      .select()
      .from(customers)
      .where(eq(customers.CustomerID, id));
    const { sql } = customerQuery.toSQL();

    const queryResponse = await customerQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public getEmployeeById = async (id: number) => {
    const startTime = new Date();
    const employeeQuery = this.db
      .select()
      .from(employees)
      .where(eq(employees.EmployeeID, id));
    const { sql } = employeeQuery.toSQL();

    const queryResponse = await employeeQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public getProductById = async (id: number) => {
    const startTime = new Date();
    const productQuery = this.db
      .select({
        productName: products.ProductName,
        supplierId: products.SupplierID,
        supplier: supplies.CompanyName,
        qtyPerUnit: products.QuantityPerUnit,
        unitPrice: products.UnitPrice,
        unitsInStock: products.UnitsInStock,
        unitsInOrder: products.UnitsOnOrder,
        reorderLevel: products.ReorderLevel,
        discontinued: products.Discontinued,
      })
      .from(products)
      .leftJoin(supplies, eq(products.SupplierID, supplies.SupplierID))
      .where(eq(products.ProductID, id));
    const { sql } = productQuery.toSQL();

    const queryResponse = await productQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where left join",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public getSupplierById = async (id: number) => {
    const startTime = new Date();
    const suppliesQuery = this.db
      .select()
      .from(supplies)
      .where(eq(supplies.SupplierID, id));
    const { sql } = suppliesQuery.toSQL();

    const queryResponse = await suppliesQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public searchCustomers = async (keyword: string) => {
    const startTime = new Date();
    const foundCustomers = this.db
      .select({
        id: customers.CustomerID,
        name: customers.CompanyName,
        contact: customers.ContactName,
        title: customers.ContactTitle,
        phone: customers.Phone,
      })
      .from(customers)
      .where(ilike(customers.CompanyName, `%${keyword}%`));

    const { sql } = foundCustomers.toSQL();

    const queryResponse = await foundCustomers;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public searchProducts = async (keyword: string) => {
    const startTime = new Date();
    const foundProducts = this.db
      .select({
        id: products.ProductID,
        name: products.ProductName,
        quantPerUnit: products.QuantityPerUnit,
        price: products.UnitPrice,
        stock: products.UnitsInStock,
      })
      .from(products)
      .where(ilike(products.ProductName, `%${keyword}%`));

    const { sql } = foundProducts.toSQL();

    const queryResponse = await foundProducts;
    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
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
        id: customers.CustomerID,
        company: customers.CompanyName,
        name: customers.ContactName,
        title: customers.ContactTitle,
        city: customers.City,
        country: customers.Country,
      })
      .from(customers)
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
          sqlType: "select where",
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
        id: products.ProductID,
        name: products.ProductName,
        qt: products.QuantityPerUnit,
        price: products.UnitPrice,
        stock: products.UnitsInStock,
        orders: products.UnitsOnOrder,
      })
      .from(products)
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
          sqlType: "select where",
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
        id: supplies.SupplierID,
        companyName: supplies.CompanyName,
        name: supplies.ContactName,
        title: supplies.ContactTitle,
        city: supplies.City,
        country: supplies.Country,
      })
      .from(supplies)
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
          sqlType: "select where",
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
        id: employees.EmployeeID,
        name: sql<string>`CONCAT(${employees.FirstName}, ' ' , ${employees.LastName})`.as(
          "name"
        ),
        phone: employees.HomePhone,
        title: employees.Title,
        city: employees.City,
        country: employees.Country,
      })
      .from(employees)
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
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public getFirstOrderId = async () => {
    const startTime = new Date();
    const totalQuery = this.db
      .select({ first: Orders.OrderID })
      .from(Orders)
      .limit(1)
      .orderBy(asc(Orders.OrderID));

    const { sql: sqlString } = totalQuery.toSQL();

    const queryResponse = await totalQuery;
    const endTime = new Date();
    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select where",
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
          sql<number>`SUM(${orderDetail.UnitPrice} * ${orderDetail.Quantity})`.as(
            "TotalProductsPrice"
          ),
        TotalProductsItems: sql<number>`SUM(${orderDetail.Quantity})`.as(
          "TotalProductsItems"
        ),
        TotalProducts: sql<number>`COUNT(${orderDetail.OrderID})`.as(
          "TotalProducts"
        ),
        OrderId: Orders.OrderID,
        Shipped: Orders.ShippedDate,
        ShipName: Orders.ShipName,
        City: Orders.ShipCity,
        Country: Orders.ShipCountry,
      })
      .from(Orders)
      .leftJoin(orderDetail, eq(Orders.OrderID, orderDetail.OrderID))
      .where(
        and(
          gte(Orders.OrderID, Number(first) + (page - 1) * 20),
          lt(Orders.OrderID, Number(first) + page * 20)
        )
      )
      .groupBy(
        Orders.OrderID,
        Orders.ShippedDate,
        Orders.ShipName,
        Orders.ShipCity,
        Orders.ShipCountry
      )
      .orderBy(asc(Orders.OrderID));

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

  public getOrderById = async (id: number) => {
    const startTime = new Date();
    const orderQuery = this.db
      .select({
        CustomerId: Orders.CustomerID,
        ShipName: Orders.ShipName,
        TotalProductsDiscount:
          sql<number>`SUM(${orderDetail.UnitPrice} * ${orderDetail.Quantity} * ${orderDetail.Discount})`.as(
            "TotalProductsDiscount"
          ),
        TotalProductsPrice:
          sql<number>`SUM(${orderDetail.UnitPrice} * ${orderDetail.Quantity})`.as(
            "TotalProductsPrice"
          ),
        TotalProductsItems: sql<number>`SUM(${orderDetail.Quantity})`.as(
          "TotalProductsItems"
        ),
        TotalProducts: sql<number>`COUNT(${orderDetail.OrderID})`.as(
          "TotalProducts"
        ),
        CompanyShipper: shippers.companyName,
        Freight: Orders.Freight,
        OrderDate: Orders.OrderDate,
        RequiredDate: Orders.RequiredDate,
        ShippedDate: Orders.ShippedDate,
        ShipCity: Orders.ShipCity,
        ShipRegion: Orders.ShipRegion,
        PostalCode: Orders.ShipPostalCode,
        ShipCountry: Orders.ShipCountry,
      })
      .from(Orders)
      .leftJoin(orderDetail, eq(Orders.OrderID, orderDetail.OrderID))
      .leftJoin(shippers, eq(Orders.ShipVia, shippers.shipperID))
      .where(eq(orderDetail.OrderID, id))
      .groupBy(
        Orders.CustomerID,
        shippers.companyName,
        Orders.OrderID,
        Orders.ShipName,
        Orders.Freight,
        Orders.OrderDate,
        Orders.RequiredDate,
        Orders.ShippedDate,
        Orders.ShipCity,
        Orders.ShipRegion,
        Orders.ShipPostalCode,
        Orders.ShipCountry
      );

    const { sql: sqlString } = orderQuery.toSQL();

    const queryResponse = await orderQuery;

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

  public getOrderProductsById = async (id: number) => {
    const startTime = new Date();
    const orderQuery = this.db
      .select({
        ProductName: products.ProductName,
        ProductId: orderDetail.ProductID,
        Quantity: orderDetail.Quantity,
        OrderPrice: orderDetail.UnitPrice,
        TotalPrice:
          sql<number>`${orderDetail.UnitPrice} * ${orderDetail.Quantity}`.as(
            "TotalPrice"
          ),
        Discount: orderDetail.Discount,
      })
      .from(orderDetail)
      .leftJoin(products, eq(products.ProductID, orderDetail.ProductID))
      .where(eq(orderDetail.OrderID, id))
      .groupBy(
        orderDetail.ProductID,
        products.ProductName,
        orderDetail.Quantity,
        orderDetail.UnitPrice,
        orderDetail.Discount
      );

    const { sql: sqlString } = orderQuery.toSQL();

    const queryResponse = await orderQuery;

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

export const repository = new PgRepository(process.env.CONN_STRING as string);
