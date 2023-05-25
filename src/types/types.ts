export type CustomerInfo = {
  id: string;
  company: string;
  name: string;
  title: string;
  city: string | null;
  country: string | null;
};

export type CustomerInfoAvatar = CustomerInfo & {avatarLink: string}

export type SupplierInfo = {
  id: number;
  companyName: string;
  name: string;
  title: string;
  city: string;
  country: string;
};

export type SupplierInfoAvatar = SupplierInfo & {avatarLink: string}

export type EmployeeInfo = {
  id: number;
  name: string;
  phone: string;
  title: string;
  city: string;
  country: string;
};

export type EmployeeInfoAvatar = EmployeeInfo & {avatarLink: string}

export type OrderInfo = {
  CustomerId: string;
  ShipName: string;
  TotalProductsDiscount: number;
  TotalProductsPrice: number;
  TotalProductsItems: number;
  TotalProducts: number;
  CompanyShipper: string | null;
  Freight: number;
  OrderDate: string;
  RequiredDate: string;
  ShippedDate: string | null;
  ShipCity: string;
  ShipRegion: string | null;
  PostalCode: string | null;
  ShipCountry: string;
}

export type OrderInfoQuery = {
  data: OrderInfo[];
  sqlQueries: sqlRecord[];
};

export type OrderProducts = {
  ProductName: string | null;
  ProductId: number;
  Quantity: number;
  OrderPrice: number;
  TotalPrice: number;
  Discount: number;
}

export type OrderProductsQuery = {
  data: OrderProducts[];
  sqlQueries: sqlRecord[];
};

export type OrderItemResponse = {
  productsInfo: OrderProducts[];
  orderInfo: OrderInfo[];
  sqlQueries: sqlRecord[];
};

export type OrderPageItem = {
  TotalProductsPrice: number;
  TotalProductsItems: number;
  TotalProducts: number;
  OrderId: number;
  Shipped: string | null;
  ShipName: string;
  City: string;
  Country: string;
}

export type OrderPageResponse = {
  data: OrderPageItem[];
  sqlQueries: sqlRecord[];
};

export type sqlRecord = {
  sql: string;
  sqlType: string;
  resultsCount: number;
  timeStart: string;
  timeTaken: number;
};

export type tables = "employees" | "customers" | "suppliers" | "products" | "orders" 
