import { text, real, pgTable, InferModel } from "drizzle-orm/pg-core";

export const orderDetail = pgTable("OrderDetails", {
  orderID: real("OrderID").notNull(),
  productID: real("ProductID").notNull(),
  quantity: real("Quantity").notNull(),
  unitPrice: real("UnitPrice").notNull(),
  discount: real("Discount").notNull(),
});

export type OrderDetail = InferModel<typeof orderDetail>;

export const orders = pgTable("Orders", {
  orderID: real("OrderID").notNull(),
  customerID: text("CustomerID").notNull(),
  employeeID: real("EmployeeID").notNull(),
  orderDate: text("OrderDate").notNull(),
  requiredDate: text("RequiredDate").notNull(),
  shippedDate: text("ShippedDate"),
  shipVia: real("ShipVia").notNull(),
  freight: real("Freight").notNull(),
  shipName: text("ShipName").notNull(),
  shipAddress: text("ShipAddress").notNull(),
  shipCity: text("ShipCity").notNull(),
  shipRegion: text("ShipRegion"),
  shipPostalCode: text("ShipPostalCode"),
  shipCountry: text("ShipCountry").notNull(),
});

export type Order = InferModel<typeof orders>;

export const categories = pgTable("categories", {
  categoryID: real("CategoryID").notNull(),
  categoryName: text("CategoryName").notNull(),
  description: text("Description").notNull(),
});

export type Category = InferModel<typeof categories>;

export const employees = pgTable("Employees", {
  employeeID: real("EmployeeID").notNull(),
  lastName: text("LastName").notNull(),
  firstName: text("FirstName").notNull(),
  title: text("Title").notNull(),
  titleOfCourtesy: text("TitleOfCourtesy").notNull(),
  birthDate: text("BirthDate").notNull(),
  hireDate: text("HireDate").notNull(),
  address: text("Address").notNull(),
  city: text("City").notNull(),
  region: text("Region").notNull(),
  postalCode: text("PostalCode"),
  country: text("Country").notNull(),
  homePhone: text("HomePhone").notNull(),
  extension: real("Extension").notNull(),
  notes: text("Notes").notNull(),
  reportsTo: text("ReportsTo"),
});

export type Employee = InferModel<typeof employees>;

export const customers = pgTable("Customers", {
  customerID: text("CustomerID").notNull(),
  companyName: text("CompanyName").notNull(),
  contactName: text("ContactName").notNull(),
  contactTitle: text("ContactTitle").notNull(),
  address: text("Address"),
  city: text("City"),
  region: text("Region"),
  postalCode: text("PostalCode"),
  country: text("Country"),
  phone: text("Phone"),
  fax: text("Fax"),
});

export type Customer = InferModel<typeof customers>;

export const employeeTerritories = pgTable("EmployeeTerritories", {
  employeeID: real("EmployeeID").notNull(),
  territoryID: text("TerritoryID").notNull(),
});

export type EmployeeTerritory = InferModel<typeof employeeTerritories>;

export const products = pgTable("Products", {
  productID: real("ProductID").notNull(),
  productName: text("ProductName").notNull(),
  supplierID: real("SupplierID").notNull(),
  categoryID: real("CategoryID").notNull(),
  quantityPerUnit: text("QuantityPerUnit").notNull(),
  unitPrice: real("UnitPrice").notNull(),
  unitsInStock: real("UnitsInStock").notNull(),
  unitsOnOrder: real("UnitsOnOrder").notNull(),
  reorderLevel: real("ReorderLevel").notNull(),
  discontinued: real("Discontinued").notNull(),
});

export type Product = InferModel<typeof products>;

export const regions = pgTable("Regions", {
  regionID: real("regionID").notNull(),
  regionDescription: text("regionDescription").notNull(),
});

export type Region = InferModel<typeof regions>;

export const shippers = pgTable("Shippers", {
  shipperID: real("ShipperID").notNull(),
  companyName: text("CompanyName").notNull(),
  phone: text("Phone").notNull(),
});

export type Shipper = InferModel<typeof shippers>;

export const supplies = pgTable("Supplies", {
  supplierID: real("SupplierID").notNull(),
  companyName: text("CompanyName").notNull(),
  contactName: text("ContactName").notNull(),
  contactTitle: text("ContactTitle").notNull(),
  address: text("Address").notNull(),
  city: text("City").notNull(),
  region: text("Region"),
  postalCode: text("PostalCode").notNull(),
  country: text("Country").notNull(),
  phone: text("Phone").notNull(),
  fax: text("Fax"),
  homePage: text("HomePage"),
});

export type Supplier = InferModel<typeof supplies>;

export const territories = pgTable("Territories", {
  territoryID: text("TerritoryID").notNull(),
  territoryDescription: text("TerritoryDescription").notNull(),
  regionID: real("RegionID").notNull(),
});

export type Territory = InferModel<typeof territories>;
