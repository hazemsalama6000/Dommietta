
export interface ICustomerEditResponse {
	Id: number,
	BranchName: string,
	AreaName: string,
	BlockName: string,
	CustomerName: string,
	CustomerCode: string,
	CollectorName: string,
	RequestDate: Date,
	UpdatedTypeName: string,
	UpdatedTypeSysName: 'location' | 'activity' | 'unitsnumber' | 'customerimage'//location => 1, activity =>2, unitsnumber => 3, customerimage => 4
	CustomerActivity: string,
	NumOfUnits: number,
	ImagePath: string,
	X: number,
	Y: number,
}