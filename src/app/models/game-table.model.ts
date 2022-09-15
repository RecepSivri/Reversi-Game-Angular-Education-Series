export interface IReversi{
    value: string;
    selected: boolean;
    maxMovement: number;
}

export interface IPoint{
    Row: number;
    Column: number
}

export interface IScore{
    X: number;
    O: number
}