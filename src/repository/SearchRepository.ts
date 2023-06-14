import { RepositoryBase } from "./RepositoryBase";
import { customers, products } from "../schemas/pgSchema";
import { ilike } from "drizzle-orm/expressions";
import { SearchCustomerQueryResponse, SearchProductQueryResponse } from "./../types/types";

export class SearchRepository extends RepositoryBase {
  public searchCustomers = async (keyword: string) : Promise<SearchCustomerQueryResponse> => {
    const startTime = new Date();
    const foundCustomers = this.db
      .select({
        id: customers.customerID,
        name: customers.companyName,
        contact: customers.contactName,
        title: customers.contactTitle,
        phone: customers.phone,
      })
      .from(customers)
      .where(ilike(customers.companyName, `%${keyword}%`));

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

  public searchProducts = async (keyword: string) : Promise<SearchProductQueryResponse> => {
    const startTime = new Date();
    const foundProducts = this.db
      .select({
        id: products.productID,
        name: products.productName,
        quantPerUnit: products.quantityPerUnit,
        price: products.unitPrice,
        stock: products.unitsInStock,
      })
      .from(products)
      .where(ilike(products.productName, `%${keyword}%`));

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
}
