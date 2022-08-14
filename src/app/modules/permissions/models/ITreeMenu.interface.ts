
export interface ITreeMenu {
    parent?: ITreeMenu;
    name: string;
    icon?: string;
    isLast?: boolean;
    route?: string;
    parentId?: number;
    order?:number;
    permission?: string;
    level?: number
    id: number;
    childNode?: ITreeMenu[];
}