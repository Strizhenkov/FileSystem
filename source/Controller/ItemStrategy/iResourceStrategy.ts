export interface IResourceStrategy {
    create(): boolean;
    delete(): boolean;
    rename(newName: string): boolean; 
}