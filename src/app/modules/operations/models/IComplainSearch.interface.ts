export interface IComplainSearch{
    customerCode?: string;
    branchId?: number;
    areaId?: number;
    blockId?: number[];
    customerId?: number;
    employee_id?: number;
    readingStartDate?: Date;
    readingEndDate?: Date;
    pageNumber: number;
    pageSize: number;
}