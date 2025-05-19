import {DirectoryStrategy} from './ItemStrategy/directoryStrategy';
import {FileStrategy} from './ItemStrategy/fileStrategy';
import {IResourceStrategy} from './ItemStrategy/IResourceStrategy';

export class CommandOperator {
    private strategy: IResourceStrategy;

    constructor(type: 'file' | 'directory', path: string) {
        if (type === 'file') {
            this.strategy = new FileStrategy(path);
        } else {
            this.strategy = new DirectoryStrategy(path)
        }
    }

    create(): boolean {
        return this.strategy.create();
    }

    delete(): boolean {
        return this.strategy.delete();
    }

    rename(newName : string): boolean {
        return this.strategy.rename(newName);
    }

    getData(): string[] {
        return (this.strategy as DirectoryStrategy).getData();
    }
}