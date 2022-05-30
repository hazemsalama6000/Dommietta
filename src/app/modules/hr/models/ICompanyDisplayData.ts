export interface ICompanyDisplayData {
	
    id: number,
    code?: string,
    companyName: string,
    activity?: string,
    address: string,
    phoneNumber?: number,
    logoWeb?: string,
    hasDirectTransferForStocks?:boolean,
    email?: string,
    isActive?: boolean,
    mobileUserNumber?: number,
    state?: string,
    region?: string,
    managerName?: string,
    managerPosition?: string,
    roleName?: string

}