import { shippers } from './../schemas/pgSchema';
import { drizzle } from "drizzle-orm/node-postgres";
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

export class PgRepository {
  CONN_STRING: string;

  constructor(connectionString: string) {
    this.CONN_STRING = connectionString;
  }

  private init = async () => {
    const poolConnection = new Pool({
      connectionString: this.CONN_STRING,
    });
    const db = drizzle(poolConnection);
    return db;
  };

  public getCustomerById = async (id: string) => {
    const startTime = new Date()
    const db = await this.init();
    const customerQuery = db
      .select()
      .from(customers)
      .where(eq(customers.CustomerID, id));
    const { sql } = customerQuery.toSQL();

    const queryResponse = await customerQuery;

    const endTime = new Date()

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        }
      ]
    };
  };

  public getEmployeeById = async (id: number) => {
    const startTime = new Date()
    const db = await this.init();
    const employeeQuery = db
      .select()
      .from(employees)
      .where(eq(employees.EmployeeID, id));
    const { sql } = employeeQuery.toSQL();

    const queryResponse = await employeeQuery;

    const endTime = new Date()

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        }
      ]
    };

  };

  public getProductById = async (id: number) => {
    const startTime = new Date()
    const db = await this.init();
    const productQuery = db
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

    const endTime = new Date()

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where left join",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        }
      ]
    };
  };

  public getSupplierById = async (id: number) => {
    const startTime = new Date()
    const db = await this.init();
    const suppliesQuery = db
      .select()
      .from(supplies)
      .where(eq(supplies.SupplierID, id));
    const { sql } = suppliesQuery.toSQL();

    const queryResponse = await suppliesQuery;

    const endTime = new Date()

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        }
      ]
    };

  };

  public searchCustomers = async (keyword: string) => {
    const startTime = new Date()
    const db = await this.init();
    const foundCustomers = db
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

    const endTime = new Date()

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        }
      ]
    };
  };

  public searchProducts = async (keyword: string) => {
    const startTime = new Date()
    const db = await this.init();
    const foundProducts = db
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
    const endTime = new Date()

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        }
      ]
    };

  };

  public customersPage = async (page: number) => {
    const startTime = new Date()
    const db = await this.init();
    const customersQuery = db
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

    const endTime = new Date()

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        }
      ]
    };

  };

  public productsPage = async (page: number) => {

    const startTime = new Date()
    const db = await this.init();
    const productsQuery = db
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

    const endTime = new Date()

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        }
      ]
    };

  };

  public suppliersPage = async (page: number) => {

    const startTime = new Date()
    const db = await this.init();
    const suppliesQuery = db
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

    const endTime = new Date()

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        }
      ]
    };

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where"
        }
      ]
    };
  };

  public employeesPage = async (page: number) => {
    const startTime = new Date()
    const db = await this.init();
    const employeesQuery = db
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

    const endTime = new Date()

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        }
      ]
    };

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select where"
        }
      ]
    };
  };

  public getFirstOrderId = async () => {
    const startTime = new Date()
    const db = await this.init();
    const totalQuery = db
      .select({ first: Orders.OrderID })
      .from(Orders)
      .limit(1)
      .orderBy(asc(Orders.OrderID));

    const { sql: sqlString } = totalQuery.toSQL();

    const queryResponse = await totalQuery;
    const endTime = new Date()
    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        }
      ]
    };

  };

  public ordersPage = async (first: number, page: number) => {
    const startTime = new Date()
    const db = await this.init();
    const ordersQuery = db
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
      ).groupBy(Orders.OrderID, Orders.ShippedDate, Orders.ShipName, Orders.ShipCity, Orders.ShipCountry)
      .orderBy(asc(Orders.OrderID));

    const { sql: sqlString } = ordersQuery.toSQL();

    const queryResponse = await ordersQuery;
    const endTime = new Date()

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select where left join",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        }
      ]
    };
  };

  public getOrderById = async (id: number) => {
    const startTime = new Date()
    const db = await this.init();
    const orderQuery = db
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
        ShipCountry: Orders.ShipCountry
      })
      .from(Orders)
      .leftJoin(orderDetail, eq(Orders.OrderID, orderDetail.OrderID))
      .leftJoin(shippers, eq(Orders.ShipVia, shippers.shipperID))
      .where(eq(orderDetail.OrderID, id))
      .groupBy(Orders.CustomerID,
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
        Orders.ShipCountry);

      const { sql: sqlString } = orderQuery.toSQL();

      const queryResponse = await orderQuery;

      const endTime = new Date()

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select where left join",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        }
      ]
    };
  
  };

  public getOrderProductsById = async (id: number) => {
    const startTime = new Date()
    const db = await this.init();
    const orderQuery = db
      .select({
        ProductName: products.ProductName,
        ProductId: orderDetail.ProductID,
        Quantity: orderDetail.Quantity,
        OrderPrice: orderDetail.UnitPrice,
        TotalPrice:
          sql<number>`${orderDetail.UnitPrice} * ${orderDetail.Quantity}`.as(
            "TotalPrice"
          ), 
        Discount: orderDetail.Discount
      })
      .from(orderDetail)
      .leftJoin(products, eq(products.ProductID, orderDetail.ProductID))
      .where(eq(orderDetail.OrderID, id))
      .groupBy(orderDetail.ProductID,products.ProductName, orderDetail.Quantity, orderDetail.UnitPrice, orderDetail.Discount);

      const { sql: sqlString } = orderQuery.toSQL();

      const queryResponse = await orderQuery;

      const endTime = new Date()

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select where left join",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        }
      ]
    };
  
  }
}
