export interface ICompany {

	id: number,
	code: string,
	companyName: string,
	activity: string,
	address: string,
	phoneNumber: string,
	logoPrint: string,
	logoWeb: string,
	commercialRecord: string
	taxCardNo: string,
	taxFileNo: string,
	vatTaxNum: string
	vatTax: number,
	isValTaxActive: boolean,
	hasDirectTransferForStocks: boolean,
	wTax: number,
	isWTaxActive: boolean,
	email: string,
	isActive: boolean,
	mobileUsersCount: number,
	state_Id :number
	region_Id: number,
	managerName: string,
	managerPosition: string,
	employee_Id:number

}