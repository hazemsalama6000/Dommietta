export enum HttpPaths {
	API_LOGIN_URL = "/api/v1/Auth/token",
	API_COMPANYCONFIG_URL = "/api/v1/Auth/CompanyConfiguration?code=",

	// Jobs APIS
	API_JOB_ADD = "/api/v1/hr/addjob",
	API_JOB_UPDATE = "/api/v1/hr/updatejob/",
	API_JOB_GETALL = "/api/v1/hr/getjobs",
	API_JOB_DELETE = "/api/v1/hr/deletejob/",

	//State APIS

	API_STATE_ADD = "/api/v1/shared/addstate",
	API_STATE_UPDATE = "/api/v1/shared/updatestate/",
	API_STATE_GETALL = "/api/v1/shared/getstates",
	API_STATE_DELETE = "/api/v1/shared/deletestate/",


	//Region APIS

	API_REGION_ADD = "/api/v1/shared/addregion",
	API_REGION_UPDATE = "/api/v1/shared/updateregion/",
	API_REGION_GETALL = "/api/v1/shared/getregions/",
	API_REGION_DELETE = "/api/v1/shared/deleteregion/",


	//Department APIS

	API_DEPARTMENT_ADD = "/api/v1/hr/adddepartment",
	API_DEPARTMENT_UPDATE = "/api/v1/hr/updatedepartment/",
	API_DEPARTMENT_GETALL = "/api/v1/hr/getdepartments",
	API_DEPARTMENT_DELETE = "/api/v1/hr/deletedepartment/",

	//Section APIS

	API_SECTION_ADD = "/api/v1/hr/addSection",
	API_SECTION_UPDATE = "/api/v1/hr/updateSection/",
	API_SECTION_GETALL = "/api/v1/hr/getSections/",
	API_SECTION_DELETE = "/api/v1/hr/deleteSection/",


	//Company APIS

	API_COMPANY_ADD = "/api/v1/shared/addCompany",
	API_COMPANY_UPDATE = "/api/v1/shared/updateCompany/",
	API_COMPANY_GETALL = "/api/v1/shared/getCompanies",
	API_COMPANY_DELETE = "/api/v1/shared/deleteSection/",
	API_COMPANY_GETBYID = "/api/v1/shared/getcompanyprofile/",

	API_COMPANY_CHANGELOGOWEB = "/api/v1/shared/ChangeLogoWeb",
	API_COMPANY_CHANGELOGOPRINT = "/api/v1/shared/ChangeLogoPrint",


	//Employee APIS

	API_GET_EMPLOYEELOOKUP = "/api/v1/hr/getemployees/",

}