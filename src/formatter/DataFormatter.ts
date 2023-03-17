import {
  CustomerInfo,
  CustomerInfoAvatar,
  EmployeeInfo,
  EmployeeInfoAvatar,
  OrderInfo,
  OrderPage,
  OrderPageInfo,
  OrderProductsInfo,
  SupplierInfo,
  SupplierInfoAvatar,
  sqlRecord,
  tables,
} from "./../types/types";
import { repository } from "./../repository/pgRepository";
export class DataFormatter {
  public addTotalPages = async (
    sqlQueries: sqlRecord[],
    page: number,
    table: tables,
    count?: string
  ) => {
    if (count && count === "true") {
      let totalPagesData;
      switch (table) {
        case "customers":
          totalPagesData = await repository.getCount("customers");
          break;
        case "employees":
          totalPagesData = await repository.getCount("employees");
          break;
        case "orders":
          totalPagesData = await repository.getCount("orders");
          break;
        case "products":
          totalPagesData = await repository.getCount("products");
          break;
        case "suppliers":
          totalPagesData = await repository.getCount("suppliers");
          break;
      }
      return {
        totalPages: Math.ceil(totalPagesData.data[0].count / 20),
        currentPage: page,
        sqlQueries: [...sqlQueries, ...totalPagesData.sqlQueries],
      };
    }
    return {
      totalPages: 0,
      currentPage: page,
      sqlQueries,
    };
  };

  public addAvatarCustomer = (customerInfoList: CustomerInfo[]) => {
    const newCustomerList: CustomerInfoAvatar[] = [];
    customerInfoList.map((customerInfo) => {
      const name = customerInfo.name.split(" ");
      const avatarLink = `https://avatars.dicebear.com/v2/initials/${name[0]}-${
        name[name.length - 1]
      }.svg`;
      const newCustomerInfo = Object.assign(customerInfo, { avatarLink });
      newCustomerList.push(newCustomerInfo);
    });
    return newCustomerList;
  };

  public addAvatarSupplier = (supplierInfoList: SupplierInfo[]) => {
    const newCustomerList: SupplierInfoAvatar[] = [];
    supplierInfoList.map((supplierInfo) => {
      const name = supplierInfo.name.split(" ");
      const avatarLink = `https://avatars.dicebear.com/v2/initials/${name[0]}-${
        name[name.length - 1]
      }.svg`;
      const newCustomerInfo = Object.assign(supplierInfo, { avatarLink });
      newCustomerList.push(newCustomerInfo);
    });
    return newCustomerList;
  };

  public addAvatarEmployee = (employeeInfoList: EmployeeInfo[]) => {
    const newCustomerList: EmployeeInfoAvatar[] = [];
    employeeInfoList.map((employeeInfo) => {
      const name = employeeInfo.name.split(" ");
      const avatarLink = `https://avatars.dicebear.com/v2/initials/${name[0]}-${
        name[name.length - 1]
      }.svg`;
      const newCustomerInfo = Object.assign(employeeInfo, { avatarLink });
      newCustomerList.push(newCustomerInfo);
    });
    return newCustomerList;
  };

  public formatOrderResponse = (
    orderInfo: OrderInfo,
    productsInfo: OrderProductsInfo
  ): OrderPageInfo => {
    const responseData = {
      orderInfo: orderInfo.data,
      productsInfo: productsInfo.data,
      sqlQueries: [
        {
          sql: orderInfo.sqlQueries[0].sql,
          sqlType: orderInfo.sqlQueries[0].sqlType,
          resultsCount: orderInfo.sqlQueries[0].resultsCount,
          timeStart: orderInfo.sqlQueries[0].timeStart,
          timeTaken: orderInfo.sqlQueries[0].timeTaken,
        },
        {
          sql: productsInfo.sqlQueries[0].sql,
          sqlType: productsInfo.sqlQueries[0].sqlType,
          resultsCount: productsInfo.sqlQueries[0].resultsCount,
          timeStart: productsInfo.sqlQueries[0].timeStart,
          timeTaken: productsInfo.sqlQueries[0].timeTaken,
        },
      ],
    };
    return responseData;
  };

  public formatOrdersPageResponse = (
    ordersPage: OrderPage,
    sqlRecord: sqlRecord
  ) => {
    const responseData = {
      data: ordersPage.data,
      sqlQueries: [...ordersPage.sqlQueries, sqlRecord],
    };
    return responseData;
  };
}
