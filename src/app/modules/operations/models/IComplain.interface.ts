export interface IComplain {
    Id: number;
    Date: Date;
    CollectorName: string;
    CustomerName: string;
    BranchName: string;
    AreaName: string;
    BlockName: string;
    IssueName: string;
    X: number;
    Y: number;
    Details: string;
    IsRevised: boolean;
    ComplaintTypeName: string;
    ComplaintImagesPath: string[];
}