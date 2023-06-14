import { RepositoryBase } from "./../repository/RepositoryBase";
import {
  CustomerPageItem,
  CustomerPageItemAvatar,
  EmployeePageItem,
  EmployeePageItemAvatar,
  OrderInfoQuery,
  OrderPageQueryResponse,
  OrderItemResponse,
  OrderProductsQuery,
  SupplierPageItem,
  SupplierPageItemAvatar,
  sqlRecord,
  tables,
} from "./../types/types";

export class DataFormatter {
  repository: RepositoryBase;
  constructor(db: RepositoryBase) {
    this.repository = db;
  }
  public addTotalPages = async (
    sqlQueries: sqlRecord[],
    page: number,
    table: tables,
    count?: string
  ) => {
    if (count && count === "true") {
      const totalPagesData = await this.repository.getCount(table);
      return {
        totalPages: Math.ceil(totalPagesData.data[0].count / 20),
        currentPage: page,
        sqlQueries: [...totalPagesData.sqlQueries, ...sqlQueries],
      };
    }
    return {
      totalPages: 0,
      currentPage: page,
      sqlQueries,
    };
  };

  private addAvatarLink = (name: string) => {
    const nameSplit = name.split(" ");
    const avatarLink = `https://avatars.dicebear.com/v2/initials/${nameSplit[0]}-${
      nameSplit[nameSplit.length - 1]
    }.svg`;
    return avatarLink;
  }

  public addAvatarCustomer = (customerInfoList: CustomerPageItem[]) => {
    const newCustomerList: CustomerPageItemAvatar[] = [];
    customerInfoList.map((customerInfo) => {
      const avatarLink = this.addAvatarLink(customerInfo.name);
      newCustomerList.push(Object.assign(customerInfo, { avatarLink }));
    });
    return newCustomerList;
  };

  public addAvatarSupplier = (supplierInfoList: SupplierPageItem[]) => {
    const newCustomerList: SupplierPageItemAvatar[] = [];
    supplierInfoList.map((supplierInfo) => {
      const avatarLink = this.addAvatarLink(supplierInfo.name);
      newCustomerList.push(Object.assign(supplierInfo, { avatarLink }));
    });
    return newCustomerList;
  };

  public addAvatarEmployee = (employeeInfoList: EmployeePageItem[]) => {
    const newCustomerList: EmployeePageItemAvatar[] = [];
    employeeInfoList.map((employeeInfo) => {
      const avatarLink = this.addAvatarLink(employeeInfo.name);
      newCustomerList.push(Object.assign(employeeInfo, { avatarLink }));
    });
    return newCustomerList;
  };

  public formatOrderResponse = (
    orderInfo: OrderInfoQuery,
    productsInfo: OrderProductsQuery
  ): OrderItemResponse => {
    const responseData = {
      orderInfo: orderInfo.data,
      productsInfo: productsInfo.data,
      sqlQueries: [...productsInfo.sqlQueries, ...orderInfo.sqlQueries],
    };
    return responseData;
  };

  public groupOrderPageResponse = (
    ordersPage: OrderPageQueryResponse,
    sqlRecord: sqlRecord
  ): OrderPageQueryResponse => {
    const responseData = {
      data: ordersPage.data,
      sqlQueries: [sqlRecord, ...ordersPage.sqlQueries],
    };
    return responseData;
  };
}
