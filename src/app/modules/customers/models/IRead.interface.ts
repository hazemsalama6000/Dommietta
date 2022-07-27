export interface IRead {
    id :number;
    collectorId: number;
    collectorName: string;
    customerId: number;
    customerName: string;
    customerCode: string;
    branchName: string;
    value: number;
    lastReading :number;
    x: number;
    y: number;
    meterStatus: string;
    readingImagePath: string;
    issueName: string;
    issueStatus: string;
    issueDate: Date;
    isRevised: boolean;
    isPotsed: boolean;
    iastPosted?:boolean;
    notes :string
} 