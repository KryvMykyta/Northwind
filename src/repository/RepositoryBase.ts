import { tables } from "./../types/types";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  customers,
  employees,
  orders,
  products,
  supplies,
} from "../schemas/pgSchema";
import { sql } from "drizzle-orm/sql";

export class RepositoryBase {
  db: NodePgDatabase;

  constructor(poolConnection: Pool) {
    const db = drizzle(poolConnection);
    this.db = db;
  }

  public getCount = async (table: tables) => {
    const startTime = new Date();
    let queryRequest;
    switch (table) {
      case "customers":
        queryRequest = this.db
          .select({
            count: sql<number>`COUNT (*)`.as("count"),
          })
          .from(customers);
        break;
      case "employees":
        queryRequest = this.db
          .select({
            count: sql<number>`COUNT (*)`.as("count"),
          })
          .from(employees);
        break;
      case "orders":
        queryRequest = this.db
          .select({
            count: sql<number>`COUNT (*)`.as("count"),
          })
          .from(orders);
        break;
      case "products":
        queryRequest = this.db
          .select({
            count: sql<number>`COUNT (*)`.as("count"),
          })
          .from(products);
        break;
      case "suppliers":
        queryRequest = this.db
          .select({
            count: sql<number>`COUNT (*)`.as("count"),
          })
          .from(supplies);
        break;
    }
    const { sql: sqlString } = queryRequest.toSQL();
    const queryResponse = await queryRequest;
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
}
