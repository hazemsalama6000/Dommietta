export interface IReading {
    Id :number;
    CollectorId: number;
    CollectorName: string;
    CustomerId: number;
    CustomerName: string;
    CustomerCode: string;
    BranchName: string;
    Value: number;
    LastReading :number;
    X: number;
    Y: number;
    MeterStatus: string;
    ReadingImagePath: string;
    IssueName: string;
    IssueStatus: string;
    IssueDate: Date;
    IsRevised: boolean;
    IsPotsed: boolean;
    lastPosted?:boolean;
    Notes :string
} 