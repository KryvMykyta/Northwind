import { Customer, Employee, Supplier } from "schemas/pgSchema";

export type ProductItem = {
  productName: string;
  supplierId: number;
  supplier: string | null;
  qtyPerUnit: string;
  unitPrice: number;
  unitsInStock: number;
  unitsInOrder: number;
  reorderLevel: number;
  discontinued: number;
};

export type CustomerPageItem = {
  id: string;
  company: string;
  name: string;
  title: string;
  city: string | null;
  country: string | null;
};

export type CustomerPageQueryResponse = {
  data: CustomerPageItem[];
  sqlQueries: sqlRecord[];
};

export type CustomerPageItemAvatar = CustomerPageItem & { avatarLink: string };

export type SupplierPageItem = {
  id: number;
  companyName: string;
  name: string;
  title: string;
  city: string;
  country: string;
};

export type SupplierPageQueryResponse = {
  data: SupplierPageItem[];
  sqlQueries: sqlRecord[];
};

export type SupplierPageItemAvatar = SupplierPageItem & { avatarLink: string };

export type EmployeePageItem = {
  id: number;
  name: string;
  phone: string;
  title: string;
  city: string;
  country: string;
};

export type EmployeePageQueryResponse = {
  data: EmployeePageItem[];
  sqlQueries: sqlRecord[];
};

export type EmployeePageItemAvatar = EmployeePageItem & { avatarLink: string };

export type OrderItem = {
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
};

export type OrderInfoQuery = {
  data: OrderItem[];
  sqlQueries: sqlRecord[];
};

export type OrderItemProducts = {
  ProductName: string | null;
  ProductId: number;
  Quantity: number;
  OrderPrice: number;
  TotalPrice: number;
  Discount: number;
};

export type OrderProductsQuery = {
  data: OrderItemProducts[];
  sqlQueries: sqlRecord[];
};

export type OrderItemResponse = {
  productsInfo: OrderItemProducts[];
  orderInfo: OrderItem[];
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
};

export type ProductPageItem = {
  id: number;
  name: string;
  qt: string;
  price: number;
  stock: number;
  orders: number;
};

export type ProductPageQueryResponse = {
  data: ProductPageItem[];
  sqlQueries: sqlRecord[];
};

export type OrderPageQueryResponse = {
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

export type SearchCustomerItem = {
  id: string;
  name: string;
  contact: string;
  title: string;
  phone: string | null;
};

export type SearchProductItem = {
  id: number;
  name: string;
  quantPerUnit: string;
  price: number;
  stock: number;
};

export type CustomerItemQueryResponse = {
  data: Customer[];
  sqlQueries: sqlRecord[];
};

export type EmployeeItemQueryResponse = {
  data: EmployeeItem[];
  sqlQueries: sqlRecord[];
};

export type ProductItemQueryResponse = {
  data: ProductItem[];
  sqlQueries: sqlRecord[];
};

export type SupplierItemQueryResponse = {
  data: Supplier[];
  sqlQueries: sqlRecord[];
};

export type OrderItemQueryResponse = {
  data: OrderItem[];
  sqlQueries: sqlRecord[];
};

export type OrderProductsQueryResponse = {
  data: OrderItemProducts[];
  sqlQueries: sqlRecord[];
};

export type SearchProductQueryResponse = {
  data: SearchProductItem[];
  sqlQueries: sqlRecord[];
};

export type SearchCustomerQueryResponse = {
  data: SearchCustomerItem[];
  sqlQueries: sqlRecord[];
};

export type EmployeeItem = Employee & { reportsName: string };

export type tables =
  | "employees"
  | "customers"
  | "suppliers"
  | "products"
  | "orders";
