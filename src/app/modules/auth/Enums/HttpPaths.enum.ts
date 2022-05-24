export enum HttpPaths
{
	API_LOGIN_URL = "/api/v1/Auth/token",
	API_COMPANYCONFIG_URL = "/api/v1/Auth/CompanyConfiguration?code=",

	// Jobs APIS
	API_JOB_ADD="/api/v1/hr/addjob",
	API_JOB_UPDATE="/api/v1/hr/updatejob/",
	API_JOB_GETALL="/api/v1/hr/getjobs",
	API_JOB_DELETE="/api/v1/hr/deletejob/",
   
	//State APIS

	API_STATE_ADD="/api/v1/shared/addstate",
	API_STATE_UPDATE="/api/v1/shared/updatestate/",
	API_STATE_GETALL="/api/v1/shared/getstates",
	API_STATE_DELETE="/api/v1/shared/deletestate/",
   

}