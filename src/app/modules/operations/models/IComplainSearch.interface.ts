export interface IComplainSearch{
    CustomerCode?: string;
    BranchId?: number;
    AreaId?: number;
    BlockId?: number;
    CustomerId?: number;
    EmployeeId?: number;
    IsRevised?:boolean;
    IsPublic?:boolean;
    StartDate?: string;
    EndDate?: string;
    PageNumber: number;
    PageSize: number;
}