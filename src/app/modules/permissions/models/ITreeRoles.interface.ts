export interface ITreeRoles {
    name: string;
    id: number;
    isSelected: boolean;
    children: ITreeRoles[];
}