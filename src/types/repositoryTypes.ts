import { Employee } from "./../schemas/pgSchema";

export type EmployeeRepositoryResponse = Employee & { reportsName: string };

export type ProductRepositoryResponse = {
    productName: string;
    supplierId: number;
    supplier: string | null;
    qtyPerUnit: string;
    unitPrice: number;
    unitsInStock: number;
    unitsInOrder: number;
    reorderLevel: number;
    discontinued: number;
}
