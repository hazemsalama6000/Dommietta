export interface ITreeRoles {
    parent?: ITreeRoles;
    name: string;
    id?: number;
    isSelected?: boolean;
    children?: ITreeRoles[];
    indeterminate?: boolean;
}