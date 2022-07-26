export interface IComplainSearch{
    CustomerCode?: string;
    BranchId?: number;
    AreaId?: number;
    BlockId?: number;
    CustomerId?: number;
    Employee_id?: number;
    StartDate?: string;
    EndDate?: string;
    PageNumber: number;
    PageSize: number;
}