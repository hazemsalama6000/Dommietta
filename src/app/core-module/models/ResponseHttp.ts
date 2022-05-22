

export interface HttpReponseModel {
	IdOfAddedObject: number,
	ErrorsCount: number
	Message: string
	IsSuccess: boolean
	IsUpdated: boolean
	IsExists: boolean
	IsNotFound: boolean
	IsNotificationSuccess: boolean
	TotalPages: number
	Data: any
	Errors: Array<any>;
}