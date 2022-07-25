import { Injectable } from "@angular/core";
import { BehaviorSubject, of, Subject } from "rxjs";
import { ICustomerEditManageSearch } from "../models/cutomer-editmanage/ICustomerEditManageSearch.interface";
import { ICustomerEditResponse } from "../models/cutomer-editmanage/ICustomerEditResponse.interface";



@Injectable()

export class customerUpdateManageService {

	searchUpdateUserManageAction:Subject<ICustomerEditResponse[]> = new Subject<ICustomerEditResponse[]>();

	searchUpdateUserManageStream$ = this.searchUpdateUserManageAction.asObservable();

	constructor(){

	}
	
   searchCustomerUpdate(model:ICustomerEditManageSearch){
   return of([
	{areaName:'area1',blockName:'block1',branchName:'branch1',collectorName:'collector1',customerActivity:'activity1',customerCode:'0154',customerName:'customer1',imagePath:'https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q=',numOfUnits:2,updatedTypeName:'موقع',updatedTypeSysName:'location',x:30.245,y:30.54,requestDate:new Date()} as ICustomerEditResponse,
	{areaName:'area1',blockName:'block1',branchName:'branch1',collectorName:'collector1',customerActivity:'activity1',customerCode:'0154',customerName:'customer1',imagePath:'https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q=',numOfUnits:2,updatedTypeName:'صورة',updatedTypeSysName:'customerimage',x:30.245,y:30.54,requestDate:new Date()} as ICustomerEditResponse,
	{areaName:'area1',blockName:'block1',branchName:'branch1',collectorName:'collector1',customerActivity:'activity1',customerCode:'0154',customerName:'customer1',imagePath:'https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q=',numOfUnits:2,updatedTypeName:'الوحدات',updatedTypeSysName:'unitsnumber',x:30.245,y:30.54,requestDate:new Date()} as ICustomerEditResponse,
	{areaName:'area1',blockName:'block1',branchName:'branch1',collectorName:'collector1',customerActivity:'activity1',customerCode:'0154',customerName:'customer1',imagePath:'https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q=',numOfUnits:2,updatedTypeName:'نشاط',updatedTypeSysName:'activity',x:30.245,y:30.54,requestDate:new Date()} as ICustomerEditResponse,
])
   }


}