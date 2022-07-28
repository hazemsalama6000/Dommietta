export interface IComplain {
    data?: IComplainList[],
    pageSize?: number
}

export interface IComplainList {
    id: number;
    date: Date;
    collectorName: string;
    customerName: string;
    customerCode:string;
    branchName: string;
    areaName: string;
    blockName: string;
    issueName: string;
    x: number;
    y: number;
    details: string;
    isRevised: boolean;
    complaintTypeName: string;
    complaintImagesPath: string[];
}