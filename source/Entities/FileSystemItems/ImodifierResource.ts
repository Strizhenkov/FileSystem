export interface IModifierResource {
    create: () => boolean;
    delete: () => boolean;
    rename: (newName : string) => boolean;
}