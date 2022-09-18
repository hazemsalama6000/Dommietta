
export interface ICustomerEditManageSearch
{
	CustomerCode :string,
	BranchId :number, 
	AreaId :number,
	BlockId:number,
	CustomerId:number,
	EmployeeId:number,
	StartDate?:string,
	EndDate?:string,
    UpdatingTypeId?:number,
	PageNumber?:number,
	PageSize?:number
}