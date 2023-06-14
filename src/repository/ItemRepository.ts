import { RepositoryBase } from "./RepositoryBase";
import {
  Supplier,
  shippers,
  customers,
  employees,
  orderDetail,
  orders,
  products,
  supplies,
} from "./../schemas/pgSchema";
import { sql } from "drizzle-orm/sql";
import { eq } from "drizzle-orm/expressions";
import { alias } from "drizzle-orm/pg-core";
import { CustomerItemQueryResponse, EmployeeItemQueryResponse, OrderItemQueryResponse, OrderProductsQueryResponse, ProductItemQueryResponse, sqlRecord } from "./../types/types";

export class ItemRepository extends RepositoryBase {
  public getCustomerById = async (id: string) : Promise<CustomerItemQueryResponse> => {
    const startTime = new Date();
    const customerQuery = this.db
      .select()
      .from(customers)
      .where(eq(customers.customerID, id));
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

  public getEmployeeById = async (id: number) : Promise<EmployeeItemQueryResponse> => {
    const startTime = new Date();
    const aliasEmployee = alias(employees, "aliasEmployee");
    const employeeQuery = this.db
      .select({
        ...employees,
        reportsName:
          sql<string>`CONCAT(${aliasEmployee.firstName}, ' ' , ${aliasEmployee.lastName})`.as(
            "reportsName"
          ),
      })
      .from(employees)
      .leftJoin(
        aliasEmployee,
        eq(employees.reportsTo, aliasEmployee.employeeID)
      )
      .where(eq(employees.employeeID, id));
    const { sql: sqlString } = employeeQuery.toSQL();

    const queryResponse = await employeeQuery;

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

  public getProductById = async (id: number) : Promise<ProductItemQueryResponse> => {
    const startTime = new Date();
    const productQuery = this.db
      .select({
        productName: products.productName,
        supplierId: products.supplierID,
        supplier: supplies.companyName,
        qtyPerUnit: products.quantityPerUnit,
        unitPrice: products.unitPrice,
        unitsInStock: products.unitsInStock,
        unitsInOrder: products.unitsOnOrder,
        reorderLevel: products.reorderLevel,
        discontinued: products.discontinued,
      })
      .from(products)
      .leftJoin(supplies, eq(products.supplierID, supplies.supplierID))
      .where(eq(products.productID, id));
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

  public getSupplierById = async (id: number) : Promise<{data: Supplier[], sqlQueries: sqlRecord[]}> => {
    const startTime = new Date();
    const suppliesQuery = this.db
      .select()
      .from(supplies)
      .where(eq(supplies.supplierID, id));
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
  public getOrderById = async (id: number) : Promise<OrderItemQueryResponse> => {
    const startTime = new Date();
    const orderQuery = this.db
      .select({
        CustomerId: orders.customerID,
        ShipName: orders.shipName,
        TotalProductsDiscount:
          sql<number>`SUM(${orderDetail.unitPrice} * ${orderDetail.quantity} * ${orderDetail.discount})`.as(
            "TotalProductsDiscount"
          ),
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
        CompanyShipper: shippers.companyName,
        Freight: orders.freight,
        OrderDate: orders.orderDate,
        RequiredDate: orders.requiredDate,
        ShippedDate: orders.shippedDate,
        ShipCity: orders.shipCity,
        ShipRegion: orders.shipRegion,
        PostalCode: orders.shipPostalCode,
        ShipCountry: orders.shipCountry,
      })
      .from(orders)
      .leftJoin(orderDetail, eq(orders.orderID, orderDetail.orderID))
      .leftJoin(shippers, eq(orders.shipVia, shippers.shipperID))
      .where(eq(orderDetail.orderID, id))
      .groupBy(
        orders.customerID,
        shippers.companyName,
        orders.orderID,
        orders.shipName,
        orders.freight,
        orders.orderDate,
        orders.requiredDate,
        orders.shippedDate,
        orders.shipCity,
        orders.shipRegion,
        orders.shipPostalCode,
        orders.shipCountry
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

  public getOrderProductsById = async (id: number) : Promise<OrderProductsQueryResponse> => {
    const startTime = new Date();
    const orderQuery = this.db
      .select({
        ProductName: products.productName,
        ProductId: orderDetail.productID,
        Quantity: orderDetail.quantity,
        OrderPrice: orderDetail.unitPrice,
        TotalPrice:
          sql<number>`${orderDetail.unitPrice} * ${orderDetail.quantity}`.as(
            "TotalPrice"
          ),
        Discount: orderDetail.discount,
      })
      .from(orderDetail)
      .leftJoin(products, eq(products.productID, orderDetail.productID))
      .where(eq(orderDetail.orderID, id))
      .groupBy(
        orderDetail.productID,
        products.productName,
        orderDetail.quantity,
        orderDetail.unitPrice,
        orderDetail.discount
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
